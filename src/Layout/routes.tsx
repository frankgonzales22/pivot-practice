import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"


import ReactTableWithDnd from "../SelfPracticeTable/ReactTableWithDnd"
import DisplayCharts from "./DisplayCharts"



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            // { index: true, element: <ReactTableNewSales /> },
            { index: true, element: <ReactTableWithDnd /> },
            { path: 'DisplayCharts', element: <DisplayCharts /> },
        

        ]

    }
])

export default router