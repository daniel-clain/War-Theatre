import { CharacterId, KnownCharacter } from "./character";

import { WorldUnit } from "./biome";
import { World } from "./world";

export type Requirement = {
  name: string;
  test: () => boolean;
};

export type Plan = {
  isComplete: boolean;
  isActivated: boolean;
  isChannelling: boolean;
  channelProgress: number;
  totalChannelTime?: number;
  channelRequirements?: Requirement[];

  targetCoords?: WorldUnit;
  targetCharacter?: KnownCharacter;
  targetLandmark?: KnownCharacter;
  name: string;
  thisCharacter: CharacterId;
  world: World;
};
