import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'



interface DisplayAreChartProps {
    data?: []
    row?: string[]
    col?: string[]
}


const DisplayAreaChart = ({ data, row, col }: DisplayAreChartProps) => {
    const tooltipFormatter = (value: number) => {
        if (value >= 1_000_000) {
            // Convert to millions and format with 2 decimal places
            const millionValue = (value / 1_000_000).toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
            return `${millionValue}M`;

        } else if (value >= 1000) {
            // Convert to millions and format with 2 decimal places
            const millionValue = (value / 1000).toLocaleString(undefined, {
                maximumFractionDigits: 2,
            });
            return `${millionValue}K`;
        }
        // if (value >= 1_000_000) {
        //     // Convert to millions and format with 2 decimal places
        //     const millionValue = (value / 1_000_000).toLocaleString(undefined, {
        //         maximumFractionDigits: 2,
        //     });
        //     return `${millionValue}M`;

        // };
    }

    const formatYAxisLabel = (value: number) => {
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
                <AreaChart
                    width={800}
                    height={350}
                    data={data}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis
                        //  xAxisId={0} 
                        dataKey="regioncode"
                    // width={300}
                    /> */}
                    {row?.map((i, index) =>
                        <XAxis key={index} dataKey={i} xAxisId={index} />
                        // {JSON.stringify(i)}
                    )}

                    <YAxis width={105} tickFormatter={formatYAxisLabel} />

                    <Legend iconType='square' />

                    <Tooltip formatter={tooltipFormatter} />

                    {/* <Area type="monotone" dataKey="qouta" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="nsTotal" stackId="1" stroke="#82ca9d" fill="#82ca9d" /> */}
                    {col?.map((i, index) =>
                        // <XAxis dataKey={i} xAxisId={index} />
                        <Area type="monotone"
                            key={index}
                            dataKey={i}
                            stackId={index}
                            stroke={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                            fill={`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`}
                        />
                    )}

                    {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
                </AreaChart>
            </ResponsiveContainer>
            {/* </div > */}



        </>

    )
}

export default DisplayAreaChart