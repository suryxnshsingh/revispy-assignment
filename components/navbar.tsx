"use client";
import React, { useEffect, useState } from 'react'
import {ShoppingCart, Search} from 'lucide-react'
import { Loader, Moon, Sun } from "lucide-react";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      }, []);
    
      const toggleTheme = () => {
        if (typeof window !== 'undefined') {
          document.documentElement.classList.toggle('dark');
          setIsDarkMode(!isDarkMode);
          localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
        }
      };
  return (
    <div className='flex flex-col w-screen'>
        <div className='h-[4svh] bg-[#ffffff] dark:bg-black'>
            <div className='flex justify-end gap-6 py-2 px-8'>
                <a>Help</a>
                <a>Order & Returns</a>
                <a>Hi, John</a>
            </div>
        </div>
        <div className='h-[8svh] bg-[#ffffff] dark:bg-black flex justify-between py-4 px-8'>
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
                    <button
                        onClick={toggleTheme}
                        className="pt-[1px] rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDarkMode ? (
                        <Sun className="w-5 h-5 text-gray-100" />
                        ) : (
                        <Moon className="w-5 h-5 text-gray-900" />
                        )}
                    </button>
                </div>
                <div>
                    <Search/>
                </div>
                <div>
                    <ShoppingCart/>
                </div>
            </div>
        </div>
        <div className='h-[5svh] bg-[#f4f4f4] dark:bg-neutral-900 py-2 px-8 flex justify-center'>
            &lsaquo; <p className='px-6'>Get 10% off on business sign up </p>&rsaquo;
        </div>
    </div>
  )
}


export default Navbar