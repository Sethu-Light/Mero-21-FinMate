import { Target, Shield, Trophy, TrendingUp, Brain, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Goal Planning",
    description: "Simply tell us your goals in natural language. Our AI extracts details and creates a personalized financial roadmap.",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Visualize your journey with beautiful charts and timelines. Stay motivated with real-time progress updates.",
    color: "text-secondary",
  },
  {
    icon: Trophy,
    title: "Gamification Zone",
    description: "Earn badges, rewards, and points for hitting milestones. Make saving fun and engaging!",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "Fraud Awareness",
    description: "Learn digital payment safety through interactive quizzes and story-driven mini-games.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Smart Recommendations",
    description: "Get personalized suggestions based on your spending patterns and financial goals.",
    color: "text-secondary",
  },
  {
    icon: Users,
    title: "Community Leaderboard",
    description: "Compete with friends and the community. Climb the ranks as you achieve your goals!",
    color: "text-accent",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-6 md:px-8 bg-background">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need to
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to make your financial journey simple, secure, and rewarding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-card flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
