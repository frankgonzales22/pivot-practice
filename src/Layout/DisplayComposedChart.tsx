
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line, ResponsiveContainer } from 'recharts'




interface DisplayComposedChartProps {
    data?: [],
    row?: string[]
    col?: string[]

}

const DisplayComposedChart = ({ data, row, col }: DisplayComposedChartProps) => {
    return (
        <ResponsiveContainer width='90%' height='100%'>
            <ComposedChart
                width={800}
                height={350} data={data}
            >
                {row?.map((i, index) =>
                    <XAxis dataKey={i} xAxisId={index} />
                )}
                <YAxis width={105} />
                <Tooltip />

                {/* 'line' | 'plainline' | 'square' */}

                {/* {col?.map((i, index) =>

                    <Legend iconType={(index + 1) % 3 === 0 ? 'plainline' : (index + 1) % 2 === 0 ? 'circle' : 'square'} />




                )} */}
                {/* <Legend iconType='plainline' /> */}
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                {col?.map((i, index) =>
                    (index + 1) % 3 === 0 ?
                        <Line type="monotone"
                            
                            dataKey={i}
                            // stackId={index}
                            stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                            fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                        />
                        : (index + 1) % 2 === 0 ?
                            <Area type="monotone"
                                dataKey={i}
                                stackId={index}
                                stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                                fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                            />
                            :
                            <Bar type="monotone"
                                dataKey={i}
                                stackId={index}
                                stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                                fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                            />
                )}
                {/* {col?.map((i, index) =>
                <Bar type="monotone"
                    dataKey={i}
                    stackId={index}
                    stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                    fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                />
            )} */}
                {/* {col?.map((i, index) =>
                <Line type="monotone"
                    dataKey={i}
                    // stackId={index}
                    stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                    fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                />
            )} */}

            </ComposedChart>
        </ResponsiveContainer>
    )
}

export default DisplayComposedChart