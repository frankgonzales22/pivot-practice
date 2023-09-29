import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'


interface DisplayBarChartProps {
    data?: [],
    row?: string[]
    col?: string[]
}


const DisplayBarChart = ({ data, row, col }: DisplayBarChartProps) => {



    // const revRows = row?.reverse();

    console.log(row?.reverse())

    return (
        <>
            {/* <div
                style={{
                    // height: '40px',
                    // paddingTop: '10px',
                    // marginTop: '10px',
                    marginLeft: '60px'
                }}
            > */}


            <ResponsiveContainer
                width='90%' height='100%'


            >

                <BarChart
                    width={800}
                    height={350} data={data}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {row?.map((i, index) =>
                        <XAxis key={index} dataKey={i} 
                        xAxisId={index} 
                        //  interval={index === 2 ? 10 : index === 1 ? 3 : 1}
                          tickLine={true}/>
                        // <Line key={index} dataKey={i} />
                    )}
         



                    <YAxis width={105} />
                    <Tooltip />
                    <Legend />

                    {col?.map((i, index) =>
                        <Bar
                            // type="monotone"
                            key={index} 
                            dataKey={i}
                            stackId={index}
                            
                            // stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                            fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                        />
                    )}


                </BarChart>
            </ResponsiveContainer>

            {/* </div > */}

        </>

    )
}

export default DisplayBarChart