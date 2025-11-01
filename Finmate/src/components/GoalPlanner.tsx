import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Calendar, IndianRupee, Target } from "lucide-react";
import aiGoalsImage from "@/assets/ai-goals.jpg";

const GoalPlanner = () => {
  const navigate = useNavigate();

  // ✅ When user clicks "Create My Plan"
  const handleCreatePlan = () => {
    const newGoal = {
      id: Date.now().toString(),
      purpose: "Buy a Car",
      amount: 700000,
      timeframe: "6 months",
      timeframe_months: 6,
      monthly_contribution: 116667, // 700000 / 6 (simple estimate)
      current_savings: 0,
      created_at: new Date().toISOString(),
    };

    // ✅ Store in localStorage (append to existing goals)
    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    storedGoals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(storedGoals));

    // ✅ Navigate to dashboard
    navigate("/dashboard");
  };

  return (
    <section className="py-24 px-6 md:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Demo */}
          <div className="space-y-6 animate-fade-up order-2 lg:order-1">
            <img 
              src={aiGoalsImage} 
              alt="AI Goal Planning" 
              className="rounded-2xl shadow-glow"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-8 animate-fade-up [animation-delay:0.2s] order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                <Sparkles className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">Natural Language AI</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Tell Us Your Dreams,
                <br />
                <span className="text-secondary">We'll Plan the Path</span>
              </h2>
              
              <p className="text-xl text-muted-foreground">
                No complex forms. Just describe your goal naturally, and our AI does the rest.
              </p>
            </div>

            {/* Interactive Demo */}
            <Card className="shadow-card border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-lg">Try it out:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="I want to buy a car within 6 months worth ₹7 lakhs"
                    className="flex-1"
                  />
                  <Button variant="hero">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>

                {/* Example extraction */}
                <div className="space-y-3 p-4 bg-gradient-card rounded-lg border border-border/50">
                  <div className="text-sm font-medium text-foreground">AI Extracted:</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      <div className="text-sm">
                        <div className="text-muted-foreground text-xs">Goal</div>
                        <div className="font-medium">Car</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-secondary" />
                      <div className="text-sm">
                        <div className="text-muted-foreground text-xs">Amount</div>
                        <div className="font-medium">₹7L</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <div className="text-sm">
                        <div className="text-muted-foreground text-xs">Timeline</div>
                        <div className="font-medium">6 months</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ Button triggers saving + redirect */}
                <Button variant="accent" className="w-full" onClick={handleCreatePlan}>
                  Create My Plan
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalPlanner;