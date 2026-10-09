# SmartDesk 🎫

SmartDesk is a customer support ticketing app. Customers submit support tickets, and an AI
automatically figures out how urgent each one is — so staff can deal with
safety issues first instead of digging through a pile of tickets by hand.

**Live demo:** https://smartdisk.vercel.app
*(it logs you in automatically so you can look around right away — no
account needed)*

---

## What it does

- Customers fill out a simple form to report a problem (name, email, what's wrong)
- As soon as a ticket is submitted, an AI reads it and decides:
  - How urgent is this? (Low / Medium / High)
  - Is it about hardware, software, billing, or shipping?
- Staff see all tickets on a dashboard, sorted so the most urgent ones show up first
- Staff can search, filter by urgency, and sort by date or status
- Staff log in with a username and password before they can see any ticket data

**Example:** if someone writes "my wheelchair's motor is smoking and I can't
move," the AI marks that **High** priority automatically, because it's a
safety risk. A billing question gets marked **Low**. No one has to read every
ticket just to triage it.

---

## How it's built

| Part | What it's made with |
|---|---|
| Frontend (what you see) | React + TypeScript |
| Backend (the server) | ASP.NET Core (.NET) |
| Database | PostgreSQL |
| AI | Groq (a fast AI model) reads each ticket and classifies it |
| Login security | JWT tokens + encrypted passwords (bcrypt) |

**Where it's hosted:**
- The website → [Vercel](https://vercel.com)
- The server → [Render](https://render.com)
- The database → [Neon](https://neon.tech) (a free, cloud-hosted Postgres)
- The AI → [Groq](https://groq.com)

All four of these have free tiers, so this whole app costs nothing to run.

---

## How a ticket flows through the system

1. Customer fills out the "Submit a ticket" form and clicks submit
2. The server saves the basic info, then sends the ticket's details to the AI
3. The AI sends back an urgency level, a category, and a suggested reply
4. The server saves the urgency to the ticket
5. Staff see the ticket appear on the dashboard, already sorted by how urgent it is

If the AI ever fails to respond (network hiccup, etc.), the ticket still
saves normally — it just keeps its default "Medium" urgency instead of
blocking the whole submission.

