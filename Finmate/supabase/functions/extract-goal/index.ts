import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goalText } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Extracting goal from text:", goalText);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a financial goal extraction assistant. Extract structured information from natural language goal descriptions. 
            Return a JSON object with: 
            - purpose: string (what they want to buy/achieve)
            - amount: number (total amount in rupees, convert lakhs/crores to actual numbers)
            - timeframe: string (original timeframe text like "6 months", "2 years")
            - timeframe_months: number (convert timeframe to months)
            
            Example: "I want to buy a car within 6 months worth ₹7 lakhs"
            Should return: {"purpose": "Buy a car", "amount": 700000, "timeframe": "6 months", "timeframe_months": 6}`
          },
          {
            role: "user",
            content: goalText
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_financial_goal",
              description: "Extract financial goal details from natural language",
              parameters: {
                type: "object",
                properties: {
                  purpose: { type: "string", description: "The goal or purchase intention" },
                  amount: { type: "number", description: "Total amount in rupees" },
                  timeframe: { type: "string", description: "Original timeframe text" },
                  timeframe_months: { type: "number", description: "Timeframe converted to months" }
                },
                required: ["purpose", "amount", "timeframe", "timeframe_months"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_financial_goal" } }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add funds to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    console.log("AI response:", JSON.stringify(data));

    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error("No tool call in response");
    }

    const extractedGoal = JSON.parse(toolCall.function.arguments);
    
    // Calculate monthly contribution
    const monthlyContribution = extractedGoal.amount / extractedGoal.timeframe_months;

    return new Response(
      JSON.stringify({
        ...extractedGoal,
        monthly_contribution: Math.round(monthlyContribution)
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in extract-goal function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
