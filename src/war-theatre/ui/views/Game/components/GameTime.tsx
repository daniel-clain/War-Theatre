import { useEffect, useRef, useState } from "react"

type Props = { time: number }
export function GameTime({ time: gameTime }: Props) {
  const [time, setTime] = useState(gameTime)
  const intervalRef = useRef<NodeJS.Timeout>()

  /* 
  todo: the tear down is running because each time world.time changes, the use context rerenders the whole component, 
  */

  useEffect(() => {
    clearInterval(intervalRef.current)
    console.log("t change", gameTime)
    if (gameTime !== undefined) {
      setTime(gameTime)
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      console.log("teardown")
      clearInterval(intervalRef.current)
    }
  }, [gameTime])
  return <div>{time}</div>
}
