import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Star, Medal, Award, Crown } from "lucide-react";

const LEADERBOARD_KEY = "leaderboard";

export default function GamificationZone() {
  const [gameMode, setGameMode] = useState<"menu" | "quiz" | "story" | "fill">("menu");
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyList, setStoryList] = useState<any[]>([]);
  const [fillCompleted, setFillCompleted] = useState(false);
  const [fillList, setFillList] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const shuffle = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

  // --- Static Data ---
  const staticQuiz = [
    { question: "Which is the safest way to make digital payments?", options: ["Through verified banking apps", "By clicking random links", "Sharing OTP with friends", "Using public Wi-Fi"], answer: "Through verified banking apps" },
    { question: "What should you never share online?", options: ["Bank account number", "UPI PIN", "Credit limit", "Email"], answer: "UPI PIN" },
    { question: "What does ‘https’ in a website mean?", options: ["It’s a secure connection", "It’s a game website", "It’s for entertainment", "Nothing special"], answer: "It’s a secure connection" },
    { question: "What should you do if your card is lost?", options: ["Report and block it immediately", "Ignore it", "Wait 2 days before acting", "Post about it online"], answer: "Report and block it immediately" },
    { question: "Which of these is a red flag for digital fraud?", options: ["A message saying ‘You won a lottery!’", "A verified UPI request", "An official bank call", "A transaction receipt"], answer: "A message saying ‘You won a lottery!’" },
    { question: "If someone calls pretending to be from your bank asking for OTP, what should you do?", options: ["Share OTP immediately", "Hang up and call the bank’s official number", "Give partial OTP", "Ignore and share later"], answer: "Hang up and call the bank’s official number" },
    { question: "When shopping online, which payment method is most secure?", options: ["Using credit card on trusted sites", "Using public computers", "Saving your card info on random websites", "Through email links"], answer: "Using credit card on trusted sites" },
    { question: "What should you do if you notice unauthorized transactions?", options: ["Wait for a few days", "Inform your bank immediately", "Post on social media", "Ignore if small"], answer: "Inform your bank immediately" },
    { question: "Which one indicates a phishing attempt?", options: ["Email with grammar mistakes asking for personal info", "Bank’s official newsletter", "Payment confirmation message", "Account alert from your app"], answer: "Email with grammar mistakes asking for personal info" },
    { question: "Before downloading a finance app, what should you check?", options: ["Developer details and reviews", "Color of the logo", "App size", "Random comments"], answer: "Developer details and reviews" },
  ];

  const staticStories = [
    { text: "You receive an SMS saying ‘Your KYC is expiring, click here to update’. What should you do?", choices: [{ text: "Click the link quickly", correct: false }, { text: "Ignore and report it as spam", correct: true }] },
    { text: "Your bank app asks you to update it from a third-party link. What do you do?", choices: [{ text: "Download from official Play Store or App Store only", correct: true }, { text: "Use the link—it’s faster", correct: false }] },
    { text: "You get a call saying you won ₹10,000 and must pay ₹500 to claim it. What will you do?", choices: [{ text: "Pay to claim reward", correct: false }, { text: "Ignore and block the caller", correct: true }] },
    { text: "A friend asks you to transfer money urgently using an unknown payment link. What do you do?", choices: [{ text: "Verify by calling your friend", correct: true }, { text: "Send money immediately", correct: false }] },
    { text: "You find a QR code on a wall saying 'Scan to win a gift'. What do you do?", choices: [{ text: "Scan the QR code", correct: false }, { text: "Avoid scanning random QR codes", correct: true }] },
    { text: "An email says 'Your account will be blocked unless you verify details'. What’s safe to do?", choices: [{ text: "Click the link and enter your info", correct: false }, { text: "Verify through your bank’s official website", correct: true }] },
  ];

  const staticFill = [
    { sentence: "Never share your ____ with anyone.", answer: "OTP" },
    { sentence: "Always check the website starts with ____ before paying.", answer: "https" },
    { sentence: "Avoid using public ____ for financial transactions.", answer: "Wi-Fi" },
    { sentence: "If you lose your card, ____ it immediately.", answer: "block" },
    { sentence: "Do not click on unknown ____ received via email or SMS.", answer: "links" },
    { sentence: "Always verify the receiver’s name before sending ____.", answer: "money" },
    { sentence: "Use strong and unique ____ for your banking apps.", answer: "passwords" },
    { sentence: "Phishing emails often ask for your personal ____.", answer: "information" },
    { sentence: "Report suspicious transactions to your ____ right away.", answer: "bank" },
  ];

  const badges = [
    { icon: Trophy, name: "Goal Master", color: "text-accent" },
    { icon: Zap, name: "Quick Saver", color: "text-primary" },
    { icon: Star, name: "Fraud Fighter", color: "text-secondary" },
    { icon: Medal, name: "100-Day Streak", color: "text-accent" },
    { icon: Award, name: "Budget Pro", color: "text-primary" },
    { icon: Crown, name: "Top Achiever", color: "text-secondary" },
  ];

  // Load leaderboard
  useEffect(() => {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    if (stored) setLeaderboard(JSON.parse(stored));
  }, []);

  const updateLeaderboard = (name: string, newScore: number) => {
    const existing = leaderboard.find((p) => p.user_name === name);
    let updated;
    if (existing) {
      updated = leaderboard.map((p) =>
        p.user_name === name && newScore > p.score ? { ...p, score: newScore } : p
      );
    } else {
      updated = [...leaderboard, { user_name: name, score: newScore }];
    }
    updated.sort((a, b) => b.score - a.score);
    updated = updated.slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated));
  };

  // --- Start Games ---
  const startQuiz = () => {
    const shuffled = shuffle(staticQuiz.map((q) => ({ ...q, options: shuffle(q.options) })));
    setQuiz(shuffled);
    setCurrent(0);
    setScore(0);
    setCompleted(false);
    setGameMode("quiz");
  };

  const startStory = () => {
    setStoryList(shuffle(staticStories));
    setStoryIndex(0);
    setScore(0);
    setGameMode("story");
  };

  const startFill = () => {
    setFillList(shuffle(staticFill));
    setAnswers([]);
    setFillCompleted(false);
    setScore(0);
    setGameMode("fill");
  };

  // --- Handlers ---
  const handleQuizAnswer = (opt: string) => {
    const isCorrect = quiz[current].answer === opt;
    if (isCorrect) setScore((s) => s + 1);
    if (current + 1 < quiz.length) setCurrent(current + 1);
    else {
      setCompleted(true);
      updateLeaderboard(userName, score + (isCorrect ? 1 : 0));
    }
  };

  const handleStoryChoice = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);
    if (storyIndex + 1 < storyList.length) setStoryIndex(storyIndex + 1);
    else {
      updateLeaderboard(userName, score + (isCorrect ? 1 : 0));
      setGameMode("menu");
      alert("🎉 Story completed! Score updated!");
    }
  };

  const handleFillSubmit = () => {
    let earned = 0;
    fillList.forEach((q, i) => {
      if (answers[i]?.trim().toLowerCase() === q.answer.toLowerCase()) earned++;
    });
    setScore(earned);
    updateLeaderboard(userName, earned);
    setFillCompleted(true);
  };

  // --- MENU ---
  if (gameMode === "menu") {
    return (
      <section className="py-24 px-6 md:px-8 bg-background min-h-screen" style={{ paddingTop: "6rem" }}>
        <div className="container mx-auto grid lg:grid-cols-2 gap-8">
          {/* 🎮 Game Menu */}
          <Card className="w-full shadow-card border-border/50 bg-gradient-card">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">🎮 Gamification Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <input
                type="text"
                placeholder="Enter your name"
                className="border rounded-md px-3 py-2 w-full mb-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Button onClick={startQuiz} disabled={!userName.trim()} className="w-full">
                🧠 Play Quiz Challenge
              </Button>
              <Button onClick={startStory} disabled={!userName.trim()} className="w-full">
                💬 Story-Driven Game
              </Button>
              <Button onClick={startFill} disabled={!userName.trim()} className="w-full">
                ✏️ Fill in the Blanks
              </Button>
            </CardContent>
          </Card>

          {/* 🏆 Enhanced Leaderboard */}
          <Card className="shadow-card border-border/50 bg-gradient-card animate-fade-in [animation-delay:0.2s]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-accent" />
                Community Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.length > 0 ? (
                  leaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                        user.user_name === userName
                          ? "bg-primary/10 border-2 border-primary shadow-glow"
                          : "bg-card border border-border/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">
                          {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⭐"}
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{user.user_name}</div>
                          <div className="text-sm text-muted-foreground">Rank #{index + 1}</div>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-secondary/20 text-secondary border-secondary/30"
                      >
                        {user.score} pts
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">No scores yet! Be the first!</p>
                )}
              </div>

              {/* 🎯 Weekly Challenge Progress */}
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

              {/* 🏅 Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
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
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // --- QUIZ ---
  if (gameMode === "quiz") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full shadow-lg border border-border/50">
          <CardHeader><CardTitle className="text-center text-2xl font-bold">🧠 Quiz Challenge</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            {!completed ? (
              <>
                <Progress value={(current / quiz.length) * 100} className="mb-4" />
                <h2 className="text-lg font-semibold mb-4">{quiz[current].question}</h2>
                {quiz[current].options.map((opt, idx) => (
                  <Button key={idx} onClick={() => handleQuizAnswer(opt)} variant="outline" className="w-full">{opt}</Button>
                ))}
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-2">🎉 Quiz Completed!</h2>
                <p className="text-lg mb-4">Your score: {score} / {quiz.length}</p>
                <Button onClick={() => setGameMode("menu")} className="w-full">Back to Menu</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- STORY ---
  if (gameMode === "story") {
    const story = storyList[storyIndex];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full shadow-lg border border-border/50">
          <CardHeader><CardTitle className="text-center text-2xl font-bold">💬 Story Game</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">{story.text}</p>
            {story.choices.map((choice, i) => (
              <Button key={i} onClick={() => handleStoryChoice(choice.correct)} variant="outline" className="w-full">
                {choice.text}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- FILL ---
  if (gameMode === "fill") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
        <Card className="max-w-md w-full shadow-lg border border-border/50">
          <CardHeader><CardTitle className="text-center text-2xl font-bold">✏️ Fill in the Blanks</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-center">
            {!fillCompleted ? (
              <>
                {fillList.map((q, i) => (
                  <div key={i}>
                    <p className="mb-2 text-lg">{q.sentence.replace("____", "_____")}</p>
                    <input
                      type="text"
                      className="border rounded-md px-3 py-2 w-full mb-2"
                      value={answers[i] || ""}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[i] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                ))}
                <Button onClick={handleFillSubmit} className="w-full">Submit Answers</Button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">🎉 Completed!</h2>
                <p className="text-lg mb-4">Your score: {score} / {fillList.length}</p>
                <Button onClick={() => setGameMode("menu")} className="w-full">Back to Menu</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}