import React from 'react'

type Props = {}

export default function MiddlePanel({}: Props) {
  return (
    <div className="mx-auto text-white w-1/2">
        <div className="bg-gray-900 text-7xl p-10 rounded-3xl mt-5 text-center">Chuck Norris jokes App</div>
        <div className="flex text-center mt-5">
            <div className="w-2/3 mr-1 middle-button p-4">Get random joke!</div>
            <div className="w-1/3 ml-1 middle-button p-4">Save this joke</div>
        </div>
        <div className="w-full bg-gray-900 mt-5 p-4 rounded-3xl">
            <div className="text-center text-white text-5xl mb-5">The Joke</div>
            <div className="text-center bg-gray-800 w-full text-green-600 text-2xl rounded-3xl p-2">Chuck Norris's football team won the NBA champinship against the tennis player Roger Federer</div>
        </div>
    </div>
  )
}