import React, { useState } from 'react'
import ArrayComp from './ArrayComp'



import '../index.css'

import {
    ColumnDef,
    Visibility,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'


export type Person = {
    id: number | string,
    name: string

}

const array = [
    { id: 1, name: 'wan' },
    { id: 2, name: 'tu' },
    { id: 3, name: 'tree' },
    { id: 4, name: 'por' },
]





const defaultColumns: ColumnDef<Person>[] = [
    {
        header: 'PERSON',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'id',
                id: 'id',
                cell: info => info.getValue(),
                header: () => <span>ID</span>,
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.name,
                id: 'name',
                cell: info => info.getValue(),
                header: () => <span>NAME</span>,
                footer: props => props.column.id,
            },
        ],
    },

]

import { useDrag, useDrop } from "react-dnd";
import DraggableItem from './DraggableItem'
import { shallow } from 'zustand/shallow'
import { id_ID } from '@faker-js/faker'


const Array1 = () => {

    const [array1, setArray1] = useState(array)

    const [data, setData] = React.useState(() => [...array])
    const [columns] = React.useState<typeof defaultColumns>(() => [
        ...defaultColumns,
    ])

    const [columnVisibility, setColumnVisibility] = React.useState({})


    const rerender = React.useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
        },
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })
    // console.log(table)



    const [itemId, setItemId] = useState<any>()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "text",
        item:
            table.getAllLeafColumns().map(column => column.getIsVisible()),
        // item: { id: table.getAllLeafColumns().map(column => column.id) },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "text",
        drop: (item: Person) => {
            // console.log(item.id)
            // table.getToggleAllColumnsVisibilityHandler()
            // console.log(table.getAllLeafColumns().map(column => column.getToggleVisibilityHandler()))
            // console.log(table.getColumn(item.id.toString())?.toggleVisibility())
       table.getColumn(item.id.toString())?.toggleVisibility(true)
            
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver({ shallow: true }),
        }),

    }));

    // console.log(columnVisibility)

    return (
        <div className="p-2">
            {JSON.stringify(array1)}
            <div className="inline-block border border-black shadow rounded">
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
                            <div className="px-1" style={{ width: "150px", border: isDragging ? "5px solid pink" : "1px solid black" }}
                            >
                                <label>
                                    <input
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}

                                    />{' '}
                      
                                    <DraggableItem key={column.id} id={column.id} name={column.id} />

                                </label>
                            </div>
                            {JSON.stringify(column.id)}
                        </div>
                    )
                })}
            </div>
            <div className="h-4" />
            <table>
                <thead  >
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan} ref={drag}  >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
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
                {/* <tfoot>
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
                </tfoot> */}
            </table>
            <div className="Board" style={{ display: 'inline-block', border: "5px solid pink" }} ref={drop} >

            </div>
            <div className="h-4" />
            <button onClick={() => rerender()} className="border p-2">
                Rerender
            </button>
            <div className="h-4" />
            <pre>{JSON.stringify(table.getState().columnVisibility, null, 2)}</pre>
        </div>
    )
}

export default Array1