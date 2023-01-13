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
    setLoading: Function
}

function MiddlePanel({joke, jokeUrl, counter, getRandomJoke, setCounter, setLoading, items}: Props) {

  let jokeInfo:Item = {
    jokeNumber: counter,
    jokeUrl: jokeUrl
  }


  useEffect(()=>{
    setCounter(localStorage.length)
  },[])

  function saveJoke (object:Item, items:Item[]) {
    if(!checkItems(object,items)) {
      let helpingNumber: number = counter+1
      if(localStorage.getItem(helpingNumber.toString()) !== null) {
        let lastIndex = localStorage.length
        object.jokeNumber = helpingNumber
        helpingNumber = helpingNumber+1;
        localStorage.setItem(lastIndex.toString(), JSON.stringify(object));
      }
      localStorage.setItem(helpingNumber.toString(), JSON.stringify(object));
      setLoading(true)
      setCounter(counter+1)
    }
  }

  function betterSaveJoke(object:Item, items:Item[]) {
    if(!checkItems(object,items)) {
      if(localStorage.length == 0){
        console.log("inside first if")
        let helpingObject:Item = {
          jokeNumber: 1,
          jokeUrl: object.jokeUrl
        }
        localStorage.setItem("1", JSON.stringify(helpingObject));
        setLoading(true)
        setCounter(counter+1)
      }
      else if(localStorage.length >= 1) {
        console.log("inside second if")
        //@ts-ignore
        let lastSavedJoke: Item = JSON.parse(localStorage.getItem(localStorage.length))
        const helpingNumber: number = lastSavedJoke.jokeNumber+1
        let helpingObject:Item = {
          jokeNumber: helpingNumber,
          jokeUrl: object.jokeUrl
        }
        localStorage.setItem(helpingNumber.toString(), JSON.stringify(helpingObject));
        console.log(counter)
        console.log(helpingNumber)
        console.log(localStorage.length)
        setLoading(true)
        setCounter(counter+1)
      }
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