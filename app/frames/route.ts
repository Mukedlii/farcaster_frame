import React from "react";
import { Button, createFrames } from "frames.js/next";

type GamePage = "home" | "tasks" | "daily" | "trade";

type GameState = {
  page: GamePage;
  points: number;
  lastCheckIn?: string;
  lastRecast?: string;
  lastTxCheckIn?: string;
  followedFarcaster: boolean;
  followedTwitter: boolean;
  boostUntil?: string;
  btcPrice: number;
  lastMove?: "up" | "down";
  lastResult?: string;
  statusMessage?: string;
};

const initialState: GameState = {
  page: "home",
  points: 0,
  followedFarcaster: false,
  followedTwitter: false,
  btcPrice: 62000,
};

const frames = createFrames<GameState>({
  basePath: "/frames",
  imagesRoute: "/frames",
  initialState,
  stateSigningSecret: process.env.FRAME_STATE_SECRET,
});

const formatPoints = (points: number) => `${points.toLocaleString("en-US")} pts`;

const todayKey = () => new Date().toISOString().split("T")[0];

const isBoostActive = (state: GameState) => state.boostUntil === todayKey();

const applyBoost = (state: GameState, amount: number) =>
  isBoostActive(state) ? amount * 2 : amount;

const el = React.createElement;

