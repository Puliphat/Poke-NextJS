"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function PokeData() {
    const [poke, setPoke] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokeData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=250");
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                const PokeData = await response.json();
                setPoke(PokeData.results);
            } catch(error) {
                setError(error.message);
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPokeData();
    }, []);

  return (
    <div className='container text-center mx-auto mt-4'>
     {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
     ) :error ? (
      <div className="text-center py-8">
          <h3 className="text-2xl font-bold text-red-400 mb-4 font-semibold">Loading...</h3>
          <p className="text-gray-600 font-semibold">Please refresh the page</p>
      </div>
  ) : ( 
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
           {poke.map((val,index) => (
            <Link key={val.name} href={`/pokeinfo/${index + 1}`}>
                <div className='bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-white/20 p-4 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl'>
                    <div className="relative w-32 h-32 mx-auto mb-3">
                        <Image 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} 
                            alt={val.name || "Pokemon image"} 
                            width={150} 
                            height={150} 
                            priority
                            className="transform hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                        />
                    </div>
                    <h3 className='text-lg font-semibold text-gray-600 capitalize'>{val.name}</h3>
                </div>
            </Link>            
           ))}            
        </div>
     )}
    </div>
  )
}

export default PokeData
