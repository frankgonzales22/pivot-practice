import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import ReactTableNewSales from "../ReactTable/ReactTableNewSales"
import DisplayCharts from "./DisplayCharts"
import ReactTableWithDnd from "../SelfPracticeTable/ReactTableWithDnd"



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