import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {
    jokeNumber: number,
    jokeUrl: string,
    getFavJoke: Function,
    setLoading: Function
}

function FavJoke({jokeNumber, jokeUrl, getFavJoke, setLoading}: Props) {
  const { data: session, status } = useSession()

  async function deleteJoke(jokeUrl: string) {
    if(status==="authenticated"){
       const userMail: string|undefined|null = session?.user?.email
       if(userMail !== null){
            const res = await fetch('/api/deleteSpecificUserJoke', {
                method: 'POST',
                body: JSON.stringify({email: userMail, url: jokeUrl})
            })
            .then(res =>  
                res.json()
            )
            setLoading(true)
       }
    }
}

  return (
    <div className="category-entry" onClick={() => getFavJoke(jokeUrl)}>
        <div className="text-center py-2">{jokeNumber}</div>
        <button className="bg-green-900" onClick={()=>{
          deleteJoke(jokeUrl)
        }}>Delete this joke</button>
    </div>
  )
}

export default FavJoke