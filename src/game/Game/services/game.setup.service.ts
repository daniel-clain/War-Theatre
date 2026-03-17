import { random } from "lodash";
import { nanoid } from "nanoid";
import { Player } from "../../../game/main-types/player";
import { ClientState } from "../../../shared/types/host";
import { Scenario } from "../../../shared/types/scenario-variables";
import { gameConfig } from "../../game-config";
import { Character } from "../../main-types/character";
import { WorldUnit } from "../../main-types/tile";
import { World } from "../../main-types/world";
import { generateMap } from "../../map-generation-algorithm";
import { moveCharacterToWorldUnit } from "./character.service";
export function createPlayers(
  clients: ClientState[],
  characters: Character[],
): Player[] {
  const players: Player[] = [];
  clients.forEach((c) => {
    const randomCharacter = getRandomCharacter(characters);

    const player: Player = {
      clientId: c.clientId,
      characterId: null,
      lastSentState: null,
    };

    assignCharacterToPlayer(randomCharacter, player);

    players.push(player);
  });

  return players;
}

function getRandomCharacter(characters: Character[]): Character {
  console.log(
    "characters",
    characters.map((c) => c.name),
  );
  const availableCharacters = characters.filter((c) => !c.clientId);
  console.log(
    "availableCharacters",
    availableCharacters.map((c) => c.name),
  );

  const randomIndex = random(0, availableCharacters.length - 1);
  console.log("randomIndex", randomIndex);
  const randomCharacter = availableCharacters[randomIndex];

  console.log("randomCharacter", randomCharacter.name);
  return randomCharacter;
}

export function getScenarioInstance(scenario: Scenario): {
  world: World;
} {
  const { tiles, towns, buildings } = generateMap();
  console.log("towns", towns);
  console.log("buildings", buildings);

  const bob: Character = {
    name: "Bob",
    clientId: null,
    objectType: "character",
    origin: {
      x: 0,
      z: 0,
    },
    objectId: nanoid(),
    worldView: {
      knownTiles: [],
      knownObjects: [...towns, ...buildings],
    },
  };

  const world: World = {
    time: 0,
    mechanics: [],
    characters: [bob],
    towns,
    tiles,
    regions: [],
    landmarks: [],
    items: [],
    animals: [],
    buildings,
  };

  populateCharacterWorldViewByVisitingAllTiles(bob, world);

  console.log("bob", bob);

  return {
    world,
  };

  function populateCharacterWorldViewByVisitingAllTiles(
    character: Character,
    world: World,
  ): void {
    const worldUnitsPerTile = gameConfig.worldUnitsPerTile;
    const centerOffset = Math.floor(worldUnitsPerTile / 2);
    for (const tile of world.tiles) {
      const worldUnit: WorldUnit = {
        x: tile.topLeftWorldUnit.x + centerOffset,
        z: tile.topLeftWorldUnit.z + centerOffset,
      };
      moveCharacterToWorldUnit(character, worldUnit, world);
    }
  }
}

function assignCharacterToPlayer(character: Character, player: Player): void {
  player.characterId = character.objectId;
  character.clientId = player.clientId;
}
