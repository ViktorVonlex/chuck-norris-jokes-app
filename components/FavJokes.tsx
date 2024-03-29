import React, { useEffect, useState } from 'react'
import FavJoke from './FavJoke'
import { Item } from '../types/utils';

type Props = {
    setCounter: Function,
    loading: Boolean,
    items: Item[],
    setLoading: Function,
    getFavJoke: Function,
    setItems: Function
}

function FavJokes({setCounter, loading, setLoading, getFavJoke, items, setItems}: Props) {

    useEffect(() => {

        const allStorage = () => {
            const jokes:Item[] = []
            for (var i:number = 1; i<localStorage.length+1; i++) {
                jokes.push(JSON.parse(localStorage.getItem(i.toString())!))
            }
            setItems(jokes)
            setLoading(false)
        }
        allStorage()
    }, [loading]);

  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto scrollbar-hide">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <div className="category-entry">
            <div className="text-center py-2" onClick={() => {
                localStorage.clear()
                setLoading(true)
                setCounter(1)
                }
            }>Clear Jokes</div>
        </div>
            {
            items.map(item =>
                <FavJoke key={item.jokeNumber} jokeNumber={item.jokeNumber} jokeUrl={item.jokeUrl} getFavJoke={getFavJoke}/>)
            }
    </div> 
  )
}

export default FavJokes