import React from 'react'

type Props = {
    jokeNumber: number,
    jokeUrl: string,
    getFavJoke: Function
}

function FavJoke({jokeNumber, jokeUrl, getFavJoke}: Props) {
  return (
    <div className="category-entry" onClick={() => getFavJoke(jokeUrl)}>
        <div className="text-center py-2">{jokeNumber}</div>
    </div>
  )
}

export default FavJoke