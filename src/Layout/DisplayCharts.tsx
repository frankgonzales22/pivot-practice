import React from 'react'
import { Pie, PieChart, Tooltip } from 'recharts'
import reportBuilderStore from './reportBuilderStore'
import DisplayBarChart from './DisplayBarChart'
import DisplayAreaChart from './DisplayAreaChart'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'



const DisplayCharts = () => {



    const templates = [
        {
            templateId: 0,
            title: 'Template 1',
            chart: 'barChart',
            row: ['regioncode'],
            value: [
                'quota', 'nsTotal'
            ]
        },

        {
            templateId: 1,
            chart: 'areaChart',
            title: 'Template 2',
            row: ['territorycode'],
            value: [
                'quota', 'nsTotal'
            ],
        },
        {
            templateId: 3,
            chart: 'areaChart',
            title: 'Template 3',
            row: ['territorycode'],
            value: [
                'quota', 'nsTotal'
            ],
        },
        {
            templateId: 4,
            chart: 'areaChart',
            title: 'Template 4',
            row: ['territorycode'],
            value: [
                'quota', 'nsTotal'
            ],
        },
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
                        marginTop={'40px'}
                        marginBottom={'50px'}
                        borderRadius={'20px'}
                        backgroundColor={'white'}
                        width={'95%'}
                        minH={'350px'}
                        maxH={'350px'}

                        key={template.templateId}>
                        <Heading
                            margin={'20px 100px'}
                     
                            style={{ color: '#2d8659' }}
                        >{template.title}</Heading>

                        <TemplateComponent template={template} />
                    </Box>

                ))}
            </SimpleGrid>

        </>
    )
}

export default DisplayCharts
