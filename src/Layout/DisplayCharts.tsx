import React from 'react'
import { Pie, PieChart, Tooltip } from 'recharts'
import reportBuilderStore from './reportBuilderStore'
import DisplayBarChart from './DisplayBarChart'
import DisplayAreaChart from './DisplayAreaChart'
import { Box, SimpleGrid } from '@chakra-ui/react'



const DisplayCharts = () => {



    const templates = [
        {
            templateId: 0,
            chart: 'barChart',
            row: ['regioncode'],
            value: [
                'quota', 'nsTotal'
            ]
        },

        {
            templateId: 1,
            chart: 'areaChart',
            row: ['territorycode'],
            value: [
                'quota', 'nsTotal'
            ],
        }
    ]



    const { dynamicData } = reportBuilderStore()

    function TemplateComponent({ template }: any) {
        switch (template.chart) {
            case 'barChart':
                return <DisplayBarChart data={dynamicData} />;
            case 'areaChart':
                return <DisplayAreaChart data={dynamicData} />;
            default:
                return null; // Handle the case where the chart type is unknown
        }
    }

    return (


        <>
            <SimpleGrid

                templateColumns={{
                    base: '1fr',
                    md: '1fr',
                    lg: '1fr 1fr'

                }}
            >
                {templates.map((template) => (
                    <Box
                        marginTop={'10px'}
                        borderRadius={'20px'}
                        backgroundColor={'white'}
                        width={'95%'}
                        minH={'350px'}

                        key={template.templateId}>
                        <TemplateComponent template={template} />
                    </Box>
                ))}
            </SimpleGrid>

        </>
    )
}

export default DisplayCharts
