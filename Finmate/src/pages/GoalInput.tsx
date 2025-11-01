import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GoalInput = () => {
  const navigate = useNavigate();

  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [timeframeMonths, setTimeframeMonths] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");

  const handleAddGoal = () => {
    if (!purpose || !amount) return;

    const newGoal = {
      id: uuidv4(),
      purpose,
      amount: Number(amount),
      timeframe,
      timeframe_months: Number(timeframeMonths),
      monthly_contribution: Number(monthlyContribution),
      current_savings: Number(currentSavings),
      created_at: new Date().toISOString(),
    };

    const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    storedGoals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(storedGoals));

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background py-16 px-6 flex justify-center items-center">
      <Card className="max-w-md w-full shadow-lg border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Create New Goal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          <Input placeholder="Target Amount (₹)" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <Input placeholder="Timeframe (e.g. 6 months)" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} />
          <Input placeholder="Timeframe in months" value={timeframeMonths} onChange={(e) => setTimeframeMonths(e.target.value)} />
          <Input placeholder="Monthly Contribution (₹)" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
          <Input placeholder="Current Savings (₹)" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
          <Button onClick={handleAddGoal} className="w-full">
            Save Goal
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalInput;