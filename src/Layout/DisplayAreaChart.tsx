import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import reportBuilderStore from './reportBuilderStore'


interface DisplayAreChartProps {
    data?: []
}


const DisplayAreaChart = ({ data }: DisplayAreChartProps) => {



    const { dynamicData } = reportBuilderStore()
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
                    <XAxis
                        //  xAxisId={0} 
                        dataKey="regioncode"
                    // width={300}
                    />
                    <YAxis width={105} />
                    <Legend iconType='square' />
                    <Tooltip />
                    <Area type="monotone" dataKey="qouta" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="nsTotal" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
                </AreaChart>
            </ResponsiveContainer>
            {/* </div > */}



        </>

    )
}

export default DisplayAreaChart