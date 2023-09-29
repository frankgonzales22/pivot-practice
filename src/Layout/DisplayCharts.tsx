import  { useEffect, useState } from 'react'

import DisplayBarChart from './DisplayBarChart'
import DisplayAreaChart from './DisplayAreaChart'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
// import newSaleData from '../newSale'
import DisplayComposedChart from './DisplayComposedChart'
import DisplayLineChart from './DisplayLineChart'

type Template = {
    templateTitle: string;
    templateId: number;
    chart: string;
    row: string[];
    value: string[];
    templateData: [];
};


const DisplayCharts = () => {



    // const templates1 = [
    //     {
    //         templateId: 0,
    //         title: 'Template 1',
    //         chart: 'barChart',
    //         row: ['regioncode'],
    //         value: [
    //             'quota', 'nsTotal'
    //         ],
    //         data: []
    //     },

    //     {
    //         templateId: 1,
    //         chart: 'areaChart',
    //         title: 'Template 2',
    //         row: ['territorycode'],
    //         value: [
    //             'quota', 'nsTotal'
    //         ],
    //     },
    //     {
    //         templateId: 3,
    //         chart: 'areaChart',
    //         title: 'Template 3',
    //         row: ['territorycode'],
    //         value: [
    //             'quota', 'nsTotal'
    //         ],
    //     },
    //     {
    //         templateId: 4,
    //         chart: 'areaChart',
    //         title: 'Template 4',
    //         row: ['territorycode'],
    //         value: [
    //             'quota', 'nsTotal'
    //         ],
    //     },
    // ]


    const [templates, setTemplates] = useState<Template[]>([]);

    // Key to store data in local storage
    const localStorageKey = 'templatesData';



    // Load data from local storage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem(localStorageKey);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setTemplates(parsedData);

        }


    }, []);
    // console.log('display')
    // console.log(templates)


    templates.map(i => console.log(i.row.reverse()))
    // const [dynamicData, setData] = React.useState(newSaleData as [])
    // const { dynamicData } = reportBuilderStore()

    function TemplateComponent({ template }: any) {
        switch (template.chart) {
            case 'barChart':
                return <DisplayBarChart data={template.templateData} row={template.row} col={template.value} />;
            case 'areaChart':
                return <DisplayAreaChart data={template.templateData} row={template.row} col={template.value} />;
            case 'composedChart':
                return <DisplayComposedChart data={template.templateData} row={template.row} col={template.value} />;
            case 'lineChart':
                return <DisplayLineChart data={template.templateData} row={template.row} col={template.value} />;
            default:
                return null; // Handle the case where the chart type is unknown
        }
    }

    return (


        <>
            {/* {JSON.stringify(templates)} */}
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
                        >{template.templateTitle}</Heading>
                        {/* {JSON.stringify(template.templateData)} */}
                        <TemplateComponent template={template} />
                    </Box>

                ))}
            </SimpleGrid>

        </>
    )
}

export default DisplayCharts
