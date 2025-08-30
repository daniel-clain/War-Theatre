import { Character_C } from "./character/character"

type KnownFaction_C = Partial<Faction_C> & Pick<Faction_C, "id">
export class Faction_C {
  id: string
  name: string
  color: string
  leaders: Character_C[] = []
  wealth: number
  members: Character_C[] = []
  knownFactions: KnownFaction_C[] = []
}
