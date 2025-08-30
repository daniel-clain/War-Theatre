// EntityManager.tsx - Corrected and extended for proper EntityType and ComposureModule structure
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GameStore, saveCompositionModule } from "../../game-store"
import { CompositionModule } from "../../game-ui/components/player-ui/components/entity"
import { devUiStyles } from "./dev-ui-styles"
import { PropertiesList } from "./PropertiesList"

export function CompositionModuleManager() {
  const compositionModules = useSelector(
    (store: GameStore) => store.compositionModules
  )
  const dispatch = useDispatch()

  const [activeCompositionModule, setActiveCompositionModule] = useState<
    (Omit<CompositionModule, "id"> & { id?: string }) | null
  >(null)

  return (
    <div style={devUiStyles.container}>
      <div id="composition-module-manager">
        {newModuleButtonElem()}
        {moduleListElem()}
        {activeCompositionModule && activeModuleElem()}
      </div>
    </div>
  )

  function newModuleButtonElem() {
    return (
      <button
        style={devUiStyles.button}
        onClick={() =>
          setActiveCompositionModule({
            name: "",
            fileName: "",
            properties: [],
            behaviours: [],
          })
        }
      >
        New Composition Module
      </button>
    )
  }

  function moduleListElem() {
    return (
      <div style={devUiStyles.section}>
        <div style={devUiStyles.header}>Composition Modules</div>

        {compositionModules.map((module) => (
          <div key={module.id} style={devUiStyles.itemBox}>
            <button
              style={devUiStyles.button}
              onClick={() => setActiveCompositionModule(module)}
            >
              {module.name}
            </button>
          </div>
        ))}
      </div>
    )
  }

  function activeModuleElem() {
    if (!activeCompositionModule) return
    return (
      <div id="compositionModule" style={devUiStyles.section}>
        <div style={devUiStyles.header}>
          {activeCompositionModule.id
            ? `Edit ${activeCompositionModule.name}`
            : `New Composition Module`}
        </div>
        <div>
          Name:{" "}
          <input
            style={devUiStyles.input}
            value={activeCompositionModule.name || ""}
            onChange={({ target }) =>
              setActiveCompositionModule({
                ...activeCompositionModule,
                name: target.value,
              })
            }
          />
        </div>
        <div>
          File:{" "}
          <input
            style={devUiStyles.input}
            value={activeCompositionModule.fileName || ""}
            onChange={(e) =>
              setActiveCompositionModule({
                ...activeCompositionModule!,
                fileName: e.target.value,
              })
            }
          />
        </div>

        <hr />
        <PropertiesList
          setActiveItem={setActiveCompositionModule}
          activeItem={activeCompositionModule!}
        />
        {/* <BehavioursList item={activeCompositionModule!} /> */}
        <hr />
        <button style={devUiStyles.button} onClick={handleSave}>
          Save Composition Module
        </button>
      </div>
    )
  }

  function handleSave() {
    if (!activeCompositionModule) return
    let { name, fileName, id } = activeCompositionModule
    if (!name || !fileName) return alert("Missing required fields")

    const c: CompositionModule = {
      ...activeCompositionModule,
      id: id ?? Date.now().toString(),
    }

    dispatch(saveCompositionModule(c))
    setActiveCompositionModule(null)
  }
}
