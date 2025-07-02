import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NotificationBanner from "@/components/NotificationBanner";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import JobsSection from "@/components/JobsSection";
import PartnersSection from "@/components/PartnersSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationBanner />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <div id="how-it-works-section">
        <HowItWorksSection />
      </div>
      <div id="testimonials-section">
        <TestimonialsSection />
      </div>
      <JobsSection />
      <div id="partners-section">
        <PartnersSection />
      </div>
      <FAQSection />
      <div id="cta-section">
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
