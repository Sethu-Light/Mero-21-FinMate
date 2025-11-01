import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground} 
          alt="Financial visualization" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float [animation-delay:1s]" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float [animation-delay:2s]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full shadow-card">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Your Smart Financial Companion</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Plan Smart.
            <br />
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Save Wisely.
            </span>
            <br />
            Play Safe.
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your personalized financial goal planner with gamified fraud awareness. 
            Achieve your dreams while staying secure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6 animate-glow-pulse"
              onClick={() => window.location.href = '/goal-input'}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 bg-card/50 backdrop-blur-sm hover:bg-card/80"
              onClick={() => window.location.href = '/gamification'}
            >
              <Target className="mr-2" />
              Explore Gamification
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-secondary">₹50Cr+</div>
              <div className="text-sm text-muted-foreground">Goals Achieved</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
