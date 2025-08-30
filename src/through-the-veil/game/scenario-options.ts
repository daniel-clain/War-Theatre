const gameEndingPlans = {
  1: deathPulsePlan,
  2: {
    name: "curse mark",
    effect: "at the alignment, everyone with a mark will die",
    modifiers:
      "whever constrols the shepherd stick controls the cursed when they thransform",
  },
  3: {
    name: "summon demon",
    effect: "large agressive demon spares cultists and murders the marks",
    requirements: [
      "summoning circle",
      "3 vigin girl sacrifice",
      "portal skill 3",
      "350 mana",
      "summoning spell book",
    ],
    counter: ["can be defeated by angel summon", "good pulse"],
  },
}

const planetaryPulseMechanic = {
  name: "planetary pulse",
  requirements: { 1: { name: "alignment time" } },
  isActive: "within 10 days of alignment date",
  trigger: "time is midday",
  effect:
    "pulse give an amplified wave of the energy of all sacred sites to all people in a radius of the pulse",
  modifiers: [
    "pulse will sent what every energy is set by the runestones",
    "a ritual will empower the energy",
    "medalions will protect an individual",
    "charged energy stones will protect a region",
  ],
}

const demon = {
  features: [
    "resistant skin",
    "large size",
    "large strength",
    "huge sword",
    "freeze on eye contact",
    "stomp or howl slows and scrares everyone in the area",
  ],
}

const summonDemonSpell = {
  effect: spanCreature(demon),
  requirements: [
    "complete the ritual",
    "have the 3 virgin sacrifices",
    "must have generated over 350 dark energy",
    "must have completed contract with demon",
  ],
}

const chainLighteningSpell = {}

const deathPulsePlan = {
  description:
    "do a dark ritual before the main planery pulse to kill every non-cult member ",
  requiredState: [
    "ritual has been at its peak within 10 mins before the pulse",
    "the majority of rune stones are evil energy",
  ],
}

const spellCultistRitual = {
  description:
    "at peak ritual, create high potency and quantity dark energy to use toward a chosen goal",
  requires: "cult leader to maintain the ritual",
  modifiers:
    "the more cultists the more dark energy, key requirements: (at least 1 leader and 5 cultists, 1 virgin sacrifice, a ritual site, pentagram, skull with liquid evil energy, circle of death lotus, dark crystal medalions, empowered by inhaling death lotus polen steam",
}

const summonDemonPlan = {
  desciption: "use the spell book to do a cultist ritual to summon a demon",
  castSpell: summonDemonSpell,
}

const curseMarkMechanic = {
  description:
    "anyone with the curse mark will have nightmares each night where if they give into the nightmare they will become goat men irl until they wake up. will happen every night. anyone can get the curse make by seeing the curse mark symbol when it has been shown to them with dark energy",
}

const theShepherdsFlockSpell = {
  description:
    "at peak ritual, anyone in curse mode will stay in curse mode and be free of struggle and obedient to the caster",
}

const curseMarkPlan = {
  description: "do a cult ritual to gain control over all the curse marked",
  requirement: [
    "as many people cursed as you can before the ritual",
    "need the sheepherd staff",
    "build altars that have a charged curse mark",
  ],
}

const removeCurseSpell = {
  description: "remove curse from target",
}

const summonAngelSpell = {
  description:
    "summon an angel who can restrain and banish a demon, mass cleanse a curse, resurect the dead",
  requires: [
    "sheepherds staff",
    "sacred site",
    "priest doing ritual",
    "5 religious subjects doing ritual",
    "3 artifacts for that angel",
  ],
}

const priestCharacter = {
  name: "charles",
  spells: [removeCurseSpell, summonAngelSpell],
}

const heroCharacter = {
  name: "darian",
  description: "perseverance, fighting skill, strength, courage",
}

const cultistCharacter = {
  name: "ferdinant",
  description:
    "back story against priest and town leader for being belittled, wants them to suffer",
  experiences: [
    "resentment to being mocked by town guard taht the cult beliefs are made up and not real",
    "resentful of priest blocking thier ambition because it is imoral",
  ],
  traits: ["charismatic"],
  knowledge: [
    "knows lore of cult ritual and dark energy",
    "making cursed altars",
    "towns legal system",
  ],
  skills: ["cult rituals", "politics", "making cursed altars"],
  items: ["cult book"],
}

const warlockTowerBuilding = {
  description:
    "tower on a mountain in an impassible mountain range, only access is through a cave, cave attachest to another cave where which has 2 tunnels, one leads to another cave that connects to a dungeon and library, the other tunnel goes through dangerous cave to a distant land. the tower used to be a secret wizard secret location but was claimed by a warlock who has a spellbook",
  items: ["warlock spellbook", "wizard journal"],
}

/* any bady can be the main, each game depends on who is more evil, and what opportunity they have */

const world = {
  gameEndingPlan: validateGameEndingPlan(gameEndingPlans),
}

function validateGameEndingPlan() {
  /* 
    when conditions are met, does it have the potential to kill enemy quickly
  */
}

/*
  remember
  ============
  - each needs 
    ~ a way that it drops clues
    ~ a reason to do it secretly
    ~ a reason to do it with careful timing as a plan
    ~ a way that it can be countered
    ~ a way that it can protected or boosted
  - cross over in sub mechanics used
  - mechanics that when combined with others, can end the game
*/
