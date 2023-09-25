import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const SampleRoute = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default SampleRoute