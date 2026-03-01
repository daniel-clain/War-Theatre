import { useState } from "react"
import {
  EntityProperty,
  PropertyType,
  propertyTypes,
} from "../../game-ui/components/player-ui/components/entity"
import { updateOrAddById } from "../services/helper-funcs"
import { devUiStyles } from "./dev-ui-styles"

export function PropertiesList<
  T extends { id?: string; properties: EntityProperty[] }
>({
  activeItem,
  setActiveItem,
}: {
  activeItem: T
  setActiveItem: React.Dispatch<
    React.SetStateAction<
      | (Omit<T, "id"> & {
          id?: string
        })
      | null
    >
  >
}) {
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null)

  const activeProperty = activeItem.properties.find(
    (p) => p.id == activePropertyId
  )
  console.log("activeItem", activeItem)
  console.log("activePropety", activePropertyId)

  return (
    <div style={{ marginLeft: 10 }}>
      <h4>Properties</h4>

      {propetyListElem()}
      {newPropetyButtonElem()}
      {activePropertyId && activePropetyElem()}
    </div>
  )

  function newPropetyButtonElem() {
    return (
      <button
        style={devUiStyles.button}
        onClick={() => {
          const newProperty: EntityProperty = {
            id: Date.now().toString(),
            name: "",
            type: "string",
          }

          updateProperty(newProperty)
          setActivePropertyId(newProperty.id)
        }}
      >
        Add Property
      </button>
    )
  }
  function propetyListElem() {
    return (
      <div>
        {activeItem.properties.map((property) => (
          <div key={property.id} style={devUiStyles.itemBox}>
            <button
              style={devUiStyles.button}
              onClick={() => setActivePropertyId(property.id)}
            >
              {property.name}
            </button>
          </div>
        ))}
      </div>
    )
  }
  function activePropetyElem() {
    if (!activeProperty) return
    return (
      <div id="entityProperty">
        <div>
          Name:{" "}
          <input
            style={devUiStyles.input}
            value={activeProperty.name}
            onChange={({ target }) =>
              updateProperty({
                ...activeProperty,
                name: target.value,
              })
            }
          />
        </div>
        <div>
          Type:{" "}
          <select
            style={devUiStyles.select}
            value={activeProperty.type}
            onChange={(e) =>
              updateProperty({
                ...activeProperty,
                type: e.target.value as PropertyType,
              })
            }
          >
            {propertyTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {activeProperty.type === "reference" && (
          <div>
            Reference Entity ID:{" "}
            <input
              style={devUiStyles.input}
              value={activeProperty.referenceEntityId || ""}
              onChange={(e) =>
                updateProperty({
                  ...activeProperty,
                  referenceEntityId: e.target.value,
                })
              }
            />
          </div>
        )}
        <div>
          Default:{" "}
          <input
            style={devUiStyles.input}
            value={activeProperty.defaultValue || ""}
            onChange={(e) =>
              updateProperty({
                ...activeProperty,
                defaultValue: e.target.value,
              })
            }
          />
        </div>
      </div>
    )
  }

  function updateProperty(prop: EntityProperty) {
    console.log("update", prop)
    setActiveItem({
      ...activeItem,
      properties: updateOrAddById(activeItem.properties, prop),
    })
  }
}
