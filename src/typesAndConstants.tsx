export const classColors = {
  Warrior: "#8a0a0a",
  Rogue: "#bf6e04",
  Mage: "#4656e8",
  Ranger: "#186f1b",
  Cleric: "#dbbd23",
};

export const NPCColors = {
  PyroClaw: "#7a5558",
  OwlBear: "#645035",
  Wolf: "#616379",
};

export const npcOptions = ["Wolfs(3)", "Owl Bear", "Pyro Claw"];

export interface NPC {
  owner: Player;
  name: string;
  role: string;
  team: "Top" | "Bottom";
  health: number;
  movementBuff: number;
  movementDebuff: number;
  nextHitReduction: number;
  increasedNextRoll: number;
  decreasedNextRoll: number;
  decreasedTurnRoll: number;
  playerNotes: string;
}

export interface Player {
  name: string;
  role: string;
  x: number;
  y: number;
  team: "Top" | "Bottom";
  health: number;
  movementBuff: number;
  movementDebuff: number;
  nextHitReduction: number;
  increasedNextRoll: number;
  decreasedNextRoll: number;
  decreasedTurnRoll: number;
  playerNotes: string;
  tokens: number;
  type: "Player" | "NPC";
}
