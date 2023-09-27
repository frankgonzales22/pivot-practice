import { useState } from 'react'
// import './App.css'
import PivotPractice from './PIvotPractice.tsx/PivotPractice'
import DynamicArray from './PIvotPractice.tsx/DynamicArray'
import ReacTable from './ReactTable/ReacTable'
import ReactTableNewSales from './ReactTable/ReactTableNewSales'
import SampleRoute from './Layout/SampleRoute'
import MainColumn from './ReactColumn/MainColumn'
import MainOrder from './ReactColumnOrder/MainOrder'
import PracticeTable1 from './SelfPracticeTable/PracticeTable1'
import Array1 from './SelfPracticeTable/Array1VIs'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DragLikePivot from './SelfPracticeTable/DragLikePivot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <PivotPractice/> */}
      {/* <DynamicArray /> */}
      {/* <ReacTable /> */}
      {/* <ReactTableNewSales /> */}
      <SampleRoute />
      {/* <MainColumn/> */}
      {/* <MainOrder /> */}
      {/* <DndProvider backend={HTML5Backend}>
        <PracticeTable1 />
        <MainOrder />
        <Array1 />
      </DndProvider> */}
      {/* <DndProvider backend={HTML5Backend}>
        <DragLikePivot />
      </DndProvider> */}
    </>
  )
}

export default App
