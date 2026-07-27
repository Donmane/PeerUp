# PeerUp — Find Your Study Tribe

A student study help notice board where you can post what you're stuck on and connect with peers who can help. Built with React and Supabase.

## Live Demo

🔗 [https://peer-up-eight.vercel.app/](https://peer-up-eight.vercel.app/)

## What It Is

PeerUp is a notice board for students. If you missed a lecture, struggling with a topic, or just need someone to study with — you post your request and other students can reach out directly via email. No in-app messaging, no complexity. Just post, connect, and study.

## Features

- Browse all study requests without signing in
- Sign up and post your own help requests
- Search posts by subject in real time
- Contact the poster directly via email with one click
- Delete your own posts when you no longer need help
- Clean warm dark UI that actually feels like a safe space

## Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS v3 | Styling |
| React Router DOM | Client-side navigation |
| Supabase | Backend, PostgreSQL database, and authentication |
| Vercel | Deployment and hosting |
| GitHub | Version control |

## How It Works

Anyone can visit PeerUp and browse all posted study requests. To post a request or delete your own posts, you need to create an account. When you post, your email is attached to the request so interested students can contact you directly — no in-app chat needed.

## Database Structure

One table powers the whole app:

| Column | Type | Purpose |
|---|---|---|
| id | int8 | Auto-generated primary key |
| created_at | timestamp | Auto-generated creation time |
| subject | text | The subject or topic e.g. MTH 211 |
| description | text | What the student needs help with |
| email | text | Poster's email for contact |
| user_id | uuid | Links the post to the logged in user |

## How to Run Locally

### Prerequisites
- Node.js installed
- A Supabase account

### Installation

```bash
git clone https://github.com/Donmane/PeerUp.git
cd PeerUp
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

## Author

**Daniel Edith-Agoye (Markaid)**
- GitHub: [@Donmane](https://github.com/Donmane)
- LinkedIn: [daniel-edith-agoye](https://linkedin.com/in/daniel-edith-agoye-30ba3a411)
- Institution: Lead City University, Ibadan, Nigeria

---

Built as a personal portfolio project — a real solution to a real student problem.