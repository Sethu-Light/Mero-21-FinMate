import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Star, Medal, Award, Crown, PlayCircle } from "lucide-react";
import badgeIcon from "@/assets/badge-icon.png";

const leaderboard = [
  { name: "Priya Sharma", points: 2450, rank: 1, badge: "🥇" },
  { name: "Rahul Kumar", points: 2380, rank: 2, badge: "🥈" },
  { name: "Anjali Verma", points: 2150, rank: 3, badge: "🥉" },
  { name: "You", points: 1890, rank: 4, badge: "⭐", highlight: true },
  { name: "Amit Patel", points: 1720, rank: 5, badge: "💎" },
];

const badges = [
  { icon: Trophy, name: "Goal Master", color: "text-accent" },
  { icon: Zap, name: "Quick Saver", color: "text-primary" },
  { icon: Star, name: "Fraud Fighter", color: "text-secondary" },
  { icon: Medal, name: "100-Day Streak", color: "text-accent" },
  { icon: Award, name: "Budget Pro", color: "text-primary" },
  { icon: Crown, name: "Top Achiever", color: "text-secondary" },
];

const Gamification = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/gamification-zone");
  };

  return (
    <section className="py-24 px-6 md:px-8 bg-background min-h-screen">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* 🏅 Badge Collection */}
        <Card className="shadow-card border-border/50 bg-gradient-card flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <img src={badgeIcon} alt="Badge" className="w-8 h-8" />
                Your Badge Collection
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg border border-border/50 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${badge.color}`}
                    >
                      <badge.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs text-center font-medium">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Next Badge: Savings Champion
                  </span>
                  <span className="font-medium text-primary">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </div>

          {/* 🎮 Start Game Button aligned bottom */}
          <div className="px-6 pb-6 mt-auto flex justify-center">
            <Button
              onClick={handleStartGame}
              className="px-8 py-3 text-lg font-semibold flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <PlayCircle className="w-5 h-5" />
              Start Game
            </Button>
          </div>
        </Card>

        {/* 🏆 Leaderboard */}
        <Card className="shadow-card border-border/50 bg-gradient-card animate-fade-in [animation-delay:0.2s]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Community Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                    user.highlight
                      ? "bg-primary/10 border-2 border-primary shadow-glow"
                      : "bg-card border border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{user.badge}</span>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {user.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Rank #{user.rank}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-secondary/20 text-secondary border-secondary/30"
                  >
                    {user.points} pts
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
              <div className="text-sm text-muted-foreground mb-2">
                Weekly Challenge
              </div>
              <div className="font-medium text-foreground">
                Complete 5 fraud awareness quizzes
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Progress value={60} className="flex-1 h-2" />
                <span className="text-sm font-medium text-accent">3/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Gamification;