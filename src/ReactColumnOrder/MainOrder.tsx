
import { DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ColumnOrder from './ColumnOrder'

const MainOrder = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <ColumnOrder />
        </DndProvider>
    )
}

export default MainOrder