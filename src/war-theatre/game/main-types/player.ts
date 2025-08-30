import { Client } from "../types/host"
import { Character, CharacterId } from "./character"
import { PlayerOptions } from "./player-options"
import { World } from "./world"
export type PlayerId = string

export type Player = {
  playerId: PlayerId
  lastSentState?: PlayerGameState
  characterId?: CharacterId
  client?: Client
  points: number
}

export type PlayerState = {
  character?: Character
  points: number
}

export type ClientPlayerOptions = {
  [key in keyof PlayerOptions]: PlayerOptions[key]["run"]
}

export type PlayerGameState = {
  playerPoints: number
  character: Character
  worldTime: World["time"]
}

export type GetOptionArgs<Option extends keyof PlayerOptions> = Parameters<
  PlayerOptions[Option]["run"]
>
