💸 FinMate – Smart Financial Goal Parser & Planner

FinMate is an intelligent web app that helps users convert natural-language financial statements into structured, analyzable data.
Built with React, Vite, TailwindCSS, shadcn/ui, and Supabase, it connects seamlessly to an AI-powered NLP backend powered by Python (NLTK + T5 model).

🚀 Project Overview

FinMate allows users to type or speak financial goals (e.g.,

“I want to save ₹15,000 for rent by next month.”)

and automatically extracts structured fields such as:

Amount: ₹15,000

Currency: INR

Purpose: rent

Timeframe: next month

This structured output is stored and visualized for personalized budgeting, savings insights, and financial recommendations.

🧩 Tech Stack
🖥️ Frontend

React (TypeScript) – component-based UI

Vite – blazing-fast build tool

Tailwind CSS – modern styling

shadcn/ui – pre-styled accessible components

Framer Motion – smooth UI animations

☁️ Backend / Database

Supabase – open-source Firebase alternative for authentication, storage, and Postgres database

Python Backend (FastAPI / Flask) – handles AI model inference

NLTK + Hugging Face Transformers (T5) – natural language processing & goal extraction

⚙️ Installation & Setup
🧠 Prerequisites

Node.js (v18+)

npm or yarn

Python 3.10+

Supabase project (create one at supabase.com
)

🧩 1. Clone Repository
git clone <YOUR_REPO_URL>
cd finmate

🖥️ 2. Setup Frontend
cd client
npm install
npm run dev


The app will start at:
👉 http://localhost:5173

🧠 3. Setup Python Backend
cd server
python -m venv .venv
source .venv/bin/activate   # (use .venv\Scripts\activate on Windows)
pip install -r requirements.txt

