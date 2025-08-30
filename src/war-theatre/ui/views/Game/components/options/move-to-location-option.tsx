/* import { useContext, useState } from "react"
import { Coords } from "../../../../shared/types/position"
import { Context } from "../../../../AppContext/GlobalProvider"

export function MoveToLocationOption() {
  const { player, send } = useContext(Context)
  const [coords, setCoords] = useState<Partial<Coords> | undefined>()

  return (
    <div>
      <h3>select location to move</h3>
      <div>
        x:{" "}
        <input
          onChange={(e) => {
            const val = Number(e.target.value)
            console.log(val)
            if (!isNaN(val)) {
              setCoords((prev) => ({ y: prev?.y, x: val }))
            }
          }}
          value={coords?.x}
        />
      </div>
      <div>
        y:{" "}
        <input
          onChange={(e) => {
            const val = Number(e.target.value)
            console.log(val)
            if (!isNaN(val)) {
              setCoords((prev) => ({ x: prev?.x, y: val }))
            }
          }}
          value={coords?.y}
        />
      </div>
      
    </div>
  )
}
 */
