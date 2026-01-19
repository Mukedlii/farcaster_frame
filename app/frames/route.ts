import { createFrames } from "frames.js/next";

export const runtime = "edge";

import type { GameState } from "./types";
import { applyBoost, todayKey } from "./state";
import { renderButtons, renderImage } from "./ui";

const initialState: GameState = {
  page: "home",
  points: 0,
  followedFarcaster: false,
  followedTwitter: false,
  btcPrice: 62000,
};

const frames = createFrames<GameState>({
  basePath: "/frames",
  imagesRoute: "/",
  initialState,
  stateSigningSecret: process.env.FRAME_STATE_SECRET,
});

const handler = frames(async (ctx) => {
  const pressed = ctx.pressedButton?.index;
  let nextState: GameState = {
    ...ctx.state,
    statusMessage: undefined,
  };

  if (ctx.message?.transactionId) {
    const today = todayKey();
    if (nextState.lastTxCheckIn !== today) {
      nextState.lastTxCheckIn = today;
      const boosted = applyBoost(nextState, 1);
      nextState.points += boosted;
      nextState.statusMessage = `On-chain check-in credited (+${boosted} pts)`;
    } else {
      nextState.statusMessage = "Today's on-chain check-in is already recorded.";
    }
  }

  const awardPoints = (amount: number, message: string) => {
    const boosted = applyBoost(nextState, amount);
    nextState = {
      ...nextState,
      points: nextState.points + boosted,
      statusMessage: `${message} (+${boosted} pts)`,
    };
  };

  if (pressed) {
    if (nextState.page === "home") {
      if (pressed === 1) nextState.page = "tasks";
      if (pressed === 2) nextState.page = "daily";
      if (pressed === 3) nextState.page = "trade";
      if (pressed === 4) nextState.statusMessage = "Ready for the next round.";
    } else if (nextState.page === "tasks") {
      if (pressed === 1) {
        if (nextState.followedFarcaster) {
          nextState.statusMessage = "Farcaster follow already completed.";
        } else {
          nextState.followedFarcaster = true;
          awardPoints(50, "Farcaster follow credited");
        }
      }
      if (pressed === 2) {
        if (nextState.followedTwitter) {
          nextState.statusMessage = "Twitter follow already completed.";
        } else {
          nextState.followedTwitter = true;
          awardPoints(25, "Twitter follow credited");
        }
      }
      if (pressed === 3) {
        const today = todayKey();
        if (nextState.lastRecast === today) {
          nextState.statusMessage = "Today's recast is already done.";
        } else {
          nextState.lastRecast = today;
          awardPoints(10, "Recast successful");
        }
      }
      if (pressed === 4) nextState.page = "home";
    } else if (nextState.page === "daily") {
      if (pressed === 1) {
        const today = todayKey();
        if (nextState.lastCheckIn === today) {
          nextState.statusMessage = "You already checked in today.";
        } else {
          nextState.lastCheckIn = today;
          awardPoints(1, "Daily check-in");
        }
      }
      if (pressed === 2) {
        nextState.statusMessage = "On-chain check-in transaction started.";
      }
      if (pressed === 3) {
        const success = Math.random() < 0.15;
        if (success) {
          nextState.boostUntil = todayKey();
          awardPoints(15, "You stopped at 9,999! 2x boost activated");
        } else {
          nextState.statusMessage = "Not this time. Try again tomorrow!";
        }
      }
      if (pressed === 4) nextState.page = "home";
    } else if (nextState.page === "trade") {
      if (pressed === 1 || pressed === 2) {
        const prediction = pressed === 1 ? "up" : "down";
        const movement = Math.random() < 0.52 ? "up" : "down";
        const delta = Number((Math.random() * 1.6 + 0.4).toFixed(2));
        const priceMove = Math.round(delta * 100);
        nextState.btcPrice = Math.max(
          15000,
          nextState.btcPrice + (movement === "up" ? priceMove : -priceMove)
        );
        nextState.lastMove = movement;
        if (prediction === movement) {
          awardPoints(10, prediction === "up" ? "Long win" : "Short win");
          nextState.lastResult = "Hit";
        } else {
          nextState.statusMessage = "Prediction missed. No points.";
          nextState.lastResult = "Miss";
        }
      }
      if (pressed === 3) {
        nextState.btcPrice = 62000;
        nextState.lastMove = undefined;
        nextState.lastResult = undefined;
        nextState.statusMessage = "Chart reset.";
      }
      if (pressed === 4) nextState.page = "home";
    }
  }

  return {
    image: renderImage(nextState),
    imageOptions: { aspectRatio: "1.91:1" },
    buttons: renderButtons(nextState.page),
    state: nextState,
  };
});

export const GET = handler;
export const POST = handler;
