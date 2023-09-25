import { SimpleGrid, Box } from '@chakra-ui/react'
import React, { FC, useEffect, useMemo, useReducer } from 'react'
import {
    aggregationFns,
    Column,
    ColumnDef,
    ColumnOrderState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getGroupedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    GroupingState,
    Header,
    orderColumns,
    PaginationState,
    SortingState,
    Table,
    useReactTable,

} from '@tanstack/react-table'
import { dataOrder, Person } from '../ReactColumnOrder/dataOrder'

import { useDrag, useDrop } from 'react-dnd'

import DraggingItem from './DragLikePivotComponents/DraggingItem'
import DraggedItem from './DragLikePivotComponents/DraggedItem'
import { Curve } from 'recharts'
import ColumnOrder from '../ReactColumnOrder/ColumnOrder'

// const reorderColumn = (
//     draggedColumnId: string,
//     targetColumnId: string,
//     columnOrder: string[]
// ): ColumnOrderState => {
//     columnOrder.splice(
//         columnOrder.indexOf(targetColumnId),
//         0,
//         columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
//     )
//     return [...columnOrder]
// }

const DraggableColumnHeader: FC<{
    header: Header<Person, unknown>
    table: Table<Person>
}> = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

    return (
        // THIS IS THE HEADER CAPTION
        // <th colSpan={header.colSpan}>
        //     <div>
        //         {header.isPlaceholder
        //             ? null
        //             : flexRender(header.column.columnDef.header, header.getContext())}
        //     </div>
        // </th>
        <th key={header.id} colSpan={header.colSpan}>
            {header.isPlaceholder ? null : (
                <div

                >
                    {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                            {...{
                                onClick: header.column.getToggleGroupingHandler(),
                                style: {
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            {header.column.getIsGrouped()

                                ? `🛑(${header.column.getGroupedIndex()}) `
                                : `🟰 `}
                        </button>
                    ) : null}{' '}

                    {flexRender(
                        header.column.columnDef.header,
                        header.getContext()

                    )}


                </div>
            )}
        </th>
    )
}


const DragLikePivot = () => {
    const [ageAgg, setAgeAgg] = React.useState('min')
    const defaultColumns = useMemo<ColumnDef<Person>[]>(
        () => [
            // {
            //     accessorKey: 'firstName',
            //     id: 'firstName',
            //     header: 'First Name',
            //     cell: info => info.getValue(),
            //     footer: props => props.column.id,
            // },
            // {
            //     accessorFn: row => row.lastName,
            //     id: 'lastName',
            //     cell: info => info.getValue(),
            //     header: () => <span>Last Name</span>,
            //     footer: props => props.column.id,
            // },
            // {
            //     accessorKey: 'age',
            //     id: 'age',
            //     header: 'Age',
            //     footer: props => props.column.id,
            // },

            // {
            //     accessorKey: 'visits',
            //     id: 'visits',
            //     header: 'Visits',
            //     footer: props => props.column.id,
            // },
            // {
            //     // accessorKey: 'status',
            //     accessorFn: row => row.status,

            //     id: 'status',
            //     header: 'Status',
            //     footer: props => props.column.id,
            //     // cell: (e) => {
            //     //     e.getValue();
            //     //     return e.getValue()
            //     // },
            //     getGroupingValue: (row) => `${row.status}`,
            // },
            // {
            //     accessorKey: 'progress',
            //     id: 'progress',
            //     header: 'Profile Progress',
            //     footer: props => props.column.id,
            // }
            {

                header: 'CODE',
                columns: [
                    {
                        accessorFn: row => row.status,
                        id: 'status',
                        header: () => <span>STATUS</span>,
                        // cell: info => info.getValue(), 
                        // cell: (e) => {
                        //     e.getValue(),
                        //     console.log(e.getValue())
                        // }
                    },
                    {
                        accessorKey: 'progress',
                        header: 'PROGRESS',
                        cell: (e) => {
                            e.getValue();
                            // console.log(e.getValue());
                            return e.getValue()
                        },
                        /**
                         * override the value used for row grouping
                         * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                         */
                        getGroupingValue: (row) => `${row.progress}`,
                        // getGroupingValue: (row) => `${row.territorycode} ${row.territorycode}`,

                    },

                ],
            },
            {

                header: 'TRX MONTH',
                columns: [
                    {
                        accessorKey: 'firstName',
                        header: () => 'FIRST NAME',
                        aggregatedCell: ({ getValue }) =>
                            Math.round(getValue<number>() * 100) / 100,
                        aggregationFn: 'count',
                    },
                    {

                        header: 'More Info',
                        columns: [
                            {
                                accessorKey: 'lastName',
                                header: () => <span>LAST NAME</span>,
                                aggregationFn: 'count',
                                // aggregatedCell: ({getValue}) => getValue().toLocaleString(),
                                // aggregatedCell: ({ getValue }) =>
                                //     Math.round(getValue<number>() * 100) / 100 + '%',
                            },
                            {
                                accessorKey: 'visits',
                                header: 'VISITS',
                                aggregationFn: 'sum',
                            },
                            {
                                accessorKey: 'age',
                                header: 'AGE',
                                id: 'age',
                                aggregationFn: 'myCustomAgg'
                            },
                        ],
                    },
                ],
            },

        ], []
    )


    const [orderArray, setOrderArray] = React.useState<any[]>([])
    const [draggedItem, setDraggedItem] = React.useState<any[]>([])
    const [currentItem, setcurrentItem] = React.useState('')
    const [data, setData] = React.useState(() => dataOrder(20))
    const [columns] = React.useState(() => [...defaultColumns])
    const [grouping, setGrouping] = React.useState<GroupingState>([])


    const [sorting, setSorting] = React.useState<SortingState>([


    ])


    //changed the initial state to blank array for grouping
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]
        // columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
    )

    const [columnVisibility, setColumnVisibility] = React.useState({}) // visibility
    const table = useReactTable({
        data,
        columns,
        // aggregationFns : {
        //     myCustomAgg :  () => {

        //             ageAgg
        //     }   
        // },

        state: {
            columnOrder,
            columnVisibility,
            grouping,
            sorting,

        },

        onColumnVisibilityChange: setColumnVisibility,  //visibility
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onGroupingChange: setGrouping,
        getSortedRowModel: getSortedRowModel(),

        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),


        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true,
    })

    const [{ isDragging }, drag] = useDrag(() => ({  //visibility
        type: "column",
        // item:
        //     table.getAllLeafColumns().map(column => column.getIsVisible()),
        // // item: { id: table.getAllLeafColumns().map(column => column.id) },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "column",
        drop: (item: any) => {

            setOrderArray((orderArray) => ([...orderArray, item.id]))
            // setDraggedItem(prev => [...prev, item.id])
            // setDraggedItem([...draggedItem, item.id])


            //toggle visibility
            setcurrentItem(item.id),
                table.getColumn(item.id.toString()!)?.toggleVisibility()

        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),


    }), [orderArray]);



    //MAKING SURE TO ARRANGE THE DRAGGED ITEM IN ORDER

    useEffect(() => {
        columnOrder.includes(currentItem)
            ? (console.log('yessy'),
                orderArray.splice(orderArray.indexOf(currentItem), 1), setColumnOrder(orderArray)
                // ,
                // draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
            )
            : (console.log('nowy'), setColumnOrder(orderArray))


    }, [orderArray])


    // SETTING ALL COLUMNS TO BE HIDDEN
    useEffect(() => {
        table.toggleAllColumnsVisible(false)
        table.setPageSize(Number(50))
    }, [])



    // THIS IS FOR REMOVING EXISTING ITEM ON THE BOX

    // columnVisibility IS ON OBJECT TYPE


    useEffect(() => {

        console.log('visibles')
        if (currentItem) {
            const isVisble = table.getColumn(currentItem)?.getIsVisible()
            console.log(isVisble)
            if (!isVisble) {
                draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
                setcurrentItem('')

            } else {
                if (draggedItem.includes(currentItem)) {
                    console.log(currentItem)
                    draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
                    setcurrentItem('')

                } else {
                    setDraggedItem([...draggedItem, currentItem])
                    setcurrentItem('')

                }
            }

        }


        //FOR PROXY
        // console.log(draggedItem)      
        // setGrouping(draggedItem)


    }, [columnVisibility])

    // console.log(table.getState().columnVisibility)

    // console.log(grouping)

    // console.log(table.getAllColumns())


    // console.log(ageAgg)
    // console.log(table.getAllFlatColumns())
    // console.log(table.getColumn('visits'))
    // console.log(table.getColumn('visits')?.columnDef.aggregationFn)
    const refreshData = () => setData(dataOrder(20))

    const rerender = useReducer(() => ({}), {})[1]

    console.log(table.getState())


    useEffect(() => {



        //FOR PROXY
        // console.log(draggedItem)
        console.log(columnOrder+'asd') 
      if(columnOrder.length > 0) {
        setGrouping([columnOrder[0]])
      }else {
        setGrouping(columnOrder)
      }
    }, [columnOrder])
    // console.log(table.getColumn('age')?.getAggregationFn())
    return (

        <>
            {/* {JSON.stringify(table.getVisibleLeafColumns())} */}
            <div className="p-2">
                <button style={{ border: '1px solid black' }} onClick={() => setAgeAgg('count')}> Set Age aggregation</button>
                <table>
                    {/* <thead>
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

                   
                    </thead> */}
                    <thead>

                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan}>
                                            {header.isPlaceholder ? null : (
                                                <div

                                                >
                                                    {header.column.getCanGroup() ? (
                                                        // If the header can be grouped, let's add a toggle
                                                        <button
                                                            {...{
                                                                onClick: header.column.getToggleGroupingHandler(),
                                                                style: {
                                                                    cursor: 'pointer',
                                                                },
                                                            }}
                                                        >
                                                            {header.column.getIsGrouped()

                                                                ? `🛑(${header.column.getGroupedIndex()}) `
                                                                : `🟰 `}
                                                        </button>
                                                    ) : null}{' '}

                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()

                                                    )}


                                                </div>
                                            )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    {/* <tbody> */}
                    {/* {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))} */}
                    <tbody>
                        {table.
                            getRowModel().
                            rows.map(row => {
                                return (
                                    <tr key={row.id}>
                                        {row.
                                            getVisibleCells().
                                            map(cell => {
                                                return (
                                                    <td
                                                        {...{
                                                            key: cell.id,
                                                            style: {
                                                                background: cell.getIsGrouped()
                                                                    ? '#0aff0082'
                                                                    : cell.getIsAggregated()
                                                                        ? '#ffa50078'
                                                                        : cell.getIsPlaceholder()
                                                                            ? '#ff000042'
                                                                            : 'gray',
                                                            },
                                                        }}
                                                    >
                                                        {cell.getIsGrouped() ? (
                                                            // If it's a grouped cell, add an expander and row count
                                                            <>
                                                                <button
                                                                    {...{
                                                                        onClick: row.getToggleExpandedHandler(),
                                                                        style: {
                                                                            cursor: row.getCanExpand()
                                                                                ? 'pointer'
                                                                                : 'normal',
                                                                        },
                                                                    }}
                                                                >
                                                                    {row.getIsExpanded() ? '👇' : '👉'}{' '}
                                                                    {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext(),
                                                                    )}{' '}
                                                                    ({row.subRows.length})
                                                                </button>
                                                            </>
                                                        ) : cell.getIsAggregated() ? (
                                                            // If the cell is aggregated, use the Aggregated
                                                            // renderer for cell
                                                            flexRender(
                                                                cell.column.columnDef.aggregatedCell ??
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),
                                                            )

                                                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                                                            // Otherwise, just render the regular cell
                                                            flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext(),

                                                            )
                                                        )}

                                                    </td>
                                                )
                                            })}
                                    </tr>
                                )
                            })}
                    </tbody>
                    {/* </tbody> */}
                </table>
                <div className="h-2" />
                <div className="flex items-center gap-2">
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className="border rounded p-1"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}

                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>
                    <span className="flex items-center gap-1">
                        <div>Page</div>
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{' '}

                            {table.getPageCount()}
                        </strong>
                    </span>
                    <span className="flex items-center gap-1">
                        | Go to page:
                        <input
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                table.setPageIndex(page)
                            }}
                            className="border p-1 rounded w-16"
                        />
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div>{table.getRowModel().rows.length} Rows</div>
                <div>
                    <button onClick={() => rerender()}>Force Rerender</button>
                </div>
                <div>
                    <button onClick={() => refreshData()}>Refresh Data</button>
                </div>
                <pre>{JSON.stringify(grouping, null, 2)}</pre>


                {/* <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre> */}
            </div >
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
                                            onChange: column.getToggleVisibilityHandler()
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
                    <SimpleGrid columns={2} spacingX='40px' spacingY='20px' padding={1}>
                        <Box border="1px solid black" bg='' height='190px'>FILTER</Box>
                        <Box border="1px solid black" bg='' height='190px'>COLUMN</Box>
                        <Box border={isOver ? "5px solid black" : "1px solid black"} bg='' height='190px' ref={drop} fontSize={'12px'} >
                            ROW
                            <DraggedItem item={draggedItem} />
                        </Box>
                        <Box border="1px solid black" bg='' height='190px'>VALUES</Box>
                    </SimpleGrid>
                </div>




            </div >
        </>
    )
}

export default DragLikePivot