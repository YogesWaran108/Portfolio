import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { TechStackSection } from '../components/sections/TechStackSection';
import { CallToActionSection } from '../components/sections/CallToActionSection';
import { Footer } from '../components/layout/Footer';

interface HomePageProps {
  onNavigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <AboutSection />
      <TechStackSection />
      <CallToActionSection onNavigateContact={() => onNavigate('contact')} />
      <Footer onNavigate={onNavigate} activeRoute="home" />
    </>
  );
};

export default HomePage;
