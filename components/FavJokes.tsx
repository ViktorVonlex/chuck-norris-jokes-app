import React, { useEffect, useState } from 'react'

type Props = {
    counter: number,
    setCounter: Function
}

type Item = {
    jokeNumber: number
    jokeUrl: string
}

function FavJokes({counter, setCounter}: Props) {

    const [items, setItems] = useState<Item[]>([]);

    function allStorage() {
        var archive:any = [];
        for (var i:number = 0; i<localStorage.length; i++) {
            archive[i] = localStorage.getItem(localStorage.key(i)!);
        }
        return archive;
    }

    useEffect(() => {
        setItems(allStorage())
    }, [counter]);


  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <div className="category-entry">
            <div className="text-center py-2" onClick={() => {
                localStorage.clear()
                setCounter(0)
                }
            }>Clear Jokes</div>
        </div>
            {
            items.map(item =>
                <div className="category-entry" key={item.jokeNumber}>
                    <div className="text-center py-2">{item.jokeNumber}</div>
                </div>)
            }
    </div> 
  )
}

export default FavJokes