import { useState } from "react";
import { useDrop } from "react-dnd";
import Picture from "./Picture";

import img1 from '../images/1.png'
import img2 from '../images/2.png'
import img3 from '../images/3.png'

const PictureList = [
    {
        id: 1,
        url:
            img1,
    },
    {
        id: 2,
        url:
            img2,
    },
    {
        id: 3,
        url:
            img3,
    },
];

export interface item {

    id: number;
    url: string
    remove?: (id?: number) => void

}

const DnDFirst = () => {
    const [data, setData] = useState<item[]>(PictureList)
    const [board, setBoard] = useState<item[]>([]);

    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item: item) => {
            removeImageFromdata(item.id),
                addImageToBoard(item.id),
                console.log(item.id)
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id: number) => {
        const pictureList = data.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };

    const removeImageFromdata = (id: number) => {
        setData(data => data.filter((picture) => picture.id !== id));
    }

    return (
        <>
            {/* {JSON.stringify(board)} */}
            {/* {JSON.stringify(data)} */}
            <div className="Pictures">
                {data.map((picture) => {
                    return <Picture url={picture.url} id={picture.id} key={picture.id} />;
                })}
            </div>
            <div>
                <div className="Board" ref={drop} style={{ display: 'inline-block' }}>
                    {board.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} key={picture.id} />;
                    })}
                </div>
                <div className="Board" style={{ display: 'inline-block' }}>
                    {board.map((picture) => {
                        return <Picture url={picture.url} id={picture.id} key={picture.id} />;
                    })}
                </div>

            </div>
        </>
    )
}



export default DnDFirst