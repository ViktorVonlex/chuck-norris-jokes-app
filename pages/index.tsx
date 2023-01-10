import Categories from "../components/Categories";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Item } from "../types/utils";
import Login from "../components/Login";

const FavJokes = dynamic(() => import('../components/FavJokes'), {
  ssr: false,
})

const MiddlePanel = dynamic(() => import('../components/MiddlePanel'), {
  ssr: false,
})

export default function Home() {

  const [categoriesArray, setCategories] = useState<string[]>([])
  const [joke, setJoke] = useState<string>("");
  const [jokeUrl, setJokeUrl] = useState<string>("");
  const [counter, setCounter] = useState<number>(1);
  const [loading, setLoading] = useState<Boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loggedIn, setLoggedIn] = useState<Boolean>(false)
    
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
      <MiddlePanel joke={joke} jokeUrl={jokeUrl} counter={counter} getRandomJoke={getRandomJoke} setCounter={setCounter} setLoading={setLoading} items={items}/>
      {loggedIn 
      ? <FavJokes setCounter={setCounter} loading={loading} setLoading={setLoading} getFavJoke={getFavJoke} items={items} setItems={setItems} />
      : <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white">
          <div className="pb-4 pt-4 text-center">Log in to see fav jokes</div>
          <Login />
        </div>
      }
    </div>
    </>
  )
}
