import React from 'react'
import {ShoppingCart, Search} from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex flex-col w-screen'>
        <div className='h-[4svh] bg-[#ffffff]'>
            <div className='flex justify-end gap-6 py-2 px-8'>
                <a>Help</a>
                <a>Order & Returns</a>
                <a>Hi, John</a>
            </div>
        </div>
        <div className='h-[8svh] bg-[#ffffff] flex justify-between py-4 px-8'>
            <div className='text-3xl font-bold'>
                ECOMMERCE
            </div>
            <div className='md:flex gap-6 font-semibold hidden'>
                <div>
                    Categories
                </div>
                <div>
                    Sale
                </div>
                <div>
                    Clearance
                </div>
                <div>
                    New Stock
                </div>
                <div>
                    Trending
                </div>
            </div>
            <div className='flex gap-6 font-normal'>
                <div>
                    <Search/>
                </div>
                <div>
                    <ShoppingCart/>
                </div>
            </div>
        </div>
        <div className='h-[5svh] bg-[#f4f4f4] py-2 px-8 flex justify-center'>
            &lsaquo; <p className='px-6'>Get 10% off on business sign up </p>&rsaquo;
        </div>
    </div>
  )
}


export default Navbar