import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { game } from "../game/game"
import { DeveloperUi } from "./developer-ui/DeveloperUi"

import { dataStorageService } from "./developer-ui/services/data-storage-service"
import {
  gameStore,
  GameStore,
  setActiveView,
  setActiveWorldState,
  setCompositionModules,
  setEntityTypes,
  setExistingWorld,
} from "./game-store"
import GameUi from "./game-ui/GameUi"

const { fetchWorldState, fetchEntityTypes, fetchCompositionModules } =
  dataStorageService

export function ThroughTheVeil() {
  const { activeView, existingWorld } = useSelector(
    ({ activeView, existingWorld }: GameStore) => ({
      activeView,
      existingWorld,
    })
  )

  const dispatch = useDispatch()

  useEffect(() => {
    Promise.all([
      fetchWorldState(),
      fetchEntityTypes(),
      fetchCompositionModules(),
    ]).then(([worldState, entityTypes, compositionModules]) => {
      worldState && dispatch(setExistingWorld(worldState))
      entityTypes && dispatch(setEntityTypes(entityTypes))
      console.log("compositionModules", compositionModules)
      compositionModules && dispatch(setCompositionModules(compositionModules))
    })
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Through the Veil</h1>

      <DeveloperUi />

      <hr />

      {activeView == "main" && (
        <>
          {startNewGameButton()}
          {existingWorld && resumeExistingGameButton()}
        </>
      )}

      {activeView == "game" && <GameUi />}
    </div>
  )

  function startNewGameButton() {
    return (
      <button
        onClick={handleStartNewGame}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Start New Game
      </button>
    )
  }

  function resumeExistingGameButton() {
    return (
      <button
        onClick={handleResumeExistingGame}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Resume Existing Game
      </button>
    )
  }

  function backToMainButton() {
    return (
      <button
        onClick={handleBackToMain}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to main
      </button>
    )
  }

  function updateWorldStateFunction(updatedWorld) {
    return dispatch(setActiveWorldState(updatedWorld))
  }

  function handleResumeExistingGame() {
    game.startGame(existingWorld!, updateWorldStateFunction)
    dispatch(setActiveView("game"))
  }
  function handleStartNewGame() {
    const state = gameStore.getState()
    const activeWorld = state.activeWorld
    game.startGame(activeWorld, updateWorldStateFunction)
    dispatch(setActiveView("game"))
  }

  function handleBackToMain() {
    dispatch(setActiveView("main"))
  }
}
