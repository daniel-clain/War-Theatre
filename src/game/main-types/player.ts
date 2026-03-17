import { ClientId } from "../types/host";
import { Character, CharacterId } from "./character";

export type Player = {
  clientId: ClientId;
  characterId: CharacterId | null;
  lastSentState: PlayerGameState | null;
};

export type PlayerGameState = {
  worldTime: number;
  character: Character;
};
