import { SimpleGrid, Box } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'



import {
    Column,
    ColumnDef,
    ColumnOrderState,
    flexRender,
    getCoreRowModel,
    Header,
    orderColumns,
    Table,
    useReactTable,
} from '@tanstack/react-table'
import { dataOrder, Person } from '../ReactColumnOrder/dataOrder'

import { DndProvider, useDrag, useDrop } from 'react-dnd'

import DraggingItem from './DragLikePivotComponents/DraggingItem'
import DraggedItem from './DragLikePivotComponents/DraggedItem'

const defaultColumns: ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName',
        id: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        footer: props => props.column.id,
    },

    {
        accessorKey: 'visits',
        id: 'visits',
        header: 'Visits',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'progress',
        id: 'progress',
        header: 'Profile Progress',
        footer: props => props.column.id,
    },
]

const reorderColumn = (
    draggedColumnId: string,
    targetColumnId: string,
    columnOrder: string[]
): ColumnOrderState => {
    columnOrder.splice(
        columnOrder.indexOf(targetColumnId),
        0,
        columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
    )
    return [...columnOrder]
}

const DraggableColumnHeader: FC<{
    header: Header<Person, unknown>
    table: Table<Person>
}> = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header



    return (
        <th

            colSpan={header.colSpan}

        >
            <div

            >
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}

            </div>
        </th>
    )
}

const DragLikePivot = () => {
    const [orderArray, setOrderArray] = React.useState<any[]>([])
    const [draggedItem, setDraggedItem] = React.useState<any[]>([])
    const [currDraggedItem, setcurrDraggedItem] = React.useState<any[]>([])
    const [currentItem, setcurrentItem] = React.useState('')
    // const orderArray = [] as any[]
    const [data, setData] = React.useState(() => dataOrder(20))
    const [columns] = React.useState(() => [...defaultColumns])

    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
        columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
    )

    const regenerateData = () => setData(() => dataOrder(20))

    const resetOrder = () =>
        setColumnOrder(columns.map(column => column.id as string))

    const [columnVisibility, setColumnVisibility] = React.useState({}) // visibility
    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,  //visibility
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    const [{ isDragging }, drag] = useDrag(() => ({  //visibility
        type: "column",
        item:
            table.getAllLeafColumns().map(column => column.getIsVisible()),
        // item: { id: table.getAllLeafColumns().map(column => column.id) },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "column",
        drop: (item: any) => {

            setOrderArray((orderArray) => ([...orderArray, item.id]))
            setDraggedItem(prev => [...prev, item.id])

            setcurrentItem(item.id),
                table.getColumn(item.id.toString()!)?.toggleVisibility()

        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),


    }), [orderArray]);


    useEffect(() => {

        // DON'T DELETE
        // columnOrder.includes(currentItem)
        // ? (console.log('yessy'), 
        // orderArray.splice(orderArray.indexOf(currentItem), 1), setColumnOrder(orderArray),
        // draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem),
        // table.getColumn(currentItem.toString()!)?.toggleVisibility(true)

        // )
        // : (console.log('nowy'), setColumnOrder(orderArray))

        columnOrder.includes(currentItem)
            ? (console.log('yessy'),
                orderArray.splice(orderArray.indexOf(currentItem), 1), setColumnOrder(orderArray),
                draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
            )
            : (console.log('nowy'), setColumnOrder(orderArray))




    }, [orderArray])
    useEffect(() => {

        table.toggleAllColumnsVisible(false)

    }, [])
    // console.log(table.getVisibleLeafColumns())
    // console.log(table.getVisibleLeafColumns())
    const isCurVisibile = currentItem ? table.getColumn(currentItem)?.getIsVisible() : ''
    console.log(isCurVisibile)
    // console.log(columnVisibility)
    console.log(table.getIsSomeColumnsVisible())

    if (draggedItem) {
        draggedItem.map(i => (
            table.getColumn(i)?.getIsVisible() ? 
           null
            : (draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem))
        ))
    }

    // console.log(table.getAllColumns().map((i) =>
    // table.getColumn(i.id)?.getIsVisible() ? setDraggedItem(prev => [...prev, i]) : (draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem))
    // ))
    return (

        <>
            <div className="p-2">
                {/* {JSON.stringify(orderArray)} */}
                <div className="h-4" />
                {/* <div className="Board" style={{ display: 'inline-block', border: "5px solid pink" }} ref={drop}>

                </div> */}
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => regenerateData()} className="border p-1">
                        Regenerate
                    </button>
                    <button onClick={() => resetOrder()} className="border p-1">
                        Reset Order
                    </button>
                </div>
                <div className="h-4" />
                <div className="inline-block border border-black shadow rounded">

                </div>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => (
                                    <DraggableColumnHeader
                                        key={header.id}
                                        header={header}
                                        table={table}
                                    />
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
            </div>
            <div style={{ border: '1px solid black', height: '100%', width: '350px', position: 'fixed', right: 0, bottom: 0 }} >
                <div className="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: table.getIsAllColumnsVisible(),
                                onChange: table.getToggleAllColumnsVisibilityHandler(),
                            }}
                        />{' '}
                        Toggle All
                    </label>
                </div>
                {table.getAllLeafColumns().map(column => {
                    return (
                        <div key={column.id} >
                            <div className="px-1" style={{ margin: '5px', width: "150px", border: isDragging ? "1px solid pink" : "1px solid black" }}
                            >
                                <label style={{ display: 'inline-flex', fontSize: '14px', cursor: 'pointer' }}>
                                    <input
                                        style={{ margin: '5px' }}
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />
                                    <DraggingItem key={column.id} id={column.id} name={column.id} />
                                </label>
                            </div>
                            {/* {JSON.stringify(column.id)} */}
                        </div>
                    )
                })}
                <div style={{ width: '100%', position: 'absolute', bottom: 0 }}>
                    <SimpleGrid columns={2} spacingX='40px' spacingY='20px' >
                        <Box border="1px solid black" bg='' height='220px'>FILTER</Box>
                        <Box border="1px solid black" bg='' height='220px'>COLUMN</Box>
                        <Box border={isOver ? "5px solid black" : "1px solid black"} bg='' height='220px' ref={drop} fontSize={'12px'} >
                            ROW
                            <DraggedItem item={draggedItem} />
                        </Box>
                        <Box border="1px solid black" bg='' height='220px'>VALUES</Box>
                    </SimpleGrid>
                </div>

            </div>
        </>
    )
}

export default DragLikePivot