import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import reportBuilderStore from './reportBuilderStore'

const DisplayCharts = () => {

    const { dynamicData } = reportBuilderStore()
    return (
        <>
            <div
                style={{
                    height: '40px',
                    // paddingTop: '10px',
                    // marginTop: '10px',
                    marginLeft: '60px'
                }}
            >
                <BarChart
                    width={1230}
                    height={350} data={dynamicData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                    //  xAxisId={0} 
                     dataKey="regioncode" 
                     />
                     <XAxis
                    //  xAxisId={0} 
                     dataKey="territorycode" 
                     />
                    <YAxis width={105}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="qouta" fill="#8884d8" />
                    <Bar dataKey="nsTotal" fill="#82ca9d" />
                </BarChart>

            </div >

        </>

    )
}

export default DisplayCharts