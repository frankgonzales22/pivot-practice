
import { useDrag } from "react-dnd";


function DraggingItem({ id, name }: any) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "row",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <>
            <div
             style={{ fontWeight: isDragging ? "bold" : "normal", fontSize: '15px' }} 
             ref={drag}
             >{id}</div>
        </>
    );
}

export default DraggingItem;