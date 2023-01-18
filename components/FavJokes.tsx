import React, { useEffect } from 'react'
import FavJoke from './FavJoke'
import { Item, Joke } from '../utils/utils';
import { signOut, useSession } from 'next-auth/react'

type Props = {
    loading: Boolean,
    items: Item[],
    setLoading: Function,
    getFavJoke: Function,
    setItems: Function
}

function FavJokes({loading, setLoading, getFavJoke, items, setItems}: Props) {
    const { data: session, status } = useSession()

    let jokeCounter: number = 0;

    async function renderSavedJokes() {
        if(status==="authenticated"){
           const userMail: string|undefined|null = session?.user?.email
           if(userMail !== null && loading === true){
                const res = await fetch('/api/loadUserJokes', {
                    method: 'POST',
                    body: userMail
                })
                .then(res =>  
                    res.json()
                )
                .then(data => {
                    if(data !== undefined) {
                        setItems(data)
                        setLoading(false)
                    }
                })
           }
        }
    }

    useEffect(() => {
        renderSavedJokes()
    }, [loading]);

  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto scrollbar-hide">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <div className="category-entry">
            <div className="text-center py-2" onClick={() => {
                setLoading(true)
                }
            }>Clear Jokes</div>
        </div>
            {items !== undefined &&
             items.map(item => {
                jokeCounter = jokeCounter+1
                //@ts-ignore
                return <FavJoke key={item.id} jokeNumber={jokeCounter} jokeUrl={item.url} getFavJoke={getFavJoke}/>
                })
            }
            <div className="category-entry text-center py-2" onClick={()=>{
                signOut()
            }}>Logout</div>
    </div> 
  )
}

export default FavJokes