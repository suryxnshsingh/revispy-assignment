'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';

const Verify = () => {
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '') {
      if (index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpString = otp.join('');
    // Handle OTP verification here
    console.log('Submitted OTP:', otpString);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="md:border-[1px] border-[#c1c1c1] w-full border-0 sm:w-[35svw] rounded-2xl h-[70svh] mt-[3%] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-8">Verify your email</h1>
        <p className="mb-6">Enter the 8 digit code sent to your email.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-10 h-12 border-2 rounded text-center font-semibold text-xl dark:bg-neutral-800 dark:text-white dark:border-neutral-600 focus:border-black dark:focus:border-white focus:outline-none"
              />
            ))}
          </div>

          <button 
            type="submit"
            className="bg-black text-white dark:bg-neutral-800 py-3 px-8 mt-8 rounded-sm w-full">
            SUBMIT
          </button>
        </form>

        <hr className="w-[30svw] mt-8"/>
        <div className="mt-8 text-[#333333] dark:text-[#c1c1c1]">
          Already have an account? <Link href="/signin" className="text-black dark:text-white">SIGNUP</Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;