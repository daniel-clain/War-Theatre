import { CharacterState } from "../../../../backend/MainGame/character"

type Props = {
  characters: CharacterState[]
  selected: string | undefined
  onCharacterSelected: (character: string) => void
}
export function TestCharacterSelect(props: Props) {
  return (
    <select
      onChange={(event) => {
        const char = props.characters.find((c) => c.name == event.target.value)
        if (char) {
          props.onCharacterSelected(char.name)
        }
      }}
    >
      <option selected={true} value={"null"}>
        null
      </option>
      {props.characters.map((c) => (
        <option key={c.name} selected={c.name == props.selected} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
