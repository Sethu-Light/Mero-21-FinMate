import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Plus } from "lucide-react";

interface Goal {
  id: string;
  purpose: string;
  amount: number;
  current_savings: number;
  timeframe: string;
  timeframe_months: number;
}

interface ProgressEntry {
  month_number: number;
  amount_saved: number;
}

const ProgressGoal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [newAmount, setNewAmount] = useState("");

  // Load goal + progress from localStorage
  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    const selectedGoal = storedGoals.find((g: Goal) => g.id === id);
    setGoal(selectedGoal || null);

    const storedProgress = JSON.parse(
      localStorage.getItem(`progress_${id}`) || "[]"
    );
    setProgressData(storedProgress);
  }, [id]);

  // Save progress whenever updated
  useEffect(() => {
    if (id) {
      localStorage.setItem(`progress_${id}`, JSON.stringify(progressData));
    }
  }, [progressData, id]);

  // Handle new monthly progress addition
  const handleAddProgress = () => {
    if (!newAmount || isNaN(Number(newAmount))) return;

    const amount = Number(newAmount);
    const nextMonth = progressData.length + 1;

    const newEntry = {
      month_number: nextMonth,
      amount_saved: amount,
    };

    const updatedProgress = [...progressData, newEntry];
    setProgressData(updatedProgress);
    setNewAmount("");

    // Update total savings in main goals list
    const updatedTotal = updatedProgress.reduce(
      (sum, entry) => sum + entry.amount_saved,
      0
    );

    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    const updatedGoals = storedGoals.map((g: Goal) =>
      g.id === goal?.id ? { ...g, current_savings: updatedTotal } : g
    );

    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    setGoal((prev) => (prev ? { ...prev, current_savings: updatedTotal } : prev));
  };

  // Prepare chart data
  const chartData = progressData.map((entry) => ({
    month: `Month ${entry.month_number}`,
    savings: entry.amount_saved,
  }));

  // Calculate progress %
  const progressPercent = goal
    ? Math.min((goal.current_savings / goal.amount) * 100, 100)
    : 0;

  if (!goal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Goal not found. Go back to Dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Goal Card */}
        <Card className="shadow-lg border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              {goal.purpose} — Progress Overview
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-6">
              Track your month-by-month savings progress for this goal.
            </p>

            {/* Chart Section */}
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#22c55e"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-10">
                No progress data yet. Add your first month below.
              </p>
            )}

            {/* Add Progress */}
            <div className="mt-8 flex items-center gap-4">
              <Input
                type="number"
                placeholder="Enter amount saved this month (₹)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddProgress}>
                <Plus className="w-4 h-4 mr-1" />
                Add Month
              </Button>
            </div>

            {/* Progress Summary */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <span>Total Months Recorded: {progressData.length}</span>
              <span>Goal Target: ₹{goal.amount.toLocaleString("en-IN")}</span>
              <span>Current Savings: ₹{goal.current_savings.toLocaleString("en-IN")}</span>
              <span>Progress: {progressPercent.toFixed(1)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressGoal;