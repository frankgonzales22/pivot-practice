import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';

interface DropTargetProps {
  onDrop: (item: any) => void;
}

const DropTarget: React.FC<DropTargetProps> = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState<any[]>([]);
  const [ord, setOrd] = useState<any[]>([]);
  const [trig, settrig] = useState(false)
  const [currentItem, setCurrentItem] = useState('');

  const [, ref] = useDrop({
    accept: "row",
    drop: (item: any) => {
      setCurrentItem(item.id)
      settrig(!trig)
       setDroppedItems((droppedItems) => ([...droppedItems, item.id]));

    
    },
  });

  useEffect(() => {
    console.log(droppedItems)

    if(ord.includes(currentItem)) {
      console.log('yes')
    }else {
      console.log('yow')
      setOrd((prev) => [...prev, currentItem])
    }
  }, [trig])
  

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        // border: '2px dashed #ccc',
        marginTop: '16px',  

       
      }}
      
    >
      {/* <h3>Dropped Items</h3> */}
      {/* {JSON.stringify(droppedItems)} */}
    
        {/* {droppedItems.map((item, index) => (
          <div  key={index}>{item}</div>
        ))}
         */}
           {droppedItems.map((item, index) =>
            <div key={index} style={{marginTop : '2px', paddingLeft:'4px', border : '1px solid black'}}>
             
            
               {item}
               </div>
            )}
      
    </div>
  );
};

export default DropTarget;
