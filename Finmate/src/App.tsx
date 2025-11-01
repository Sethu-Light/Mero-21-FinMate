import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GoalInput from "./pages/GoalInput";
import Dashboard from "./pages/Dashboard";
import GamificationZone from "./pages/GamificationZone";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import ProgressGoal from "@/pages/ProgressGoal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/goal-input" element={<GoalInput />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/progress-goal/:id" element={<ProgressGoal />} />
          <Route path="/gamification" element={<GamificationZone />} />
          <Route path="/gamification-zone" element={<GamificationZone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;