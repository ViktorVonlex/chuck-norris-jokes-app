import React, { useEffect, useState } from 'react'
import FavJoke from './FavJoke'
import { Item, Joke } from '../utils/utils';
import { signOut, useSession } from 'next-auth/react'
import ModalDelete from './ModalDelete'

type Props = {
    loading: Boolean,
    items: Item[],
    fetchedNew: Boolean,
    setLoading: Function,
    getFavJoke: Function,
    setItems: Function,
    setFetchedNew: Function
}

function FavJokes({loading, setLoading, getFavJoke, items, setItems, fetchedNew, setFetchedNew}: Props) {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    let jokeCounter: number = 0;

    async function renderSavedJokes() {
        if(status==="authenticated"){
           const userMail: string|undefined|null = session?.user?.email
           if(userMail !== null && fetchedNew === true){
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
                        setFetchedNew(false)
                    }
                })
           }
        }
    }

    async function deleteSavedJokes() {
        if(status==="authenticated"){
            const userMail: string|undefined|null = session?.user?.email
            if(userMail !== null && items.length != 0){
                const res = await fetch('/api/deleteUserJokes', {
                    method: 'POST',
                    body: userMail
                })
                .then(res =>  
                    res.json()
                )
                setFetchedNew(true)
            }
         }
    }

    useEffect(() => {
        renderSavedJokes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchedNew]);

  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto scrollbar-hide">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <button className="category-entry block">
            <div className="text-center py-2" onClick={() => {
                setIsOpen(true)
                }
            }>Clear Jokes</div>
            <ModalDelete isOpen={isOpen} setIsOpen={setIsOpen} deleteSavedJokes={deleteSavedJokes} setLoading={setLoading}/>
        </button>
            {items !== undefined &&
             items.map(item => {
                jokeCounter = jokeCounter+1
                //@ts-ignore
                return <FavJoke key={item.id} jokeNumber={jokeCounter} jokeUrl={item.url} getFavJoke={getFavJoke} setLoading={setLoading} setFetchedNew={setFetchedNew}/>
                })
            }
            <button className="category-entry text-center py-2 block" onClick={()=>{
                signOut()
            }}>Logout</button>
    </div> 
  )
}

export default FavJokes