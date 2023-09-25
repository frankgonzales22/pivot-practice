import { createBrowserRouter } from "react-router-dom"
import Layout from "./Layout"
import ReactTableNewSales from "../ReactTable/ReactTableNewSales"
import DisplayCharts from "./DisplayCharts"



const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            { index: true, element: <ReactTableNewSales /> },
            { path: 'DisplayCharts', element: <DisplayCharts /> },
        

        ]

    }
])

export default router