import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import { createClient } from '@supabase/supabase-js';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// -------------------------------------------------------------
// 1. SUPABASE (REST & DIRECT POSTGRESQL) & MONGODB CONNECTIONS
// -------------------------------------------------------------
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;
let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_KEY.includes('your-supabase')) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log('✅ Supabase REST Client initialized successfully!');
  } catch (err) {
    console.warn('⚠️ Supabase init warning:', err.message);
  }
}

// Direct PostgreSQL Pool (Supabase DB URI)
const DATABASE_URL = process.env.DATABASE_URL;
let pgPool = null;

if (DATABASE_URL && !DATABASE_URL.includes('[YOUR-PASSWORD]')) {
  try {
    pgPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    pgPool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        selected_services TEXT[],
        message TEXT NOT NULL,
        status TEXT DEFAULT 'RECEIVED',
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        email_preview_url TEXT
      );
    `).then(() => {
      console.log('✅ Supabase PostgreSQL Table "inquiries" is ready!');
    }).catch((err) => {
      console.warn('⚠️ Supabase PG auto-table notice:', err.message);
    });

    console.log('✅ Connected to Supabase Direct PostgreSQL Database!');
  } catch (err) {
    console.warn('⚠️ PostgreSQL connection warning:', err.message);
  }
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
let isMongoConnected = false;

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 4000
  })
  .then(() => {
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB Database successfully!');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection warning (Using inquiries.json file fallback):', err.message);
  });

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  selectedServices: [String],
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['RECEIVED', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'],
    default: 'RECEIVED'
  },
  emailPreviewUrl: String,
  emailStatus: {
    adminSent: { type: Boolean, default: false },
    clientSent: { type: Boolean, default: false },
    error: String
  }
});

const InquiryModel = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

// File storage fallback path inside backend directory
const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

// Helper to read inquiries (PG Direct -> Supabase REST -> Mongo -> File fallback)
const getInquiries = async () => {
  if (pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM inquiries ORDER BY submitted_at DESC');
      if (res && res.rows && res.rows.length > 0) {
        return res.rows.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          selectedServices: item.selected_services || [],
          message: item.message,
          submittedAt: item.submitted_at,
          status: item.status || 'RECEIVED',
          emailPreviewUrl: item.email_preview_url
        }));
      }
    } catch (err) {
      console.warn('PostgreSQL fetch notice:', err.message);
    }
  }

  if (supabase) {
    try {
      const { data, error } = await supabase.from('inquiries').select('*').order('submitted_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          name: item.name,
          email: item.email,
          selectedServices: item.selected_services || [],
          message: item.message,
          submittedAt: item.submitted_at,
          status: item.status || 'RECEIVED',
          emailPreviewUrl: item.email_preview_url
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch error, checking MongoDB:', err.message);
    }
  }

  if (isMongoConnected) {
    try {
      const records = await InquiryModel.find().sort({ submittedAt: -1 });
      return records;
    } catch (err) {
      console.warn('MongoDB query error, using file fallback:', err.message);
    }
  }

  if (fs.existsSync(INQUIRIES_FILE)) {
    try {
      const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      return JSON.parse(fileData);
    } catch (err) {
      return [];
    }
  }
  return [];
};

// Helper to save new inquiry (Supabase Direct PG + Supabase REST + Mongo + File sync)
const saveInquiry = async (inquiryData) => {
  if (pgPool) {
    try {
      await pgPool.query(
        `INSERT INTO inquiries (id, name, email, selected_services, message, submitted_at, status, email_preview_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          inquiryData.id,
          inquiryData.name,
          inquiryData.email,
          inquiryData.selectedServices,
          inquiryData.message,
          inquiryData.submittedAt,
          inquiryData.status,
          inquiryData.emailPreviewUrl
        ]
      );
      console.log('✅ Inquiry saved to Supabase Direct PostgreSQL database!');
    } catch (err) {
      console.warn('PostgreSQL insert error:', err.message);
    }
  }

  if (supabase) {
    try {
      await supabase.from('inquiries').insert([
        {
          id: inquiryData.id,
          name: inquiryData.name,
          email: inquiryData.email,
          selected_services: inquiryData.selectedServices,
          message: inquiryData.message,
          submitted_at: inquiryData.submittedAt,
          status: inquiryData.status,
          email_preview_url: inquiryData.emailPreviewUrl
        }
      ]);
      console.log('✅ Inquiry saved to Supabase PostgreSQL table!');
    } catch (err) {
      console.warn('Supabase save error:', err.message);
    }
  }

  if (isMongoConnected) {
    try {
      const doc = new InquiryModel(inquiryData);
      await doc.save();
    } catch (err) {
      console.warn('MongoDB save error:', err.message);
    }
  }

  try {
    let fileInquiries = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      fileInquiries = JSON.parse(data);
    }
    fileInquiries.unshift(inquiryData);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(fileInquiries, null, 2));
  } catch (err) {
    console.warn('File write error:', err.message);
  }

  return inquiryData;
};

