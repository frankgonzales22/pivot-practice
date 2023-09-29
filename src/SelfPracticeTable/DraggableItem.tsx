
import { useDrag } from "react-dnd";


function DraggableItem({ id  } : any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "column",
    item: { id: id }, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <>
    {/* <img
      ref={drag}
      src={name}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    /> */}
    <div  style={{ border: isDragging ? "5px solid pink" : "0px" }}  ref={drag}>{id}</div>
    </>
  );
}

export default DraggableItem;