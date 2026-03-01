import { EntityBehaviour } from "../../game-ui/components/player-ui/components/entity"
import { devUiStyles } from "./dev-ui-styles"

export function BehavioursList({
  item,
}: {
  item: { behaviours: EntityBehaviour[] }
}) {
  return (
    <div>
      <div style={devUiStyles.header}>Behaviours</div>
      {(item.behaviours || []).map((b: EntityBehaviour, i: number) => (
        <div key={i} style={devUiStyles.itemBox}>
          <div>
            Name:{" "}
            <input
              style={devUiStyles.input}
              value={b.name}
              onChange={(e) =>
                updateBehaviour(item, setItem, i, {
                  ...b,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>
      ))}
      <button
        style={devUiStyles.button}
        onClick={() =>
          setItem({
            ...item,
            behaviours: [...(item.behaviours || []), { name: "" }],
          })
        }
      >
        Add Behaviour
      </button>
    </div>
  )
}
