import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DnDFirst from "./DnDFirst"







const PracticeTable1 = () => {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
        <DnDFirst />
    </DndProvider>
    </>
  )
}

export default PracticeTable1