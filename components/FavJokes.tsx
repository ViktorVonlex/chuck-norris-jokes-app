import React, { useEffect, useState } from 'react'

type Props = {
    counter: number,
    setCounter: Function,
    loading: Boolean,
    setLoading: Function,
    setLastSavedJoke: Function
}

type Item = {
    jokeNumber: number
    jokeUrl: string
}

function FavJokes({counter, setCounter, loading, setLoading, setLastSavedJoke}: Props) {

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {

        const allStorage = () => {
            const jokes:Item[] = []
            for (var i:number = 1; i<localStorage.length; i++) {
                jokes.push(JSON.parse(localStorage.getItem(i.toString())!))
            }
            setItems(jokes)
            setLoading(false)
        }
        allStorage()
        console.log(items)
    }, [loading]);


  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <div className="category-entry">
            <div className="text-center py-2" onClick={() => {
                localStorage.clear()
                setLastSavedJoke()
                setLoading(true)
                setCounter(1)
                }
            }>Clear Jokes</div>
        </div>
            {
            items.map(item =>
                <div className="category-entry" key={item.jokeNumber}>
                    <div className="text-center py-2">{item.jokeNumber}</div>
                </div>)
            }
        <div className="text-center">{counter}</div>
    </div> 
  )
}

export default FavJokes