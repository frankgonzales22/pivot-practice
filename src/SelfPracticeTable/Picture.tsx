import React from "react";
import { useDrag } from "react-dnd";
import { item } from "./DnDFirst";

function Picture({ id , url } : item) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id }, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
        
      
    }),
  }));
  return (
    <>
    <img
      ref={drag}
      src={url}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}
    />
    <div>{id}</div>
    </>
  );
}

export default Picture;