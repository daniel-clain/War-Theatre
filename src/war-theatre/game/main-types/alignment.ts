import { Rating } from "./archetype"
import { Belief, Value } from "./character"

export type AlignmentRating = Rating | "-5" | "-4" | "-3" | "-2" | "-1"

export type AlignmentName =
  | "Heroic"
  | "Good"
  | "Decent"
  | "Shitty"
  | "Bad"
  | "Evil"

interface Alignment_I {
  rating: AlignmentRating
  name: AlignmentName
  beliefs: Belief[]
  values: Value[]
}
abstract class Alignment_A {}

export type Alignment<A extends AlignmentName = "Decent"> = A extends "Heroic"
  ? Heroic
  : A extends "Good"
  ? Good
  : A extends "Decent"
  ? Decent
  : A extends "Shitty"
  ? Shitty
  : A extends "Bad"
  ? Bad
  : Evil

const heroicBeliefs: Belief<"5">[] = [
  "I will always do what is right, no matter the cost.",
  "The strong should protect the weak.",
  "Sacrificing for others is the highest virtue.",
  "Justice must be upheld at all costs.",
  "I will never stand by while evil is allowed to exist.",
].map((details) => ({ details, alignment: "Heroic" }))

const heroicValues: Value<"Heroic">[] = [
  "Self-sacrifice",
  "justice",
  "honor",
  "compassion",
  "unyielding courage",
].map((name) => ({ name, alignment: "Heroic" }))

const goodBeliefs: Belief<"3">[] = [
  "People should be treated with fairness and kindness.",
  "Everyone deserves a chance to be better.",
  "Protecting others is important, but I also need to look after myself.",
  "Violence should be avoided, but sometimes it's necessary.",
  "Justice matters, but mercy also has a place.",
].map((details) => ({ details, alignment: "Good" }))

const goodValues: Value<"Good">[] = [
  "Fairness",
  "kindness",
  "honesty",
  "courage",
  "responsibility",
].map((name) => ({ name, alignment: "Good" }))

const decentBeliefs: Belief<"1">[] = [
  "I should be good to people, but I won’t ruin my life for others.",
  "If I don’t look out for myself, no one else will.",
  "Laws and rules are generally right, but I’ll break them if I need to.",
  "I help people when I can, but not at great cost to myself.",
  "Some people deserve second chances, but others don’t.",
].map((details) => ({ details, alignment: "Decent" }))

const decentValues: Value<"Decent">[] = [
  "Self-interest",
  "basic decency",
  "selective kindness",
  "practicality",
].map((name) => ({ name, alignment: "Decent" }))

const shittyBeliefs: Belief<"-1">[] = [
  "If I don’t take what I can get, someone else will.",
  "People are only nice when they want something.",
  "Loyalty is for suckers. I’ll stick around as long as it benefits me.",
  "Everyone lies, cheats, and steals. I just admit it.",
  "I’d rather survive than be noble.",
].map((details) => ({ details, alignment: "Shitty" }))

const shittyValues: Value<"Shitty">[] = [
  "Greed",
  "self-preservation",
  "self-interest above all",
  "short-term thinking",
].map((name) => ({ name, alignment: "Shitty" }))

const badBeliefs: Belief<"-3">[] = [
  "The strong take what they want. The weak are meant to suffer.",
  "Laws and morals are for fools who want to be controlled.",
  "People exist to be used.",
  "If I want something, I’ll take it, and if you get in my way, that’s your problem.",
  "Killing isn’t a big deal if it gets me what I need.",
].map((details) => ({ details, alignment: "Bad" }))

const badValues: Value<"Bad">[] = [
  "Power",
  "control",
  "dominance",
  "self-interest with no regard for others",
].map((name) => ({ name, alignment: "Bad" }))

const evilBeliefs: Belief<"-5">[] = [
  "People are playthings, and suffering is entertainment.",
  "The world belongs to those ruthless enough to take it.",
  "Loyalty is for fools. The only thing that matters is power.",
  "If you don’t fear me, you’ll regret it.",
  "I will burn the world if it means I get what I want.",
].map((details) => ({ details, alignment: "Evil" }))

const evilValues: Value<"Evil">[] = [
  "Cruelty",
  "domination",
  "destruction",
  "complete lack of empathy",
  "pleasure in suffering",
].map((name) => ({ name, alignment: "Evil" }))

export class Heroic extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "5"
  name: AlignmentName = "Heroic"

  beliefs: Belief[] = heroicBeliefs
  values: Value[] = heroicValues
}

export class Good extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "3"
  name: AlignmentName = "Good"

  beliefs: Belief[] = goodBeliefs
  values: Value[] = goodValues
}

export class Decent extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "1"
  name: AlignmentName = "Decent"
  beliefs: Belief[] = decentBeliefs
  values: Value[] = decentValues
}

export class Shitty extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "-1"
  name: AlignmentName = "Shitty"
  beliefs: Belief[] = shittyBeliefs
  values: Value[] = shittyValues
}

export class Bad extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "-3"
  name: AlignmentName = "Bad"
  beliefs: Belief[] = badBeliefs
  values: Value[] = badValues
}

export class Evil extends Alignment_A implements Alignment_I {
  rating: AlignmentRating = "-5"
  name: AlignmentName = "Evil"
  beliefs: Belief[] = evilBeliefs
  values: Value[] = evilValues
}

