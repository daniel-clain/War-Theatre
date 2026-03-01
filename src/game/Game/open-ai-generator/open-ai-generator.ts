import * as dotenv from "dotenv"
import { OpenAI } from "openai"

const env = process.env.NODE_ENV
console.log("env", env)
const path = `.env.${env}`
dotenv.config({ path })
const apiKey = process.env.OPENAI_API_KEY

const openai = new OpenAI({ apiKey })

async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: "Give me three creative names for a fantasy RPG game.",
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    console.log("Response:", response.choices[0]?.message?.content)
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
  }
}

async function generateGame() {
  console.log("doink")
}

export const openAiGenerator = {
  testOpenAI,
  generateGame,
}
