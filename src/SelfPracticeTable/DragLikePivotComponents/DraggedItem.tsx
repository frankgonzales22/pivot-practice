import React from 'react'

interface DraggedItemProps {
    item : string[]
}

const DraggedItem = ({ item } : DraggedItemProps) => {
    return (
        <>
            {item.map((item, index) =>
            <div key={index} style={{marginTop : '2px', paddingLeft:'4px', border : '1px solid black'}}>
             
            
               {item}
               </div>
            )}
        </>
    )
}

export default DraggedItem