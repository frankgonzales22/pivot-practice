
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'


interface DisplayLineChartProps {
    data?: [],
    row?: string[]
    col?: string[]

}

const DisplayLineChart = ({ data, row, col }: DisplayLineChartProps) => {
    return (
        <ResponsiveContainer width='90%' height='100%'>
            <LineChart
                width={800}
                height={350} data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {row?.map((i, index) =>
                    <XAxis dataKey={i} xAxisId={index} />
                )}
                       <YAxis width={105} />
                <Tooltip />
                <Legend />
                {col?.map((i) =>
                <Line 
                // type="monotone"
                    dataKey={i}
                    // syncId={index}
                    fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                />
            )}
            </LineChart>
        </ResponsiveContainer>
    )
}

export default DisplayLineChart