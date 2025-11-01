import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, Calendar, IndianRupee, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Goal {
  id: string;
  purpose: string;
  amount: number;
  timeframe: string;
  timeframe_months: number;
  monthly_contribution: number;
  current_savings: number;
  created_at: string;
}

const Dashboard = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const navigate = useNavigate();

  // ✅ Load goals from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(storedGoals);
  }, []);

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.current_savings / goal.amount) * 100, 100);
  };

  const calculateTimeRemaining = (goal: Goal) => {
    const createdDate = new Date(goal.created_at);
    const targetDate = new Date(createdDate);
    targetDate.setMonth(targetDate.getMonth() + goal.timeframe_months);

    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays < 30) return `${diffDays} days left`;

    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} left`;
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Your <span className="bg-gradient-hero bg-clip-text text-transparent">Financial Goals</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your progress and achieve your dreams
            </p>
          </div>
          <Button onClick={() => navigate("/goal-input")} variant="hero" size="lg">
            <Plus className="w-5 h-5" />
            Add New Goal
          </Button>
        </div>

        {goals.length === 0 ? (
          <Card className="p-12 text-center border-border/50 shadow-card">
            <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No goals yet</h3>
            <p className="text-muted-foreground mb-6">
              Start your financial journey by creating your first goal!
            </p>
            <Button onClick={() => navigate("/goal-input")} variant="hero" size="lg">
              Create Your First Goal
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className="bg-gradient-card border-border/50 shadow-glow hover:shadow-glow-secondary transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Target className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{goal.purpose}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {calculateTimeRemaining(goal)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-secondary">
                        {calculateProgress(goal).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={calculateProgress(goal)} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ₹{goal.current_savings.toLocaleString("en-IN")}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{goal.amount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/30">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <IndianRupee className="w-3 h-3" />
                        Monthly Target
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        ₹{goal.monthly_contribution?.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Calendar className="w-3 h-3" />
                        Timeline
                      </div>
                      <div className="text-lg font-semibold text-foreground">
                        {goal.timeframe}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 hover:bg-primary/10"
                    onClick={() => navigate(`/progress-goal/${goal.id}`)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Update Progress
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;