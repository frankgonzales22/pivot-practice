import React from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import reportBuilderStore from './reportBuilderStore'
import { Center, Text } from '@chakra-ui/react'

const DisplayCharts = () => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300
        }
    ]

    const { dynamicData } = reportBuilderStore()
    return (
        <>
            {/* {JSON.stringify(dynamicData)}
            {JSON.stringify(data)} */}
            <div
                style={{
                    height: '50px',
                    paddingTop: '20px',
                    marginLeft: '40px'
                }}
            >

                <BarChart
                 width={1130} 
                 height={250} data={dynamicData}
                
                 >
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis dataKey="territorycode" /> */}
                    <XAxis 
                    // tickLine={true}
                     xAxisId={0} 
                    // dy={0} dx={-0} label={{ value: '', angle: 0, position: 'bottom' }} 
                    // interval={0} 
                    // dataKey="territorycode" 
                    dataKey="territorycode" 
                    // tickLine={false} tick={{ fontSize: 9, angle: 0 }}
                     />
                    {/* <XAxis
                     xAxisId={1} 
                    //  dy={-15} 
                    //  dx={0}
                    //   label={{ value: '', angle: 0, position: 'bottom' }} 
                    //   interval={7}
                       dataKey="territorycode"
          
                      /> */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="qouta" fill="#8884d8" />
                    <Bar dataKey="nsTotal" fill="#82ca9d" />
                </BarChart>

            </div >
            <div
                style={{
                    marginTop: '300px',
                    height: '50px',
                    paddingTop: '20px'

                }}
            >

                {/* <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#8884d8" />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart> */}
            </div>
        </>

    )
}

export default DisplayCharts