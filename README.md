# Applied

> *A 12-month, self-paced curriculum for engineers who want to think like scientists.*

---

Most online ML courses teach you to use the tools.  
Applied teaches you to think with them.

Built for one specific journey — **SDE → Applied Scientist (Generative AI)** — this is a personal learning OS disguised as a web app. Streaks. XP. Weekly homework. Real papers. No skipping ahead.

---

## What it is

A gamified study tracker with a fully structured 52-week curriculum, built the way a Duolingo designer and an ML researcher would build it together.

**The curriculum covers:**

| Phase | Weeks | Topics |
|---|---|---|
| Mathematical Foundations | 1 – 10 | Linear algebra, calculus, probability, statistics, information theory |
| Classical ML | 11 – 22 | Regression, trees, SVMs, ensembles, clustering, evaluation |
| Deep Learning | 23 – 34 | Backprop, CNNs, RNNs, transformers, PyTorch, training at scale |
| Generative AI | 35 – 46 | Attention, GPT, BERT, RLHF, LoRA, RAG, diffusion, LLM inference |
| Interview Prep | 47 – 52 | ML system design, coding, paper walkthroughs, behavioral |

Each week has:
- A **concept** written for engineers unlearning the code-first instinct
- A **paper to read** (real papers — Attention Is All You Need, DDPM, InstructGPT, Chinchilla)
- A **homework checklist** (4 tasks, all must be completed to unlock XP)
- A **reflection prompt** that forces you to articulate, not just execute

---

## How it works

```
Complete homework → Mark week done → Earn XP + streak → Unlock next week
```

- **Streaks** track consecutive study days — break the chain, lose the streak
- **XP** accumulates with bonuses for consistency (3-day: +25 XP, 7-day: +50 XP)
- **Levels** gate milestone badges — 14 badges from *First Step* to *Applied Scientist*
- **Progress is locked forward** — week N requires completing week N-1
- **Everything persists locally** — no account, no backend, no data sent anywhere

---

## Stack

```
Next.js 16   React 19   TypeScript   Tailwind CSS v4
Zustand      shadcn/ui  Lucide icons
```

Two themes — **Parchment** (warm editorial, Playfair Display) and **Todoist** (sharp dark, Space Grotesk) — toggled with a single button in the nav.

---

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Start with Week 1. Do the homework. Don't skip the reflection prompts.

---

## The philosophy

Applied Scientists don't just implement — they **hypothesize, measure, and explain**.  
The curriculum is designed around that mindset shift, not just the technical content.

Every week asks you to derive before you implement, explain before you move on, and sit with the question *why does this work?* before reaching for the library that makes it easy.

---

*Built by [Lutir](https://github.com/Lutir) — one week at a time.*
