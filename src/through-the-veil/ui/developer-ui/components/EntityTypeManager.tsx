import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GameStore, saveEntityType } from "../../game-store"
import { EntityType } from "../../game-ui/components/player-ui/components/entity"
import { devUiStyles } from "./dev-ui-styles"
import { PropertiesList } from "./PropertiesList"

export function EntityTypeManager() {
  const entityTypes = useSelector((store: GameStore) => store.entityTypes)
  const compositionModules = useSelector(
    (store: GameStore) => store.compositionModules
  )
  const dispatch = useDispatch()

  const [activeEntityType, setActiveEntityType] = useState<
    (Omit<EntityType, "id"> & { id?: string }) | null
  >(null)
  console.log("compositionModules", compositionModules)

  return (
    <div id="entity-type-manager" style={devUiStyles.container}>
      {newEntityButtonElem()}
      {entityListElem()}
      {activeEntityType && activeEntityTypeElem()}
    </div>
  )

  function newEntityButtonElem() {
    return (
      <button
        style={devUiStyles.button}
        onClick={() =>
          setActiveEntityType({
            name: "",
            fileName: "",
            isAbstraction: false,
            composedWith: [],
            properties: [],
            behaviours: [],
          })
        }
      >
        New Entity
      </button>
    )
  }

  function entityListElem() {
    return (
      <div style={devUiStyles.section}>
        <div style={devUiStyles.header}>Entities</div>

        {entityTypes.map((entity) => (
          <div key={entity.id} style={devUiStyles.itemBox}>
            <button
              style={devUiStyles.button}
              onClick={() => setActiveEntityType(entity)}
            >
              {entity.name}
            </button>
          </div>
        ))}
      </div>
    )
  }

  function activeEntityTypeElem() {
    if (!activeEntityType) return
    return (
      <div id="entityType" style={devUiStyles.section}>
        <div style={devUiStyles.header}>
          {activeEntityType.id
            ? `Edit ${activeEntityType.name}`
            : `New Entity Type`}
        </div>
        <div>
          Name:{" "}
          <input
            style={devUiStyles.input}
            value={activeEntityType.name || ""}
            onChange={({ target }) =>
              setActiveEntityType({
                ...activeEntityType,
                name: target.value,
              })
            }
          />
        </div>
        <div>
          File:{" "}
          <input
            style={devUiStyles.input}
            value={activeEntityType.fileName || ""}
            onChange={(e) =>
              setActiveEntityType({
                ...activeEntityType!,
                fileName: e.target.value,
              })
            }
          />
        </div>
        <div>
          Is Abstraction:{" "}
          <input
            type="checkbox"
            checked={activeEntityType.isAbstraction}
            onChange={(e) =>
              setActiveEntityType({
                ...activeEntityType!,
                isAbstraction: e.target.checked,
              })
            }
          />
        </div>
        <div>
          Extends Entity:{" "}
          <select
            style={devUiStyles.select}
            value={activeEntityType.extendsEntity}
            onChange={(e) =>
              setActiveEntityType({
                ...activeEntityType!,
                extendsEntity: e.target.value,
              })
            }
          >
            <option value={undefined}>none</option>
            {entityTypes
              .filter((e) => e.isAbstraction)
              .map((e) => e.id)
              .map((id) => (
                <option key={id} value={id}>
                  {entityTypes.find((e) => e.id == id)?.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          Composed With:{" "}
          <select
            style={devUiStyles.select}
            multiple
            value={activeEntityType.composedWith}
            onChange={({ target }) => {
              const ids = Array.from(target.selectedOptions).map(
                (elem) => elem.value
              )
              console.log(ids)
              setActiveEntityType({
                ...activeEntityType!,
                composedWith: ids,
              })
            }}
          >
            {compositionModules
              .map((e) => e.id)
              .map((id) => (
                <option key={id} value={id}>
                  {compositionModules.find((e) => e.id == id)?.name}
                </option>
              ))}
          </select>
        </div>
        <hr />
        <PropertiesList
          setActiveItem={setActiveEntityType}
          activeItem={activeEntityType!}
        />
        {/* <BehavioursList item={activeEntityType!} /> */}
        <hr />
        <button style={devUiStyles.button} onClick={handleSave}>
          Save Entity
        </button>
      </div>
    )
  }

  function handleSave() {
    if (!activeEntityType) return
    let { name, fileName, id } = activeEntityType
    if (!name || !fileName) return alert("Missing required fields")

    const e: EntityType = {
      ...activeEntityType,
      id: id ?? Date.now().toString(),
    }

    dispatch(saveEntityType(e))
    setActiveEntityType(null)
  }
}
