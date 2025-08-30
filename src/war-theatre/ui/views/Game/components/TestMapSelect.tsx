import { sameCoords } from "../../../../backend/Game/services/utility.service"
import { Coords, TileState } from "../../../../backend/MainGame/tile"
type Props = {
  tiles: TileState[]
  onTileSelected: (tile: TileState) => void
}
export function TestMapSelect(props: Props) {
  return (
    <select
      onChange={(event) => {
        const v = event.target.value
        const coords: Coords = JSON.parse(v)
        const tile = props.tiles.find((l) => sameCoords(l, coords))
        if (tile) {
          props.onTileSelected(tile)
        }
      }}
    >
      <option>select a tile</option>
      {props.tiles.map(({ x, y }) => (
        <option key={"" + x + y} value={JSON.stringify({ x, y })}>
          {x + ", " + y}
        </option>
      ))}
    </select>
  )
}
