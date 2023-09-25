import React from "react";
import { useDrag } from "react-dnd";
import { item } from "./DnDFirst";
import { Person as Person1 } from "./Array1VIs";
import { Person } from "../ReactColumnOrder/dataOrder";

function DraggableItem({ id , name } : any) {
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