import Categories from "../components/Categories";
import MiddlePanel from "../components/MiddlePanel";
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [categoriesArray, setCategories] = useState<string[]>([])
  const [joke, setJoke] = useState<string>("")
  const [jokeUrl, setJokeUrl] = useState<string>("")

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
    }, [])
    
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

  return (
    <>
    <div className="flex mx-auto px-4 bg-gray-400 h-screen">
      <Categories categoriesArray={categoriesArray} getJokeFromCategory={getJokeFromCategory}/>
      <MiddlePanel joke={joke} jokeUrl={jokeUrl} getRandomJoke={getRandomJoke}/>
      <div className="w-1/6 bg-gray-900 mt-5">dasdasda</div>
    </div>
    </>
  )
}
