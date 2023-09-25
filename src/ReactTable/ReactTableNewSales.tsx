import React, { useReducer, useMemo, useState, useEffect } from 'react'


import {
    GroupingState,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
    getCoreRowModel,
    getGroupedRowModel,
    getExpandedRowModel,
    ColumnDef,
    flexRender,
    getSortedRowModel,
    SortingState,
    

} from '@tanstack/react-table'
import newSalesData, { NewSales } from './newSales'
import { group, info } from 'console'
import reportBuilderStore from '../Layout/reportBuilderStore'

const ReactTableNewSales = () => {


    const [grouping, setGrouping] = useState<GroupingState>(['regioncode','territorycode'])

    const [sorting, setSorting] = React.useState<SortingState>([
        { id: "territorycode", desc: false },
        { id: "regioncode", desc: false },

    ])


    const [data, setData] = useState(newSalesData)

    const refreshData = () => setData(newSalesData)

    const rerender = useReducer(() => ({}), {})[1]

    const columns = useMemo<ColumnDef<NewSales>[]>(
        () => [
            {

                header: 'CODE',
                columns: [
                    {
                        accessorFn: row => row.regioncode,
                        id: 'regioncode',
                        header: () => <span>REGION CODE</span>,
                        // cell: info => info.getValue(), 
                        // cell: (e) => {
                        //     e.getValue(),
                        //     console.log(e.getValue())
                        // }
                    },
                    {
                        accessorKey: 'territorycode',
                        header: 'TERRITORY CODE',
                        cell: (e) => {
                            e.getValue();
                            // console.log(e.getValue());
                            return e.getValue()
                        },
                        /**
                         * override the value used for row grouping
                         * (otherwise, defaults to the value derived from accessorKey / accessorFn)
                         */
                        getGroupingValue: (row) => `${row.territorycode}`,
                        // getGroupingValue: (row) => `${row.territorycode} ${row.territorycode}`,

                    },
              
                ],
            },
            {

                header: 'TRX MONTH',
                columns: [
                    {
                        accessorKey: 'nsCollection',
                        header: () => 'NS COLLECTION',
                        aggregatedCell: ({ getValue }) =>
                            Math.round(getValue<number>() * 100) / 100,
                        aggregationFn: 'sum',
                    },
                    {

                        header: 'More Info',
                        columns: [
                            {
                                accessorKey: 'nsRegular',
                                header: () => <span>NSREGULAR</span>,
                                aggregationFn: 'sum',
                                // aggregatedCell: ({getValue}) => getValue().toLocaleString(),
                                // aggregatedCell: ({ getValue }) =>
                                //     Math.round(getValue<number>() * 100) / 100 + '%',
                            },
                            {
                                accessorKey: 'nsTotal',
                                header: 'NSTOTAL',
                                aggregationFn: 'sum',
                            },
                            {
                                accessorKey: 'qouta',
                                header: 'QOUTA',
                                aggregationFn: 'sum',
                            },
                            {
                                accessorKey: 'trxMonth',
                                header: 'TRX MONTH',
                                aggregationFn: 'unique',
                            },
                        ],
                    },
                ],
            },
        ],
        []
    )


    const table = useReactTable({
        data,
        columns,
        state: {
            grouping,
            sorting,
            

        },

        
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGroupingChange: setGrouping,
        getExpandedRowModel: getExpandedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        // debugTable: true,
    })

  // const cellItems = rowItems.map(i => (i._valuesCache))
    // const [item, setItem] = useState<any[]>([])
    // const rowItem = rowItems.map(i => i.id)

    // useEffect(() => {
    //     setItem([
    //         groupValue,
    //         // rowItem,
    //         // cellItems

    //     ])
    // }, [rowItems])
    const rowItems = table.getRowModel().rows
    
    const groupValue = rowItems.map(i => (Object.assign(i._valuesCache, i._groupingValuesCache)))
  

    console.log(rowItems)

    const { dynamicData, setDynamicData } = reportBuilderStore()
    useEffect(() => {
        setDynamicData(
            groupValue,
        )
    }, [rowItems])

    return (

        <div className="p-2">
            {/* {JSON.stringify(dynamicData)} */}
            <div className="h-2" />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder ? null : (
                                            <div>
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
                                                    {/* {console.log(cell.getValue())!} */}
                                                    {/* {setItem([...item, cell.row._groupingValuesCache])!} */}
                                                    {/* { setItem([...item, cell.getValue()])!} */}
                                                    {/* {() => console.log(cell.getValue())} */}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
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

        </div>
    )


}

export default ReactTableNewSales