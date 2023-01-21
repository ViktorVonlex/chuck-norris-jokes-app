import React, { useEffect, useState } from 'react'
import FavJoke from './FavJoke'
import { Item, Joke } from '../utils/utils';
import { signOut, useSession } from 'next-auth/react'
import Modal from './Modal'

type Props = {
    loading: Boolean,
    items: Item[],
    setLoading: Function,
    getFavJoke: Function,
    setItems: Function
}

function FavJokes({loading, setLoading, getFavJoke, items, setItems}: Props) {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

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
                setLoading(true)
            }
         }
    }

    useEffect(() => {
        renderSavedJokes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white max-[1536px]:h-5/6 max-[1536px]:overflow-auto scrollbar-hide">
        <div className="pb-4 pt-4 text-center">Favourite Jokes</div>
        <div className="category-entry">
            <div className="text-center py-2" onClick={() => {
                //deleteSavedJokes()
                setIsOpen(true)
                }
            }>Clear Jokes</div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} deleteSavedJokes={deleteSavedJokes}/>
        </div>
            {items !== undefined &&
             items.map(item => {
                jokeCounter = jokeCounter+1
                //@ts-ignore
                return <FavJoke key={item.id} jokeNumber={jokeCounter} jokeUrl={item.url} getFavJoke={getFavJoke} setLoading={setLoading}/>
                })
            }
            <div className="category-entry text-center py-2" onClick={()=>{
                signOut()
            }}>Logout</div>
    </div> 
  )
}

export default FavJokes