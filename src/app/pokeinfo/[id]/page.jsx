"use client"

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function PokeInfo() {

   const params = useParams();
   
   const [poke, setPoke] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [imageError, setImageError] = useState(false);

   useEffect(() => {
    const fetchPokeInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        setImageError(false);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        const PokeInfo = await response.json();
        setPoke(PokeInfo);
      } catch(error) {
        setError(error.message);
        setPoke(null);
      } finally {
        setLoading(false);
      }
    }
    fetchPokeInfo();
   }, [params.id]);

   const handleImageError = () => {
    setImageError(true);
   };

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-8 md:p-24'>
        <Link href="/" className='inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to List
        </Link>
        <div className='flex justify-center items-center mt-10 text-center'>
            <div className='bg-white/80 backdrop-blur-sm shadow-xl p-8 md:p-12 rounded-2xl transform hover:scale-[1.02] transition-all duration-300 max-w-2xl w-full border border-white/20'>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8">
                        <h3 className="text-2xl font-bold text-red-400 mb-4 font-semibold">Loading...</h3>
                        <p className="text-gray-600 font-semibold">Please refresh the page</p>
                    </div>
                ) : poke && (
                    <div className="space-y-6">
                        <h3 className='text-4xl md:text-5xl font-bold text-gray-700 capitalize'>{poke.name}</h3>
                        <div className="relative w-64 h-64 mx-auto">
                                <Image 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`} 
                                    alt={poke.name || "Pokemon image"}  
                                    width={300} 
                                    height={300} 
                                    loading="eager"
                                    onError={handleImageError}
                                    className="transform hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                                />
                            {imageError && (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                    <p className="text-gray-500">Image not available</p>
                                </div>
                            )}
                        </div>
                        <div className='bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100 space-y-4'>
                            <div className='flex justify-center items-center space-x-2 flex-wrap'>
                                <p className='text-lg font-semibold text-gray-700'>Height: {poke.height} cm</p>
                            </div>
                            <div className='flex justify-center items-center space-x-2 flex-wrap'>
                                <p className='text-lg font-semibold text-gray-700'>Abilities:</p>
                                <div className='flex flex-wrap gap-2 justify-center'>
                                    {poke.abilities?.map(val => (
                                        <span 
                                            key={val.ability.name} 
                                            className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium capitalize hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md'
                                        >
                                            {val.ability.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className='flex justify-center items-center space-x-2 flex-wrap'>
                                <p className='text-lg font-semibold text-gray-700'>Types:</p>
                                <div className='flex flex-wrap gap-2 justify-center'>
                                    {poke.types?.map(val => (
                                        <span 
                                            key={val.type.name} 
                                            className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium capitalize hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md'
                                        >
                                            {val.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default PokeInfo;
