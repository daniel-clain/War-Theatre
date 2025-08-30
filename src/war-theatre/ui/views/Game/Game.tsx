import { useContext } from "react"
import { GameContext } from "../../AppContext/game.provider"
import { ExpandCollapseContainer } from "../../general-components/ExpandCollapseContainer"
import { Character_C } from "./components/Character"
import { CharacterSelectDropdown } from "./components/CharacterSelectDropdown"
import { GameMap } from "./components/GameMap"
import { GameTime } from "./components/GameTime"
import { PlayerOptions_C } from "./components/PlayerOptions"

export function Game_C() {
  console.log("rerender game")
  const { player, world } = useContext(GameContext)

  return (
    <div>
      <GameTime time={world.time} />
      <CharacterSelectDropdown />

      <PlayerOptions_C />

      {player.character && (
        <>
          <ExpandCollapseContainer title={"Your Character"}>
            <Character_C character={player.character} />
          </ExpandCollapseContainer>
          <ExpandCollapseContainer title={"Your Character"}>
            <Character_C character={player.character} />
          </ExpandCollapseContainer>
        </>
      )}

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
  )
}
