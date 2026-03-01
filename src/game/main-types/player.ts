import { ClientState } from "../types/host";
import { CharacterId } from "./character";
export type Player = ClientState & {
  gameId: string;
  characterId?: CharacterId;
};
