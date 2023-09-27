import { SimpleGrid, Box, Table, Thead, Tbody, Tr, Td, Th, Select, Heading, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { TbSum } from "react-icons/tb";
import { MdOutlineFilterList, MdOutlineTableRows, MdOutlineViewColumn } from "react-icons/md";
import {
    ColumnDef,
    ColumnOrderState,
    ColumnSort,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getGroupedRowModel,
    // getPaginationRowModel,
    getSortedRowModel,
    GroupingState,
    SortingState,
    useReactTable,

} from '@tanstack/react-table'
import newSaleData, { NewSale } from '../newSale'


import { useDrag, useDrop } from 'react-dnd'

import DraggingItem from './DragLikePivotComponents/DraggingItem'
import DraggedItem from './DragLikePivotComponents/DraggedItem'
import reportBuilderStore from '../Layout/reportBuilderStore'


import ModalWithButtonList from './ModalWithButtonList';
import DropTarget from './DragLikePivotComponents/DropTarget';
import DraggableItem from './DragLikePivotComponents/DraggableItem';
import DisplayBarCharts from '../Layout/DisplayBarChart';
import DisplayBarChart from '../Layout/DisplayBarChart';
import DisplayAreaChart from '../Layout/DisplayAreaChart';



const ReactTableWithDnd = () => {

    const [sorting, setSorting] = React.useState<SortingState>([
        // { id: "territorycode", desc: false },
        // { id: "regioncode", desc: false },

    ])
    const [aggFunc, setaggFunc] = React.useState('count')

    const defaultColumns = useMemo<ColumnDef<NewSale>[]>(
        () => [
            {
                accessorFn: row => row.regioncode,
                id: 'regioncode',
                header: () => <span>REGION CODE</span>,
                aggregationFn: 'count',

            },
            {

                accessorFn: row => row.territorycode,
                id: 'territorycode',
                header: () => <span>TERRITORY CODE</span>,
                aggregationFn: 'count',


            },
            {
                accessorFn: row => row.motherbranchcode,
                id: 'motherbranchcode',
                header: () => <span>MOTHERBRANCH CODE</span>,
                aggregationFn: 'count',

            },
            {
                accessorKey: 'nsCollection',
                header: () => 'NS COLLECTION',
                aggregatedCell: ({ getValue }) =>
                    Math.round(getValue<number>() * 100) / 100,
                aggregationFn: 'sum',
            },
            {
                accessorKey: 'nsRegular',
                header: () => <span>NS REGULAR</span>,
                aggregationFn:

                    'min',
                //  aggFunc === 'count' ? 'count' : 'min', 
            },
            {
                accessorKey: 'nsTotal',
                header: 'NS TOTAL',
                aggregationFn: 'sum',
            },
            {
                accessorKey: 'qouta',
                header: 'QOUTA',
                id: 'qouta',
                aggregationFn: 'sum',
                // aggFunc === 'count' ? 'count' : 'min', 
            },
            {
                accessorKey: 'empName',
                header: 'EMP NAME',
                aggregationFn: 'count',
            },
            {
                accessorKey: 'nsEstore',
                header: 'NS ESTORE',
                id: 'nsEstore',
                aggregationFn: 'count'
            },

        ], [aggFunc]
    )


    const [orderArray, setOrderArray] = React.useState<any[]>([])
    const [draggedItem, setDraggedItem] = React.useState<any[]>([])
    const [rowItem, setRowItem] = React.useState<any[]>([])
    const [currentItem, setcurrentItem] = React.useState('')
    const [triggerState, setTriggerState] = React.useState(false)
    const [data, setData] = React.useState(newSaleData)
    const [columns] = React.useState(() => [...defaultColumns])
    const [grouping, setGrouping] = React.useState<GroupingState>([])



    // console.log(aggFunc)

    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]
        // columns.map(column => column.id as string) //must start out with populated columnOrder so we can splice
    )

    const [columnVisibility, setColumnVisibility] = React.useState({}) // visibility
    const table = useReactTable({
        data,
        columns,

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
        getFilteredRowModel: getFilteredRowModel(),


        // debugTable: true,
        // debugHeaders: true,
        // debugColumns: true,
    })

    // const [{ isDragging }, drag] = useDrag(() => ({  //visibility
    //     type: "column",

    //     collect: (monitor) => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));



    // DROP FOR ROWS
    const [{ isOver }, drop] = useDrop(() => ({

        accept: "row",
        drop: (item: any) => {

            setOrderArray((orderArray) => ([...orderArray, item.id])),
                // setOrderArray(([...orderArray, item.id]))
                setcurrentItem(item.id),
                console.log(item.id),
                table.getColumn(item.id.toString()!)?.toggleVisibility()

        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),

    })
        // , [orderArray]
    );




    //MAKING SURE TO ARRANGE THE DRAGGED ITEM IN ORDER

    useEffect(() => {
        columnOrder.includes(currentItem) ?
            (console.log('yessy'),
                orderArray.splice(orderArray.indexOf(currentItem), 1), setColumnOrder(orderArray),
                table.getIsSomeColumnsVisible() === false ?
                    setTriggerState(!triggerState) :
                    console.log('here')
                // orderArray.splice(orderArray.indexOf(currentItem), 1), setColumnOrder(orderArray)
            ) :
            (console.log('nowy'), setColumnOrder(orderArray))

    }, [orderArray])




    // SETTING ALL COLUMNS TO BE HIDDEN
    useEffect(() => {
        table.toggleAllColumnsVisible(false)

    }, [])

    // reset state
    useEffect(() => {
        table.reset()
        console.log('reset')

        setOrderArray([])
        setColumnOrder([])


    }, [triggerState])

    // IF CURRENT ITEM TRIGGER ADD ITEM TO ORDER ARRAY
    // useEffect(() => {
    //     console.log(orderArray)
    //     table.getColumn(currentItem)?.getIsVisible() === false ? ( orderArray.splice(orderArray.indexOf(currentItem), 1), setOrderArray(orderArray) ): null
    //     setOrderArray((orderArray) => ([...orderArray, currentItem]))


    // }, [currentItem])


    // THIS IS FOR REMOVING EXISTING ITEM ON THE BOX
    // columnVisibility IS ON OBJECT TYPE


    useEffect(() => {

        if (currentItem) {
            const isVisble = table.getColumn(currentItem)?.getIsVisible()
            if (!isVisble) {
                draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
                rowItem.splice(rowItem.indexOf(currentItem), 1), setRowItem(rowItem)
                setcurrentItem('')

            } else {
                if (draggedItem.includes(currentItem)) {
                    draggedItem.splice(draggedItem.indexOf(currentItem), 1), setDraggedItem(draggedItem)
                    rowItem.splice(rowItem.indexOf(currentItem), 1), setRowItem(rowItem)
                    setcurrentItem('')
                } else {
                    setDraggedItem([...draggedItem, currentItem])
                    setcurrentItem('')
                }
            }
        }

    }, [columnVisibility])







    //Aggregate only the first row
    useEffect(() => {

        //FOR PROXY
        // console.log(draggedItem)
        console.log(orderArray + 'order array')
        console.log(columnOrder + 'order column')
        if (columnOrder.length > 0) {
            // console.log(columnOrder + 'column order')
            // console.log('triggered')

            setGrouping([columnOrder[0]])

        } else {

            setGrouping(columnOrder)

        }

    }, [columnOrder])


    const rowItems = table.getRowModel().rows
    // console.log(rowItems)
    const groupValue = rowItems.map(i => (Object.assign(i._valuesCache, i._groupingValuesCache)))

    console.log(groupValue)


    // console.log(rowItems)
    // console.log(groupValue)
    const [ValuesCache, setValuesCache] = useState([])

    const { dynamicData, setDynamicData } = reportBuilderStore()
    useEffect(() => {
        console.log(ValuesCache)
        setDynamicData(
            groupValue,
        )
        // rowItems?.map(i => 
        
        // // sorting.push(i._valuesCache as any)
        // // setSorting(prev => [...prev, i.groupingValue!])
        // )
    }, [rowItems])


    console.log(sorting)






    // FOR MULTIPLE DROP TARGETS
    // const droppedItems: any[] = [];


    const [droppedItems, setDroppedItems] = useState<any[]>([]);
    const [ord, setOrd] = useState<any[]>([]);
    const [trig, settrig] = useState(false)
    const [cur, setCur] = useState('');


    // DROP FOR VALUES

    const [{ isOver: isHover }, ref] = useDrop({
        accept: "row",
        drop: (item: any) => {
            setCur(item.id),
                settrig(!trig),
                setDroppedItems((droppedItems) => ([...droppedItems, item.id])),
                setOrderArray((orderArray) => ([...orderArray, item.id])),
                table.getColumn(item.id.toString()!)?.toggleVisibility()


        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),


    });

    useEffect(() => {
        // console.log(droppedItems)

        if (ord.includes(currentItem)) {
            console.log('yes')
        } else {
            console.log('yow')
            setOrd((prev) => [...prev, currentItem])
        }
    }, [trig])


    const [selectedChart, setSelectedChart] = useState<string>('')
    // console.log(table.getRowModel().rows)



    // ADD TEMPLATES

    // Define the type for your template objects
    type Template = {
        templateTitle : string;
        templateId: number;
        chart: string;
        row: string[];
        value: string[];
        templateData : [];
    };

   
        // Define the state for your array of template objects and a setter function
        const [templates, setTemplates] = useState<Template[]>([]);

        // Key to store data in local storage
        const localStorageKey = 'templatesData';

        // Function to update the state and save it to local storage
        const updateTemplates = (newTemplate: Template) => {
            setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
        };

        // Load data from local storage when the component mounts
        useEffect(() => {
            const storedData = localStorage.getItem(localStorageKey);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setTemplates(parsedData);
            }
        }, []);

        // Function to save the updated templates to local storage
        const saveTemplatesToLocalStorage = (templatesToSave: Template[]) => {
            localStorage.setItem(localStorageKey, JSON.stringify(templatesToSave));
        };

        // Function to handle adding a new template
        const handleAddTemplate = () => {
            // Create a new template object based on user input (customize this part)
            // const newTemplate: Template = {
            //     templateId: templates.length, // Use a unique identifier
            //     chart: prompt('Enter chart type') || 'barChart', // Customize input fields as needed
            //     row: prompt('Enter row')?.split(',') || [],
            //     value: prompt('Enter value')?.split(',') || [],
            // };

            const newTemplate: Template = {
                templateTitle : `Template ${templates.length + 1}`,
                templateId: templates.length, // Use a unique identifier
                chart: selectedChart, // Customize input fields as needed
                row: draggedItem,
                value: droppedItems,
                templateData : dynamicData!
            };

            if (newTemplate.chart && newTemplate.row.length > 0 && newTemplate.value.length > 0) {
                updateTemplates(newTemplate);
                saveTemplatesToLocalStorage([...templates, newTemplate]);
                alert('adding template succesful!');
            } else {
                alert('Invalid input. Please provide values for chart, row, and value.');
            }
        }

        return (

            <>
                {/* {JSON.stringify(draggedItem)} */}
                {/* {JSON.stringify(table.getVisibleLeafColumns())} */}

                <div className="p-2 ReactTable">
                    <Box
                        shadow="xl"
                        borderWidth="1px"
                        h={400}
                        overflowX="auto"
                    >

                        {/* <button onClick={() => setaggFunc('min')}>set agg</button> */}
                        <Table variant="striped" colorScheme="teal">
                            <Thead position="sticky" top={0} zIndex="sticky" bgColor="white">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => {
                                            return (
                                                <Th key={header.id} colSpan={header.colSpan} fontWeight={'bold'} color={'black'} fontSize={'md'} marginX={'15px'}>
                                                    {header.isPlaceholder ? null : (
                                                        <div className='headerNoWrap' style={{ margin: '10px 10px' }}>
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
                                                                    {/* {header.column.getIsGrouped()

                                                                ? `🛑(${header.column.getGroupedIndex()}) `
                                                                : `🟰 `} */}
                                                                </button>
                                                            ) : null}{' '}

                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}

                                                        </div>
                                                    )}
                                                </Th>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </Thead>

                            <Tbody >

                                {table.
                                    getRowModel().
                                    rows.map(row => {
                                        return (
                                            <Tr key={row.id}>
                                                {row.
                                                    getVisibleCells().
                                                    map(cell => {
                                                        return (
                                                            <Td
                                                                {...{
                                                                    key: cell.id,
                                                                    // style: {

                                                                    //     background: cell.getIsGrouped()
                                                                    //         ? '#0aff0082'
                                                                    //         : cell.getIsAggregated()
                                                                    //             ? '#ffa50078'
                                                                    //             : cell.getIsPlaceholder()
                                                                    //                 ? '#ff000042'
                                                                    //                 : 'gray',
                                                                    // },
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
                                                                            {row.getIsExpanded() ?
                                                                                '🡫'
                                                                                :
                                                                                '🡪'
                                                                            }{' '}
                                                                            {flexRender(
                                                                                cell.column.columnDef.cell,
                                                                                cell.getContext(),
                                                                            )}{' '}
                                                                            {/* ({row.subRows.length}) */}
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
                                                            </Td>
                                                        )
                                                    })}
                                            </Tr>
                                        )
                                    })}

                            </Tbody>

                            {/* </tbody> */}
                        </Table>
                    </Box>

                    {/* <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre> */}
                </div >


                <Box style={{
                    width: '350px',
                    position: 'fixed',
                    right: '10px',
                    top: '100px'

                }}
                    shadow="xl"
                    borderWidth="1px"

                >
                    <Heading style={{ padding: '10px', color: '#2d8659' }} colorScheme='green'>Table Fields</Heading>
                    <Text style={{ padding: '5px 10px' }}>Choose fields to add to report : </Text>
                    <Box
                        style={{
                            height: '280px',
                            padding: '10px',
                            overflowY: 'auto',
                            marginBottom: '5px',
                            margin: '3px'
                        }}
                        shadow="xl"
                        borderWidth="1px"
                    >
                        {/* <div className="px-1 border-b border-gray">
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
                    </div> */}
                        {table.getAllLeafColumns().map(column => {
                            return (
                                <div key={column.id} >
                                    <div className="px-1"
                                    >
                                        <label
                                            style={{ display: 'inline-flex', fontSize: '12px', cursor: 'pointer' }}
                                        >
                                            <input

                                                style={{ margin: '3px' }}
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
                    </Box>

                    {/* //////*********** /===========  DROP AREA ===========*/}
                    <div>
                        <SimpleGrid columns={2} spacingX='10px' spacingY='10px' padding={1} >
                            <Box
                                // border="1px solid gray"
                                shadow="md"
                                borderWidth="1px"
                                fontSize={'12px'}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '5px',
                                    paddingTop: '5px',
                                    fontSize: '13px'
                                }}>
                                    <MdOutlineFilterList />
                                    <span style={{ paddingLeft: '5px' }}>Filter </span>
                                </div>
                                <Box
                                    style={{
                                        overflow: 'auto',
                                        height: '163px',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                >

                                </Box>
                            </Box>
                            <Box
                                shadow="md"
                                borderWidth="1px"
                                fontSize={'12px'}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: '5px',
                                    paddingTop: '5px',
                                    fontSize: '13px'
                                }}>
                                    <MdOutlineViewColumn />
                                    <span style={{ paddingLeft: '5px' }}>Column </span>
                                </div>
                                <Box
                                    style={{
                                        overflow: 'auto',
                                        height: '163px',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                >

                                </Box>
                            </Box>
                            <Box
                                shadow="md"
                                borderWidth="1px"
                                border={isOver ? "1px solid black" :
                                    ""}
                                bg=''
                                // height='190px' 
                                ref={drop}
                                fontSize={'12px'} >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: '5px',
                                        paddingTop: '5px',
                                        fontSize: '13px'

                                    }}>
                                    <MdOutlineTableRows />
                                    <span style={{ paddingLeft: '5px' }}>Rows </span>
                                </div>

                                <Box
                                    style={{
                                        overflow: 'auto',
                                        height: '163px',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                >
                                    <DraggedItem item={draggedItem} />
                                </Box>
                            </Box>
                            <Box

                                shadow="md"
                                borderWidth="1px"
                                border={isHover ? "1px solid black" :
                                    ""}
                                bg=''
                                ref={ref}
                                fontSize={'12px'}>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: '5px',
                                        paddingTop: '5px',
                                        fontSize: '13px',
                                        overflow: 'auto'
                                    }}>
                                    <TbSum />
                                    <span style={{ paddingLeft: '5px' }}>Values</span>
                                </div>
                                <Box
                                    style={{
                                        overflow: 'auto',
                                        height: '163px',
                                        backgroundColor: 'whitesmoke'
                                    }}
                                >
                                    {/* <DropTarget onDrop={handleDrop} /> */}
                                    <DraggedItem item={droppedItems} />
                                </Box>

                            </Box>
                        </SimpleGrid>
                    </div>
                </Box >
                <Box width={'400px'} padding={'10px 40px'} display={'flex'} gap={'30px'}>
                    <Select placeholder='Choose charts' cursor={'pointer'} onChange={(e) => setSelectedChart(e.target.value)}>
                        <option value='barChart' style={{ cursor: 'pointer' }} >Bar Chart</option>
                        <option value='areaChart'>Area Chart</option>
                        {/* <option value='option3'></option> */}
                    </Select>
                    <Button colorScheme='teal' width={'200px'} onClick={handleAddTemplate}>Save</Button>
                </Box>

                {selectedChart &&
                    <Box
                        style={{
                            marginLeft: '20px',
                            width: '1350px',
                            height: '350px'
                        }}
                    >
                        {selectedChart === 'barChart' && <DisplayBarChart data={dynamicData} />}
                        {selectedChart === 'areaChart' && <DisplayAreaChart data={dynamicData}/>}
                    </Box>
                }


                {/*             
            {
                table.getIsSomeColumnsVisible() && <DisplayAreaCharts />
            } */}

            </>
        )
    }

    export default ReactTableWithDnd