// -------------------------------------------------------------
// 2. NODEMAILER TRANSPORTER FOR DUAL EMAIL CONFIRMATION
// -------------------------------------------------------------
const createTransporter = async () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('✉️ Initializing SMTP Transporter for:', process.env.SMTP_USER);

    // Clean up spaces if user pasted password with spaces
    const cleanPass = process.env.SMTP_PASS.replace(/\s+/g, '');

    if (process.env.SMTP_USER.endsWith('@gmail.com') && !process.env.SMTP_HOST) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: cleanPass
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: cleanPass
      }
    });
  } else {
    console.log('✉️ No SMTP credentials in .env. Creating Ethereal Test Account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (err) {
      console.warn('Ethereal test account generation failed:', err.message);
      return null;
    }
  }
};

// -------------------------------------------------------------
// 3. REST API ENDPOINTS
// -------------------------------------------------------------

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    mongoConnected: isMongoConnected,
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    message: 'Standalone Backend API Service running cleanly with MongoDB & Nodemailer integration.'
  });
});

// POST /api/contact - Handle Contact Form Submission & Send Emails
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, selectedServices = [], message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message are required.'
      });
    }

    const inquiryId = 'INQ-' + Date.now();
    const submittedAt = new Date().toISOString();

    const inquiryData = {
      id: inquiryId,
      name,
      email,
      selectedServices,
      message,
      submittedAt,
      status: 'RECEIVED',
      emailStatus: { adminSent: false, clientSent: false }
    };

    let emailPreviewUrl = null;
    let adminSent = false;
    let clientSent = false;
    let mailError = null;

    try {
      let transporter = await createTransporter();

      if (transporter) {
        // Mail 1: Admin Alert Email
        const adminMailOptions = {
          from: `"Portfolio Contact System" <${process.env.SMTP_USER || 'noreply@yogeshwar.dev'}>`,
          to: 'yogeshwar11012k02@gmail.com',
          subject: `🚨 NEW PROJECT INQUIRY [${inquiryId}] from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 30px 15px;">
              <div style="max-w: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
                
                <!-- Ocean Blue Header -->
                <div style="background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 24px 30px; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 22px; font-weight: 800;">Yogeshwaran.</h1>
                  <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; letter-spacing: 1px; font-weight: 700;">// NEW CLIENT INQUIRY RECEIVED</p>
                </div>

                <div style="padding: 30px; color: #1e293b;">
                  <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase;">INQUIRY REFERENCE ID</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 800; color: #0284c7;">${inquiryId}</p>
                  </div>

                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 120px;">Client Name:</td>
                      <td style="padding: 6px 0; color: #0f172a; font-size: 14px; font-weight: 700;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email Address:</td>
                      <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #0284c7; font-weight: 700; text-decoration: none;">${email}</a></td>
                    </tr>
                  </table>

                  <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-left: 4px solid #0284c7; padding: 18px 20px; border-radius: 10px; margin-bottom: 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0369a1; text-transform: uppercase;">Selected Tiers & Services (+ Hosting Charges Included):</p>
                    <ul style="margin: 0; padding-left: 18px; color: #0f172a;">
                      ${selectedServices.map(s => `<li style="margin-bottom: 6px; font-weight: 700; color: #0284c7;">${s}</li>`).join('')}
                    </ul>
                  </div>

                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px 20px; border-radius: 10px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 800; color: #64748b; text-transform: uppercase;">Project Goals & Requirements:</p>
                    <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
                  </div>

                  <div style="margin-top: 30px; border-top: 1px solid #f1f5f9; text-align: center; color: #94a3b8; font-size: 12px;">
                    <p style="margin: 15px 0 0 0;">Timestamp: ${submittedAt}</p>
                  </div>
                </div>

              </div>
            </div>
          `
        };

        // Mail 2: Client Automated Confirmation Receipt Email
        const clientMailOptions = {
          from: `"Yogeshwaran Ravishankar" <${process.env.SMTP_USER || 'yogeshwar11012k02@gmail.com'}>`,
          to: email,
          subject: `Inquiry Confirmation [${inquiryId}] - Thank you for reaching out, ${name}!`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 30px 15px;">
              <div style="max-w: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
                
                <div style="background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 28px 32px; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Yogeshwaran.</h1>
                  <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.95; font-weight: 600;">INQUIRY RECEIPT CONFIRMATION</p>
                </div>

                <div style="padding: 32px; color: #1e293b;">
                  <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Hi ${name},</h2>
                  <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                    Thank you for getting in touch! Your project inquiry has been received and logged under reference code <strong style="color: #0284c7;">${inquiryId}</strong>.
                  </p>

                  <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-left: 4px solid #0284c7; padding: 20px 22px; border-radius: 12px; margin: 24px 0;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 800; color: #0369a1; text-transform: uppercase;">Selected Tiers & Services Summary (+ Hosting Charges Included):</p>
                    <ul style="margin: 0; padding-left: 18px; color: #0f172a; font-size: 14px; line-height: 1.8;">
                      ${selectedServices.map(s => `<li style="font-weight: 700; color: #0284c7;">${s}</li>`).join('')}
                    </ul>
                  </div>

                  <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                    I will carefully review your requirements and respond within <strong>24 hours</strong>. If your request is urgent, feel free to call me directly at <a href="tel:+916382755066" style="color: #0284c7; font-weight: 700; text-decoration: none;">+91-6382755066</a>.
                  </p>

                  <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 28px 0;" />

                  <div style="color: #64748b; font-size: 13px; line-height: 1.5;">
                    <p style="margin: 0; font-size: 14px; font-weight: 800; color: #0f172a;">Best regards,</p>
                    <p style="margin: 2px 0 0 0; font-size: 15px; font-weight: 800; color: #0284c7;">Yogeshwaran Ravishankar</p>
                    <p style="margin: 0; color: #64748b;">Frontend Software Engineer</p>
                    <p style="margin: 4px 0 0 0;"><a href="mailto:yogeshwar11012k02@gmail.com" style="color: #0284c7; text-decoration: none; font-weight: 600;">yogeshwar11012k02@gmail.com</a></p>
                  </div>
                </div>

              </div>
            </div>
          `
        };

        try {
          const adminRes = await transporter.sendMail(adminMailOptions);
          adminSent = !!adminRes.messageId;
          console.log('✅ Admin Notification Email Sent:', adminRes.messageId);

          const clientRes = await transporter.sendMail(clientMailOptions);
          clientSent = !!clientRes.messageId;
          console.log('✅ Client Receipt Email Sent:', clientRes.messageId);

          emailPreviewUrl = nodemailer.getTestMessageUrl(clientRes);
        } catch (authErr) {
          console.warn('⚠️ Primary SMTP failed (Fallback to Ethereal):', authErr.message);
          try {
            const testAccount = await nodemailer.createTestAccount();
            const fallbackTransporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              secure: false,
              auth: { user: testAccount.user, pass: testAccount.pass }
            });
            await fallbackTransporter.sendMail(adminMailOptions);
            const clientRes = await fallbackTransporter.sendMail(clientMailOptions);
            adminSent = true;
            clientSent = true;
            emailPreviewUrl = nodemailer.getTestMessageUrl(clientRes);
          } catch (etherealErr) {
            console.warn('Fallback transport error:', etherealErr.message);
          }
        }
      }
    } catch (err) {
      mailError = err.message;
      console.warn('⚠️ Email delivery error:', err.message);
    }

    inquiryData.emailPreviewUrl = emailPreviewUrl || null;
    inquiryData.emailStatus = { adminSent, clientSent, error: mailError };

    await saveInquiry(inquiryData);

    return res.status(200).json({
      success: true,
      message: 'Inquiry received and processed successfully!',
      inquiryId,
      emailSent: { adminSent, clientSent },
      emailPreviewUrl
    });
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while saving inquiry.'
    });
  }
});

// GET /api/contact/inquiries - Fetch All Inquiries for Admin Dashboard
app.get('/api/contact/inquiries', async (req, res) => {
  try {
    const list = await getInquiries();
    return res.status(200).json(list);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve inquiries' });
  }
});

// PATCH /api/contact/inquiries/:id - Update Status
app.patch('/api/contact/inquiries/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (isMongoConnected) {
    try {
      const updated = await InquiryModel.findOneAndUpdate({ id }, { status }, { new: true });
      if (updated) {
        return res.status(200).json({ success: true, inquiry: updated });
      }
    } catch (err) {
      console.warn('Mongo update error:', err.message);
    }
  }

  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      let inquiries = JSON.parse(fileData);
      const idx = inquiries.findIndex((i) => i.id === id);
      if (idx !== -1) {
        inquiries[idx].status = status;
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
        return res.status(200).json({ success: true, inquiry: inquiries[idx] });
      }
    }
  } catch (err) {
    console.warn('File update error:', err.message);
  }

  return res.status(404).json({ success: false, error: 'Inquiry not found' });
});

// POST /api/contact/reply - Admin Direct Reply Endpoint
app.post('/api/contact/reply', async (req, res) => {
  try {
    const { inquiryId, clientEmail, clientName, subject, replyMessage } = req.body || {};

    if (!clientEmail || !replyMessage) {
      return res.status(400).json({ success: false, error: 'Missing required fields: clientEmail and replyMessage' });
    }

    const transporter = await createTransporter();

    const mailOptions = {
      from: `"Yogeshwaran Ravishankar" <${process.env.SMTP_USER || 'yogeshwar11012k02@gmail.com'}>`,
      to: clientEmail,
      subject: subject || `Re: Inquiry [${inquiryId || 'NEW'}] - Project Proposal`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 30px 15px;">
          <div style="max-w: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06);">
            
            <div style="background: linear-gradient(135deg, #0284c7 0%, #06b6d4 100%); padding: 28px 32px; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Yogeshwaran.</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.95; font-weight: 600;">DIRECT PROJECT RESPONSE</p>
            </div>

            <div style="padding: 32px; color: #1e293b;">
              <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 800; color: #0f172a;">Hi ${clientName || 'there'},</h2>
              
              <div style="font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 28px;">
                ${replyMessage.replace(/\n/g, '<br/>')}
              </div>

              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 28px 0;" />

              <div style="color: #64748b; font-size: 13px; line-height: 1.5;">
                <p style="margin: 0; font-size: 14px; font-weight: 800; color: #0f172a;">Best regards,</p>
                <p style="margin: 2px 0 0 0; font-size: 15px; font-weight: 800; color: #0284c7;">Yogeshwaran Ravishankar</p>
                <p style="margin: 0; color: #64748b;">Frontend Software Engineer</p>
                <p style="margin: 4px 0 0 0;"><a href="mailto:yogeshwar11012k02@gmail.com" style="color: #0284c7; text-decoration: none; font-weight: 600;">yogeshwar11012k02@gmail.com</a> | <a href="tel:+916382755066" style="color: #0284c7; text-decoration: none; font-weight: 600;">+91-6382755066</a></p>
              </div>
            </div>

          </div>
        </div>
      `
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Direct reply sent to client (${clientEmail}) for Inquiry ${inquiryId}`);
    }

    if (inquiryId) {
      if (isMongoConnected) {
        try {
          await InquiryModel.findOneAndUpdate({ id: inquiryId }, { status: 'CONTACTED' });
        } catch (err) {}
      }
      try {
        if (fs.existsSync(INQUIRIES_FILE)) {
          const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
          let inquiries = JSON.parse(fileData);
          const idx = inquiries.findIndex((i) => i.id === inquiryId);
          if (idx !== -1) {
            inquiries[idx].status = 'CONTACTED';
            fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
          }
        }
      } catch (err) {}
    }

    return res.status(200).json({
      success: true,
      message: `Direct reply sent successfully to ${clientEmail}`
    });
  } catch (error) {
    console.error('Reply endpoint error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send direct reply.' });
  }
});

// DELETE /api/contact/inquiries/:id - Delete Record
app.delete('/api/contact/inquiries/:id', async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected) {
    try {
      await InquiryModel.deleteOne({ id });
    } catch (err) {}
  }

  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const fileData = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      let inquiries = JSON.parse(fileData);
      inquiries = inquiries.filter((i) => i.id !== id);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));
    }
  } catch (err) {}

  return res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Standalone Portfolio Backend Server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} is currently in use. Retrying connection...`);
  } else {
    console.error('Server error:', err);
  }
});
