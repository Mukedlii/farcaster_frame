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

const renderImage = (state: GameState) => {
  const accent = "#f43f5e";
  const accentSoft = "#fb7185";
  const accentDark = "#be123c";
  const gridColor = "rgba(148, 163, 184, 0.15)";
  const boostLabel = isBoostActive(state) ? "2x BOOST ACTIVE" : "BOOST INACTIVE";
  const status = state.statusMessage ?? "";

  return (
    <div
      style={{
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
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: 0.35,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 28, letterSpacing: 1, fontWeight: 700 }}>
          SATOSHI POINT GRID
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Balance</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              {formatPoints(state.points)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Boost</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: accentSoft }}>
              {boostLabel}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#94a3b8" }}>Token</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: accent }}>
              $PANIC
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {state.page === "home" && (
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Mission Control</div>
            <div style={{ color: "#cbd5f5", fontSize: 14 }}>
              Collect points with daily actions, then predict BTC movements. Transactions run on
              Base with minimal fees.
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Daily login</div>
                <div style={{ fontSize: 18 }}>+1 pt</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Short/Long win</div>
                <div style={{ fontSize: 18 }}>+10 pts</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Airdrop pool</div>
                <div style={{ fontSize: 18 }}>70% redistributed</div>
              </div>
            </div>
          </div>
        )}

        {state.page === "tasks" && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Tasks</div>
            <div style={{ fontSize: 14, color: "#cbd5f5" }}>
              Follow the profiles and recast daily. These actions grant the base points.
            </div>
            <div style={{ display: "grid", gap: 8, marginTop: 6 }}>
              <div>✅ Farcaster follow: {state.followedFarcaster ? "done" : "+50 pts"}</div>
              <div>✅ Twitter follow: {state.followedTwitter ? "done" : "+25 pts"}</div>
              <div>🔁 Daily recast: +10 pts</div>
            </div>
          </div>
        )}

        {state.page === "daily" && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>Daily challenges</div>
            <div style={{ fontSize: 14, color: "#cbd5f5" }}>
              Daily check-in, an on-chain check-in, and the 9,999 panic challenge await you.
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Daily on-chain</div>
                <div style={{ fontSize: 18 }}>Mini fee</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Panic button</div>
                <div style={{ fontSize: 18, color: accent }}>9,999 try</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Success</div>
                <div style={{ fontSize: 18 }}>2x boost</div>
              </div>
            </div>
          </div>
        )}

        {state.page === "trade" && (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>BTC short / long</div>
            <div style={{ fontSize: 14, color: "#cbd5f5" }}>
              Predict whether the price moves up or down on the next step.
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 6 }}>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Price</div>
                <div style={{ fontSize: 22, fontWeight: 700 }}>
                  ${state.btcPrice.toLocaleString("en-US")}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Last move</div>
                <div style={{ fontSize: 18 }}>
                  {state.lastMove ? (state.lastMove === "up" ? "⬆️ up" : "⬇️ down") : "-"}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 10,
                padding: 12,
                borderRadius: 16,
                background: "rgba(15, 23, 42, 0.6)",
                border: `1px solid ${accentDark}`,
              }}
            >
              <svg width="100%" height="80" viewBox="0 0 500 80">
                <path
                  d="M0 60 L60 50 L120 58 L180 30 L240 34 L300 26 L360 40 L420 22 L500 28"
                  stroke={accentSoft}
                  strokeWidth="3"
                  fill="none"
                />
                <circle cx="420" cy="22" r="4" fill={accent} />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {status && (
          <div
            style={{
              fontSize: 14,
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(15, 23, 42, 0.85)",
              border: `1px solid ${accent}`,
              color: accentSoft,
              marginBottom: 12,
            }}
          >
            {status}
          </div>
        )}
        <div style={{ fontSize: 12, color: "#94a3b8" }}>
          Page: {state.page.toUpperCase()}
        </div>
      </div>
    </div>
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
          <Button key="tasks" action="post">
            Tasks
          </Button>,
          <Button key="daily" action="post">
            Daily mode
          </Button>,
          <Button key="trade" action="post">
            BTC short/long
          </Button>,
          <Button key="status" action="post">
            Status
          </Button>,
        ];
      }
      if (nextState.page === "tasks") {
        return [
          <Button key="follow-farcaster" action="post">
            Farcaster follow
          </Button>,
          <Button key="follow-twitter" action="post">
            Twitter follow
          </Button>,
          <Button key="recast" action="post">
            Daily recast
          </Button>,
          <Button key="back" action="post">
            Back
          </Button>,
        ];
      }
      if (nextState.page === "daily") {
        return [
          <Button key="checkin" action="post">
            Daily check-in
          </Button>,
          <Button key="tx-checkin" action="tx" target="/frames/tx" post_url="/frames">
            On-chain check-in
          </Button>,
          <Button key="panic" action="post">
            Panic 9.999
          </Button>,
          <Button key="back" action="post">
            Back
          </Button>,
        ];
      }
      return [
        <Button key="long" action="post">
          Long
        </Button>,
        <Button key="short" action="post">
          Short
        </Button>,
        <Button key="reset" action="post">
          Reset chart
        </Button>,
        <Button key="back" action="post">
          Back
        </Button>,
      ];
    })(),
    state: nextState,
  };
});

export const GET = handler;
export const POST = handler;
