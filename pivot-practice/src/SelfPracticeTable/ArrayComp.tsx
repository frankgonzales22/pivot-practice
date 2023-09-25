import React, { useState } from 'react'

interface array {
    id : number,
    name : string
}

interface Props {
    item : array[],
    removeThis : (id : number) => void
}

const ArrayComp = ({item, removeThis} : Props) => {



    return (
        <>

            {item.map(item =>
                <div key={item.id}>
                    <div>{item.name}</div>
                    <button onClick={() => removeThis(item.id)}>Remove this</button>
                </div >
            )}
        </>
    )
}

export default ArrayComp