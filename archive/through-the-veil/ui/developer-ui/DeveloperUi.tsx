import { CompositionModuleManager } from "./components/CompositionModuleManager"
import { EntityTypeManager } from "./components/EntityTypeManager"

export function DeveloperUi() {
  console.log("DeveloperUi")
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <EntityTypeManager />
        <CompositionModuleManager />
      </div>
    </>
  )
}
