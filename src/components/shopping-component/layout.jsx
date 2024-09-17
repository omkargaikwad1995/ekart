import React from 'react'
import ShoppingHeaders from './headers'
import { Outlet } from 'react-router-dom';

const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        {/* comman header */}
        <ShoppingHeaders/>
        <main className='flex flex-col w-full '>
            <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingLayout