import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NotificationBanner from "@/components/NotificationBanner";
import StatsSection from "@/components/StatsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NotificationBanner />
      <HeroSection />
      <StatsSection />
    </div>
  );
};

export default Index;