const renderImage = (state: GameState) => {
  const accent = "#f43f5e";
  const accentSoft = "#fb7185";
  const accentDark = "#be123c";
  const gridColor = "rgba(148, 163, 184, 0.15)";
  const boostLabel = isBoostActive(state) ? "2x BOOST ACTIVE" : "BOOST INACTIVE";
  const status = state.statusMessage ?? "";

  return el(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        backgroundColor: "#05070f",
        color: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      },
    },
    el("div", {
      style: {
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
        opacity: 0.35,
      },
    }),
    el(
      "div",
      { style: { position: "relative", zIndex: 1 } },
      el(
        "div",
        { style: { fontSize: 28, letterSpacing: 1, fontWeight: 700 } },
        "SATOSHI POINT GRID"
      ),
      el(
        "div",
        { style: { display: "flex", gap: 24, marginTop: 12 } },
        el(
          "div",
          null,
          el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Balance"),
          el("div", { style: { fontSize: 26, fontWeight: 700 } }, formatPoints(state.points))
        ),
        el(
          "div",
          null,
          el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Boost"),
          el(
            "div",
            { style: { fontSize: 18, fontWeight: 600, color: accentSoft } },
            boostLabel
          )
        ),
        el(
          "div",
          null,
          el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Token"),
          el("div", { style: { fontSize: 18, fontWeight: 600, color: accent } }, "$PANIC")
        )
      )
    ),
    el(
      "div",
      { style: { position: "relative", zIndex: 1 } },
      state.page === "home"
        ? el(
            "div",
            { style: { display: "grid", gap: 12 } },
            el("div", { style: { fontSize: 20, fontWeight: 600 } }, "Mission Control"),
            el(
              "div",
              { style: { color: "#cbd5f5", fontSize: 14 } },
              "Collect points with daily actions, then predict BTC movements. Transactions run on Base with minimal fees."
            ),
            el(
              "div",
              { style: { display: "flex", gap: 16, marginTop: 8 } },
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Daily login"),
                el("div", { style: { fontSize: 18 } }, "+1 pt")
              ),
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Short/Long win"),
                el("div", { style: { fontSize: 18 } }, "+10 pts")
              ),
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Airdrop pool"),
                el("div", { style: { fontSize: 18 } }, "70% redistributed")
              )
            )
          )
        : null,
      state.page === "tasks"
        ? el(
            "div",
            { style: { display: "grid", gap: 10 } },
            el("div", { style: { fontSize: 20, fontWeight: 600 } }, "Tasks"),
            el(
              "div",
              { style: { fontSize: 14, color: "#cbd5f5" } },
              "Follow the profiles and recast daily. These actions grant the base points."
            ),
            el(
              "div",
              { style: { display: "grid", gap: 8, marginTop: 6 } },
              el(
                "div",
                null,
                "✅ Farcaster follow: ",
                state.followedFarcaster ? "done" : "+50 pts"
              ),
              el(
                "div",
                null,
                "✅ Twitter follow: ",
                state.followedTwitter ? "done" : "+25 pts"
              ),
              el("div", null, "🔁 Daily recast: +10 pts")
            )
          )
        : null,
      state.page === "daily"
        ? el(
            "div",
            { style: { display: "grid", gap: 10 } },
            el("div", { style: { fontSize: 20, fontWeight: 600 } }, "Daily challenges"),
            el(
              "div",
              { style: { fontSize: 14, color: "#cbd5f5" } },
              "Daily check-in, an on-chain check-in, and the 9,999 panic challenge await you."
            ),
            el(
              "div",
              { style: { display: "flex", gap: 16, marginTop: 6 } },
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Daily on-chain"),
                el("div", { style: { fontSize: 18 } }, "Mini fee")
              ),
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Panic button"),
                el("div", { style: { fontSize: 18, color: accent } }, "9,999 try")
              ),
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Success"),
                el("div", { style: { fontSize: 18 } }, "2x boost")
              )
            )
          )
        : null,
      state.page === "trade"
        ? el(
            "div",
            { style: { display: "grid", gap: 10 } },
            el("div", { style: { fontSize: 20, fontWeight: 600 } }, "BTC short / long"),
            el(
              "div",
              { style: { fontSize: 14, color: "#cbd5f5" } },
              "Predict whether the price moves up or down on the next step."
            ),
            el(
              "div",
              { style: { display: "flex", gap: 24, marginTop: 6 } },
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Price"),
                el(
                  "div",
                  { style: { fontSize: 22, fontWeight: 700 } },
                  `$${state.btcPrice.toLocaleString("en-US")}`
                )
              ),
              el(
                "div",
                null,
                el("div", { style: { fontSize: 12, color: "#94a3b8" } }, "Last move"),
                el(
                  "div",
                  { style: { fontSize: 18 } },
                  state.lastMove ? (state.lastMove === "up" ? "⬆️ up" : "⬇️ down") : "-"
                )
              )
            ),
            el(
              "div",
              {
                style: {
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 16,
                  background: "rgba(15, 23, 42, 0.6)",
                  border: `1px solid ${accentDark}`,
                },
              },
              el(
                "svg",
                { width: "100%", height: "80", viewBox: "0 0 500 80" },
                el("path", {
                  d: "M0 60 L60 50 L120 58 L180 30 L240 34 L300 26 L360 40 L420 22 L500 28",
                  stroke: accentSoft,
                  strokeWidth: "3",
                  fill: "none",
                }),
                el("circle", { cx: "420", cy: "22", r: "4", fill: accent })
              )
            )
          )
        : null
    ),
    el(
      "div",
      { style: { position: "relative", zIndex: 1 } },
      status
        ? el(
            "div",
            {
              style: {
                fontSize: 14,
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(15, 23, 42, 0.85)",
                border: `1px solid ${accent}`,
                color: accentSoft,
                marginBottom: 12,
              },
            },
            status
          )
        : null,
      el("div", { style: { fontSize: 12, color: "#94a3b8" } }, `Page: ${state.page.toUpperCase()}`)
    )
  );
};

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
    buttons: (() => {
      if (nextState.page === "home") {
        return [
          el(Button, { key: "tasks", action: "post" }, "Tasks"),
          el(Button, { key: "daily", action: "post" }, "Daily mode"),
          el(Button, { key: "trade", action: "post" }, "BTC short/long"),
          el(Button, { key: "status", action: "post" }, "Status"),
        ];
      }
      if (nextState.page === "tasks") {
        return [
          el(Button, { key: "follow-farcaster", action: "post" }, "Farcaster follow"),
          el(Button, { key: "follow-twitter", action: "post" }, "Twitter follow"),
          el(Button, { key: "recast", action: "post" }, "Daily recast"),
          el(Button, { key: "back", action: "post" }, "Back"),
        ];
      }
      if (nextState.page === "daily") {
        return [
          el(Button, { key: "checkin", action: "post" }, "Daily check-in"),
          el(
            Button,
            { key: "tx-checkin", action: "tx", target: "/frames/tx", post_url: "/frames" },
            "On-chain check-in"
          ),
          el(Button, { key: "panic", action: "post" }, "Panic 9.999"),
          el(Button, { key: "back", action: "post" }, "Back"),
        ];
      }
      return [
        el(Button, { key: "long", action: "post" }, "Long"),
        el(Button, { key: "short", action: "post" }, "Short"),
        el(Button, { key: "reset", action: "post" }, "Reset chart"),
        el(Button, { key: "back", action: "post" }, "Back"),
      ];
    })(),
    state: nextState,
  };
});

export const GET = handler;
export const POST = handler;
