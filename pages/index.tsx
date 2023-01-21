import Categories from "../components/Categories";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Item } from "../utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";

const FavJokes = dynamic(() => import('../components/FavJokes'), {
  ssr: false,
})

const MiddlePanel = dynamic(() => import('../components/MiddlePanel'), {
  ssr: false,
})

export default function Home() {

  const [categoriesArray, setCategories] = useState<string[]>([]);
  const [joke, setJoke] = useState<string>("");
  const [jokeUrl, setJokeUrl] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const { data: session, status } = useSession()
    
    function getRandomJoke() {
      fetch('https://api.chucknorris.io/jokes/random')
      .then(res =>  res.json()
      )
      .then(data => {
          setJoke(data.value);
          setJokeUrl(data.url);
      })
      .catch(err => {
          console.log(err)
      }
      )
    }

    function getJokeFromCategory(category: string) {
      fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
      .then(res =>  res.json()
      )
      .then(data => {
          setJoke(data.value);
          setJokeUrl(data.url);
      })
      .catch(err => {
          console.log(err)
      }
      )
    }

    function getFavJoke(url: string) {
      fetch(url)
      .then(res =>  res.json()
      )
      .then(data => {
          setJoke(data.value);
          setJokeUrl(data.url);
      })
      .catch(err => {
          console.log(err)
      }
      )
    }

    useEffect(() => {
      fetch('https://api.chucknorris.io/jokes/categories')
      .then(res =>  res.json()
      )
      .then(data => {
          setCategories(data)
      })
      .catch(err => {
          console.log(err)
      }
      )
      getRandomJoke()        
  }, [])

  return (
    <>
    <div className="flex mx-auto px-4 bg-gray-400 h-screen">
      <Categories categoriesArray={categoriesArray} getJokeFromCategory={getJokeFromCategory}/>
      <MiddlePanel joke={joke} jokeUrl={jokeUrl} getRandomJoke={getRandomJoke} setLoading={setLoading} />
      {status === "authenticated"
      ? <FavJokes loading={loading} setLoading={setLoading} getFavJoke={getFavJoke} items={items} setItems={setItems} />
      : <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white">
          <div className="mx-auto w-5/6 flex flex-col justify-center">
            <div className="pb-4 pt-4 text-center text-xl mx-auto">Log in to see fav jokes</div>
            <Link href="/login" className="text-center flex flex-col justify-center button mb-3">
              Log in here
            </Link>
          </div>
        </div>
      }
      {loading &&
        <Loading />
      }
    </div>
    </>
  )
}
