import React from 'react';
import { PortfolioSection } from '../components/sections/PortfolioSection';
import { CallToActionSection } from '../components/sections/CallToActionSection';
import { Footer } from '../components/layout/Footer';

interface PortfolioPageProps {
  onNavigate: (route: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-32 min-h-screen">
      <PortfolioSection />
      <CallToActionSection onNavigateContact={() => onNavigate('contact')} />
      <Footer onNavigate={onNavigate} activeRoute="portfolio" />
    </div>
  );
};

export default PortfolioPage;
