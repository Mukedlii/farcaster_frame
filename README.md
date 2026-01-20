# Farcaster Game Frame

This repository contains a self‑contained **Next.js** project built
with the **frames.js** library. It implements a gamified Farcaster
Frame where users can earn points by completing simple tasks and
mini‑games.

## Why build a game frame?

Frames have become the killer feature of Farcaster: they turn static
casts into fully interactive mini‑apps. A 2025 analysis of the
ecosystem noted that the initial Frames launch in early 2024 caused
Warpcast’s daily active users to surge by **400 %** and enabled
activities like minting NFTs, playing games, swapping tokens and
participating in polls without leaving the feed【407586368038914†L131-L142】.
With the 2025 “Mini App” update, Frames evolved into full‑screen apps
with push notifications and persistent state【407586368038914†L143-L151】.

A catalogue of popular frames from February 2024 lists **Doom in a
Frame**, the **Degen Casino**, the **Neynar Survey** and a **FID
checker** among the most played frames【789518531889957†L69-L86】. These
examples show that simple games and playful utilities capture
attention on Farcaster. Inspired by these trends, this project offers a
compact game where users collect points for performing social actions,
check in daily and play mini‑games. It is designed to be easy to
deploy and extend.

## Features

* **One‑time tasks:** Users earn **50 points** for following the
  author on Farcaster and **25 points** for following on Twitter.
  Recasting the frame awards **10 points** and can be repeated once
  per day.
* **Daily activities:** A daily check‑in awards **1 point**. A
  **Spin Wheel** grants a random reward between 5 and 50 points, and a
  **Red Button** challenge awards 10 points with a 25 % chance to
  double the reward.
* **Bonus page:** A simple quiz question yields 5 points for the
  correct answer, and a leaderboard shows the top five FIDs and their
  scores.
* **Multi‑page navigation:** Frames allow only four buttons per page.
  This frame uses three pages to expose all actions: tasks, daily
  activities and the bonus page/leaderboard. Navigation buttons let
  users move between pages.

## Running locally

1. Install dependencies (requires **npm ≥ 8** and **Node.js 18+**):

   ```bash
   cd farcaster-frame
   cp .env.example .env.local # customise secrets as needed
   npm install
   npm run dev
   ```

2. Visit `http://localhost:3000/frames` in the local frames.js
   debugger or in your Warpcast frame validator to view the frame.
   Interact with the buttons to accumulate points and see the state
   update. Note that the in‑memory leaderboard resets when the server
   restarts.

## Deploying to Vercel

1. Create a new repository (e.g. on GitHub) and push the
   `farcaster-frame` folder contents.
2. In **Vercel**, create a new project from your repository. Vercel
   automatically detects the Next.js app. Set the environment
   variable `FRAME_STATE_SECRET` in the project settings to a random
   string for state signing.
3. Deploy the project. The `/frames` route will be publicly
   available (e.g. `https://your-deployment.vercel.app/frames`). Use
   this URL as the frame URL when composing your Farcaster cast.

## Customisation

* **Update handles:** Replace the placeholder handles in
  `app/frames/route.tsx` with your actual Farcaster and Twitter
  usernames. You can also tweak the point values and add or remove
  tasks as desired.
* **Cover artwork:** The cover image is served from `/frames/cover`
  (generated from an embedded PNG payload) so you can use that URL as
  the preview/cover image when configuring your Farcaster frame URL or
  metadata.
* **Persistent leaderboard:** For a persistent leaderboard across
  deployments, integrate a storage layer such as Vercel KV,
  Upstash Redis or a Postgres database. Replace the `globalScores`
  object with calls to your storage layer.
* **Additional games:** Inspired by popular frames like the Degen
  Casino and Doom, you can add more games as new pages. Just
  introduce new tasks and update the button navigation accordingly.

## Contributing

This project is intentionally kept small and self‑contained. Feel free
to extend it with new mini‑games, animations or on‑chain integrations
(for example, minting an NFT when reaching a certain score). Pull
requests are welcome!
