import { handleSocketMessages } from "../../backend/Host/socket-events"
import { PlayerOptions } from "../../backend/MainGame/player-options"
export type ServerFunctions = ReturnType<typeof handleSocketMessages>

export type ServerFunctionNames = keyof ServerFunctions
export type PlayerOptionNames = keyof PlayerOptions

export type GetServerFunctionArgs<Name extends ServerFunctionNames> =
  Parameters<ServerFunctions[Name]>[0]

export type GetActionFunctionArgs<Name extends PlayerOptionNames> = Parameters<
  PlayerOptions[Name]["run"]
>

export type MessagesToServer<
  Name extends ServerFunctionNames | PlayerOptionNames
> = {
  name: Name
  args?: Name extends ServerFunctionNames
    ? GetServerFunctionArgs<Name>
    : Name extends PlayerOptionNames
    ? GetActionFunctionArgs<Name>
    : undefined
}
const startGameMessage: MessagesToServer<"startGame"> = {
  name: "startGame",
  args: undefined,
}

const setInForNextGameMessage: MessagesToServer<"setInForNextGame"> = {
  name: "setInForNextGame",
  args: { isIn: true },
}

const message: MessagesToServer<ServerFunctionNames> = {
  name: "joinGameLobby",
  args: undefined,
}
