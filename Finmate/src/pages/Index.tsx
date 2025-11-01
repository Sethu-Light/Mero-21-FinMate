import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GoalPlanner from "@/components/GoalPlanner";
import Gamification from "@/components/Gamification";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <GoalPlanner />
      </div>
      <div id="gamification">
        <Gamification />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
