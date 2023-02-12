import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {
    jokeNumber: number,
    jokeUrl: string,
    getFavJoke: Function,
    setLoading: Function,
    setFetchedNew: Function
}

function FavJoke({jokeNumber, jokeUrl, getFavJoke, setLoading, setFetchedNew}: Props) {
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
          setFetchedNew(true)
       }
    }
}

  return (
    <div className="flex text-center w-4/5 mx-auto">
      <div className="category-entry w-4/5 mr-1" onClick={() => getFavJoke(jokeUrl)}>
          <div className="text-center py-2">{jokeNumber}</div>
      </div>
      <button className="button w-1/5 ml-1 flex justify-center items-center text-red-600" onClick={()=>{
        deleteJoke(jokeUrl);
        setLoading(true)
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div> 
  )
}

export default FavJoke