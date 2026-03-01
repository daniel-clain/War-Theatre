import { AlignmentRating, AlignmentTraitSpectrumNames } from "./alignment"
import { Belief, Value } from "./character"

export type TraitSpectrumNames = AlignmentTraitSpectrumNames

type TraitRaiting = {
  [R in AlignmentRating]?: {
    beliefs: Belief[]
    values: Value[]
    actions: string[]
  }
}

export type TraitRequirements = {
  name: AlignmentTraitSpectrumNames
}

type TraitProps = {
  rating: AlignmentRating
  name: string
}

export class TraitBase {
  name: string
  rating: AlignmentRating

  constructor(traitProps: TraitProps) {
    this.rating = traitProps.rating
    this.name = traitProps.name
  }
}

type SkillTrait = TraitBase & {
  raitng: ""
}
type AlignnmentTrait = TraitBase & {
  name: AlignmentTraitSpectrumNames
  rating: AlignmentRating
}

export type Trait = AlignnmentTrait // | SkillTrait | Big5Traits | InateTrait | AttributeTrait
