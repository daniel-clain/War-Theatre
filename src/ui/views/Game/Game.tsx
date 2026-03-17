import { useContext } from "react";
import { GameContext } from "../../Context/GameProvider";
import { GameMap } from "./components/GameMap";
import { GameTime } from "./components/GameTime";

export function Game_C() {
  console.log("rerender game");
  const { playerGameState } = useContext(GameContext);
  if (!playerGameState) return null;

  const { character, worldTime } = playerGameState;
  console.log("character", character);

  return (
    <div>
      <GameTime time={worldTime} />
      {/* <CharacterSelectDropdown />

      <PlayerOptions_C />

      {character && (
        <>
          <ExpandCollapseContainer title={"Your Character"}>
            <Character_C character={character} />
          </ExpandCollapseContainer>
          <ExpandCollapseContainer title={"Your Character"}>
            <Character_C character={character} />
          </ExpandCollapseContainer>
        </>
      )}

       */}
      <GameMap />

      {/* <ExpandCollapseContainer title={"Characters"}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            padding: 20,
          }}
        >
          {playersCharacter?.worldView.characters?.map((character) => (
            <Character_C key={character.player.id} {...{ character }} />
          ))}
        </div>
      </ExpandCollapseContainer> */}
    </div>
  );
}
