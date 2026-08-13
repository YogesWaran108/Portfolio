import React from 'react';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CallToActionSection } from '../components/sections/CallToActionSection';
import { Footer } from '../components/layout/Footer';

interface ServicesPageProps {
  onNavigate: (route: string, selectedService?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      <ServicesSection onNavigateContact={(service) => onNavigate('contact', service)} />
      <CallToActionSection onNavigateContact={() => onNavigate('contact')} />
      <Footer onNavigate={onNavigate} activeRoute="services" />
    </div>
  );
};

export default ServicesPage;
