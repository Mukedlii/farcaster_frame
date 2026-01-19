export type GamePage = "home" | "tasks" | "daily" | "trade";

export type GameState = {
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
