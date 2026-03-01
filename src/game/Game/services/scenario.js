const { describe } = require("node:test")

const p = {
  description: "channel the ritual and kill all non cultists",
  requirements: [
    {
      description:
        "must chanel the ritual at the right location at the right time for 10 seconds for effect to execute",
      plansToEnable: [
        {
          description: "pray at the ritual site",
          plansToEnable: [
            {
              startToFinishBy: "an hour before the ritual time",
              description: "go to the ritual site",
              plansToEnable: [
                {
                  description: "find out the location of the ritual site",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  mechanics: [{ description: "the runes must be " }],
}
const p = {
  requirements: [
    {
      description: "prevent the ritual from being completed",
      plansToEnable: [
        {
          description: "make sure the ritual is never started",
          plansToEnable: [],
        },
        {
          description: "sabotage the ritual so it fails",
          plansToEnable: ["kill the cultists so they cant do the ritual", ""],
        },
        {
          description: "make everyone immunte to the ritual",
          plansToEnable: [],
        },
      ],
    },
  ],
}
