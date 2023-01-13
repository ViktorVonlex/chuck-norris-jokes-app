import { Prisma } from '@prisma/client';
import React, { useEffect, useState } from 'react'
import { Item } from '../utils/utils';

type Props = {
    joke: string,
    jokeUrl: string,
    counter: number,
    items: Item[],
    getRandomJoke: Function,
    setCounter: Function,
    setLoading: Function,
    setItems: Function
}

function MiddlePanel({joke, jokeUrl, counter, getRandomJoke, setCounter, setLoading, items, setItems}: Props) {

  let jokeInfo:Item = {
    jokeNumber: counter,
    jokeUrl: jokeUrl
  }

  useEffect(()=>{
    setCounter(localStorage.length)
  },[])

  function betterSaveJoke(object:Item, items:Item[]) {
    if(!checkItems(object,items)) {
      const jokes:Item[] = []
      console.log(items)
      for (var i:number = 0; i<localStorage.length+1; i++) {
        const correctNumber: number = i+1
        const joke = localStorage.getItem(correctNumber.toString())
        console.log(joke)
        console.log(i)
        if (joke !== null){
          jokes.push(JSON.parse(joke))
          console.log(joke)
        }
        else if(joke === null){
          console.log("Some BS here") 
        }
      }
      if(jokes.length==0){
        const helpingObject:Item = {
          jokeNumber: 1,
          jokeUrl: object.jokeUrl
        }
        localStorage.setItem("1", JSON.stringify(helpingObject))
        console.log("first saved joke")
        console.log(helpingObject)
        setItems(jokes)
        setLoading(true)
      }
      else {
        const lastSavedJokeNumber = jokes[jokes.length-1]
        const tpc = lastSavedJokeNumber.jokeNumber
        const helpingObject:Item = {
          jokeNumber: tpc+1,
          jokeUrl: object.jokeUrl
        }
        localStorage.setItem(helpingObject.jokeNumber.toString(), JSON.stringify(helpingObject))
        jokes.push(helpingObject)
        setItems(jokes)
        setLoading(true)
        }
      } else {
        console.log("same object")
      }
    }

  function checkItems(object:Item, items:Item[]):boolean {
    let passedItem:Item = {jokeNumber: 999, jokeUrl: "nothing to see here"};
    items.forEach(element => {
      if (element.jokeUrl == object.jokeUrl){
        passedItem = element;
      }
    });
    if(passedItem.jokeUrl == object.jokeUrl){
      return true
    } else {
    return false
    }
  }

  return (
    <div className="mx-auto text-white w-1/2">
        <div className="bg-gray-900 text-7xl p-10 rounded-3xl mt-5 text-center">Chuck Norris jokes App</div>
        <div className="flex text-center mt-5">
            <div className="w-2/3 mr-1 middle-button p-4" onClick={() => getRandomJoke()}>Get random joke!</div>
            <div className="w-1/3 ml-1 middle-button p-4" onClick={() => {
              //saveJoke(jokeInfo, items)
              betterSaveJoke(jokeInfo,items)
            }}>Save this joke</div>
        </div>
        <div className="w-full bg-gray-900 mt-5 pt-4 rounded-3xl">
            <div className="text-center text-white text-5xl mb-5">The Joke</div>
            <div className="text-center bg-gray-800 w-full text-green-600 text-2xl rounded-b-3xl p-9 pb-10 pt-10">{joke}</div>
        </div>
    </div>
  )
}

export default MiddlePanel