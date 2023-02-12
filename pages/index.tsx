import Categories from "../components/Categories";
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Item } from "../utils/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "../components/Loading";
import Head from "next/head";
import MiddlePanel from "../components/MiddlePanel";
import FavJokes from "../components/FavJokes";


type Props = {
  data: {
    jokeCategories: string[],
    randomJoke : {
      value: string,
      url: string
    }
  }
}

export default function Home({data}: Props) {

  const [categoriesArray, setCategories] = useState<string[]>([]);
  const [joke, setJoke] = useState<string>("");
  const [jokeUrl, setJokeUrl] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(true);
  const [items, setItems] = useState<Item[]>([]);
  const { data: session, status } = useSession();
  const [fetchedNew, setFetchedNew] = useState<Boolean>(false)
    
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
    })
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
    })
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
    })
  }

  useEffect(() => {
    setCategories(data.jokeCategories)
    setJoke(data.randomJoke.value);
    setJokeUrl(data.randomJoke.url);
    setLoading(false)        
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(status === "authenticated"){
      setFetchedNew(true)
    }
  },[status])

  return (
    <>
    <Head>
      <title>Chuck Norris Jokes App</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="description" content="App for funny jokes" />
      <meta name="keywords" content="Chuck Norris" />
    </Head>
    <div className="flex mx-auto px-4 bg-gray-400 h-screen">
      <Categories categoriesArray={categoriesArray} getJokeFromCategory={getJokeFromCategory}/>
      <MiddlePanel joke={joke} jokeUrl={jokeUrl} getRandomJoke={getRandomJoke} setLoading={setLoading} setFetchedNew={setFetchedNew}/>
      {status === "authenticated"
      ? <FavJokes loading={loading} setLoading={setLoading} getFavJoke={getFavJoke} items={items} setItems={setItems} fetchedNew={fetchedNew} setFetchedNew={setFetchedNew}/>
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

export async function getServerSideProps() {
  const res = await fetch('https://api.chucknorris.io/jokes/categories')
  const jokeCategories = await res.json()
  const res2 = await fetch('https://api.chucknorris.io/jokes/random')
  const randomJoke = await res2.json()
    
  return {
    props: {data: {
      jokeCategories,
      randomJoke
    }}, // will be passed to the page component as props
  }
}