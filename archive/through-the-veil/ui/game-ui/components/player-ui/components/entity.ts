export type EntityType = {
  id: string
  fileName: string
  name: string
  isAbstraction: boolean
  extendsEntity?: string //entity type id, must be abstract
  composedWith: string[] //composition module ids
  properties: EntityProperty[]
  behaviours: EntityBehaviour[]
}

export type CompositionModule = {
  id: string
  fileName: string
  name: string
  properties: EntityProperty[]
  behaviours: EntityBehaviour[]
}

export interface EntityProperty {
  id: string
  name: string
  type: PropertyType
  referenceEntityId?: string // if type is 'reference', id of entity (eg character property type is reference with entity id is building)
  defaultValue?: any
}

export type EntityBehaviour = {
  id: string
  name: string
}

export const propertyTypes = [
  "string",
  "number",
  "boolean",
  "reference",
] as const

export type PropertyType = (typeof propertyTypes)[number]
