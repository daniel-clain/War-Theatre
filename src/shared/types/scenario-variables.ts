export type Scenario = {
  id: string;
  name: string;
  scene: Scene;
};

export type Scene = {
  name: string;
  requiredCharacterRoles?: {
    type: string;
    role: string;
    quantity: number;
  }[];
  requiredBuildings?: {
    type: string;
    quantity: number;
  }[];
};

const medivalTownScene: Scene = {
  name: "Medival Town",
};

const zombieApocalypseFortressScene: Scene = {
  name: "Zombie Apocalypse Fortress",
};

const remoteIslandScene: Scene = {
  name: "Remote Island",
};

const campingAdventurersScene: Scene = {
  name: "Camping Adventurers",
};

type Threat = {
  name: string;
  description: string;
};

const freezeToDeath: Threat = {
  name: "Freeze to Death",
  description:
    "The characters must find a way to stay warm and survive the cold.",
};
