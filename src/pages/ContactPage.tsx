import React from 'react';
import { ContactSection } from '../components/sections/ContactSection';
import { Footer } from '../components/layout/Footer';

interface ContactPageProps {
  onNavigate: (route: string) => void;
  initialService?: string | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, initialService }) => {
  return (
    <div className="pt-16 sm:pt-24 min-h-screen">
      <ContactSection initialService={initialService} />
      <Footer onNavigate={onNavigate} activeRoute="contact" />
    </div>
  );
};

export default ContactPage;
