import { Box } from '@chakra-ui/react'
import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
    return (
        <>
            <Navbar />
            <Box
                ml={{ base: 0, md: 60 }}
                className='main-box'
       
                fontSize={{
                    base: '12px',
                    md: '14px',
                    lg: '16px'

                }}
            >
                <Outlet />
            </Box>
        </>
    )
}

export default Layout