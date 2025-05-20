'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Header() {
   const router = useRouter();
   const [pokeName, setPokeName] = useState('');
   const [error, setError] = useState('');
   
   const handleInput = (e) => {
    setPokeName(e.target.value);
    setError(''); 
   }

   const handleForm = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่าชื่อ Pokemon ไม่เป็นค่าว่าง
    if (!pokeName.trim()) {
        setError('Please enter a Pokémon name');
        return;
    }
    router.push(`/pokesearch/${pokeName.toLowerCase()}`);

   }

  return (
    <header className='h-[300px] flex justify-center items-center'>
      <div className='text-center p-8 max-w-2xl w-full'>
        <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4'>Next.Js Pokémon Finder</h1>
        <p className='text-gray-700 font-semibold text-xl md:text-2xl mb-6'>Find your favorite pokémon</p>
        <form onSubmit={handleForm} className='flex gap-2'>
          <input 
            type="text"
            className='w-full bg-white/80 rounded-full border border-purple-200 px-6 py-3 text-gray-600 font-semibold text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
            placeholder='Search Pokémon Name..'
            onChange={handleInput}
            value={pokeName}
          />
          <button 
            className='inline-flex items-center px-4 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:cursor-pointer transition-all 
            duration-300 text-white shadow-md hover:shadow-lg' 
            type='submit'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
           </svg>
          </button>
        </form>
        {error && <p className='mt-4 text-2xl text-red-400 font-semibold'>{error}</p>}
      </div>
    </header>
  )
}

export default Header
