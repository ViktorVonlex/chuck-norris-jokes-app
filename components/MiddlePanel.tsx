import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Item } from '../utils/utils';
import Image from 'next/image';

type Props = {
    joke: string,
    jokeUrl: string,
    getRandomJoke: Function,
    setLoading: Function,
    setFetchedNew: Function
}

function MiddlePanel({joke, jokeUrl, getRandomJoke, setLoading, setFetchedNew}: Props) {
  const { data: session, status } = useSession()
  async function saveJoke(jokeUrl: string){
    if(status==="authenticated"){
      const userMail: string|undefined|null = session?.user?.email
      if(userMail !== null){
        const res = await fetch('/api/saveJoke', {
          method: 'POST',
          body: JSON.stringify({userMail: userMail, jokeUrl: jokeUrl})
        })
        setFetchedNew(true)
      }
   } else {
    setLoading(false)
   }
  }

  return (
    <>
      <div className="mx-auto text-white w-1/2">
          <div className="bg-gray-900 text-7xl p-10 rounded-3xl mt-5 text-center">Chuck Norris jokes App</div>
          <div className="flex text-center mt-5">
              <button className="w-2/3 block mr-1 middle-button p-4 flex items-center justify-center text-xl" onClick={() => getRandomJoke()}>Get random joke!
                <Image className="ml-3" alt="Chuck icon" width="50" height="50" src="https://img.icons8.com/plasticine/50/null/chuck-norris.png"/>
              </button>
              <button className="block w-1/3 ml-1 middle-button p-4 flex items-center justify-center text-xl" onClick={() => {
                setLoading(true)
                saveJoke(jokeUrl)
              }}>Save this joke
              </button>
          </div>
          <div className="w-full bg-gray-900 mt-5 pt-4 rounded-3xl">
              <div className="text-center text-white text-5xl mb-5">The Joke</div>
              <div className="text-center bg-gray-800 w-full text-green-600 text-2xl rounded-b-3xl p-9 pb-10 pt-10 break-words">{joke}</div>
          </div>
      </div>
    </>
  )
}

export default MiddlePanel