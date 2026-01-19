import type { GameState } from "./types";

export const todayKey = () => new Date().toISOString().split("T")[0];

export const isBoostActive = (state: GameState) => state.boostUntil === todayKey();

export const applyBoost = (state: GameState, amount: number) =>
  isBoostActive(state) ? amount * 2 : amount;
