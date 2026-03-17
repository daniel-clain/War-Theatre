import { ClientId } from "../types/host";
import { AlignmentName, AlignmentRating } from "./alignment";
import { Archetype } from "./archetype";
import { Faction } from "./faction";
import { Item } from "./item";
import { Plan } from "./plan";
import { Tile } from "./tile";
import { Trait } from "./traits";
import { WorldObject } from "./world-object";

export type CharacterId = string;
export type Character = WorldObject & {
  objectType: "character";
  clientId?: ClientId | null;
  name: string;
  archetype?: Archetype;
  dead?: boolean;
  money?: number;
  activePlan?: Plan | null;
  items?: Item[];
  plans?: Plan[];
  experiences?: Experience[];
  goal?: Goal;
  worldView: WorldView;

  faction?: Faction;
  currentSituation?: Situation;
  backStory?: string;
  information?: Information[];
  values?: Value[];
  traits?: Trait[];

  inPrison?: boolean;
};

type Goal = {};

type Experience = {
  time: number;
  description: string;
  informationGained: string;
};

export type WorldView = {
  knownTiles: Tile[];
  knownObjects: WorldObject[];
};

export type KnownCharacter = Partial<Character> & {
  name: string;
  gameStepLastSeen: number;
};

export type Belief<Ar extends AlignmentRating = AlignmentRating> = {
  alignmentRating?: Ar;
  details: string;
};
export type Value<A extends AlignmentName = AlignmentName> = {
  alignment?: A;
  name: string;
};

export type Situation = {
  description: string;
  keyFactors: string[];
  decisionOptions: Plan[];
};

export type SkillName =
  | "strength"
  | "engineering"
  | "stealth"
  | "persuasion"
  | "combat";

export type Skill = {
  name: SkillName;
  level: number;
};

export type Information = {
  sourceCharacter: KnownCharacter;
  partialWorldView: Partial<WorldView>;
  believed: boolean | undefined;
  detials: string;
};