export const alignments: Record<AlignmentName, Alignment> = {
  Heroic: new Heroic(),
  Good: new Good(),
  Decent: new Decent(),
  Shitty: new Shitty(),
  Bad: new Bad(),
  Evil: new Evil(),
}

export const alignmentTraitNames = [
  "Empathy",
  "Self-Interest",
  "Discipline",
  "Justice",
  "Hopefulness",
  "Loyalty",
  "Mercy",
  "Honesty",
  "Altruism",
  "Courage",
  "Humility",
  "Forgiveness",
  "Freedom",
] as const

export type AlignmentTraitSpectrumNames = (typeof alignmentTraitNames)[number]

// Defines beliefs associated with different ratings for each trait
export const traitAlignmentRatingBeliefs: Record<
  AlignmentTraitSpectrumNames,
  Partial<Record<AlignmentRating, string>>
> = {
  Empathy: {
    "5": "All lives are valuable and deserve kindness.",
    "2": "Compassion is important, but so are boundaries.",
    "0": "Empathy has its place, but one must be pragmatic.",
    "-2": "Caring too much makes you weak.",
    "-5": "Other people are tools, not lives worth saving.",
  },
  "Self-Interest": {
    "5": "My needs come first, regardless of others.",
    "2": "It's okay to prioritize myself sometimes.",
    "0": "A balance between self-interest and cooperation is best.",
    "-2": "Sacrificing for others is noble.",
    "-5": "Selflessness is the highest virtue.",
  },
  Discipline: {
    "5": "Strict discipline ensures success.",
    "2": "Structure is good, but adaptability matters.",
    "0": "Some rules must be followed, others can be bent.",
    "-2": "Freedom is preferable to rigid order.",
    "-5": "Discipline is a cage that limits true potential.",
  },
  Justice: {
    "5": "Justice must be absolute, no exceptions.",
    "2": "Justice matters, but it must be flexible.",
    "0": "Justice is situational, not absolute.",
    "-2": "Personal interests come before law and order.",
    "-5": "Might makes right; justice is a lie.",
  },
  Hopefulness: {
    "5": "The future is bright, no matter the darkness.",
    "2": "Things will improve, even if slowly.",
    "0": "Hope has limits, and reality must be faced.",
    "-2": "Optimism is foolish; only survival matters.",
    "-5": "All hope is an illusion; only despair is real.",
  },
  Loyalty: {
    "5": "Betrayal is unthinkable; loyalty is everything.",
    "2": "Loyalty is important, but not at all costs.",
    "0": "Loyalty depends on circumstances.",
    "-2": "Loyalty is a weakness that others exploit.",
    "-5": "Everyone is disposable; loyalty is meaningless.",
  },
  Mercy: {
    "5": "Even the worst deserve a chance at redemption.",
    "2": "Mercy is good, but justice must come first.",
    "0": "Some deserve mercy, others do not.",
    "-2": "Mercy lets the wicked thrive.",
    "-5": "No one deserves mercy; only strength matters.",
  },
  Honesty: {
    "5": "Lies are poison; truth is the only path.",
    "2": "Honesty is good, but some truths must be hidden.",
    "0": "Truth and lies both serve a purpose.",
    "-2": "Lies are useful; honesty is naive.",
    "-5": "Only fools tell the truth.",
  },
  Altruism: {
    "5": "Helping others is life’s highest purpose.",
    "2": "Helping is good, but not if it weakens me.",
    "0": "A mix of giving and self-preservation is wise.",
    "-2": "Giving is a liability; only take what you need.",
    "-5": "Only fools give; the strong take.",
  },
  Courage: {
    "5": "Fear is an illusion; bravery is everything.",
    "2": "Courage matters, but reckless risks do not.",
    "0": "Caution and bravery must be balanced.",
    "-2": "Avoiding danger is smart; heroes die first.",
    "-5": "Fear keeps you alive; bravery gets you killed.",
  },
  Humility: {
    "5": "I am no better than anyone else.",
    "2": "Confidence is important, but so is humility.",
    "0": "One must balance humility with self-respect.",
    "-2": "Pride is strength; humility is submission.",
    "-5": "I am superior; humility is for the weak.",
  },
  Forgiveness: {
    "5": "Everyone deserves a second chance.",
    "2": "Forgiveness is valuable, but not always deserved.",
    "0": "Some things can be forgiven; others cannot.",
    "-2": "Forgiveness is foolish; vengeance is justice.",
    "-5": "I never forgive; I never forget.",
  },
  Freedom: {
    "5": "Every person deserves absolute freedom.",
    "2": "Freedom is vital, but some rules must exist.",
    "0": "Freedom and control must be balanced.",
    "-2": "Freedom creates chaos; order is necessary.",
    "-5": "People need to be ruled for their own good.",
  },
}

/*
// Function to derive beliefs based on an alignment trait and rating
 function deriveBelief(trait: AlignmentTrait, rating: number): string {
  if (AlignmentBeliefs[trait] && AlignmentBeliefs[trait][rating]) {
    return AlignmentBeliefs[trait][rating];
  }
  return "No defined belief for this combination.";
} 

// Example usage
console.log(deriveBelief("Honesty", -5)); // "Only fools tell the truth."
console.log(deriveBelief("Courage", 2));  // "Courage matters, but reckless risks do not."
// */
