
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'


interface DisplayLineChartProps {
    data?: [],
    row?: string[]
    col?: string[]

}

const DisplayLineChart = ({ data, row, col }: DisplayLineChartProps) => {

    const tooltipFormatter = (value: number) => {
        if (value >= 1000) {
            // Convert to millions and format with 2 decimal places
            const millionValue = (value / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
            return `${millionValue}K`;
        }

    };

    const formatYAxisLabel = (value: number, index: number) => {
        if (value >= 1000000) {
            // Convert to millions and format with 2 decimal places
            const millionValue = (value / 1000000).toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
            return `${millionValue}M`;
        }

        // For values less than a million, format with 2 decimal places
        return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    };

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
                <YAxis width={105} tickFormatter={formatYAxisLabel} />
                <Tooltip formatter={tooltipFormatter}/>
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