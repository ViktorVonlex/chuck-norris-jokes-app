import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

type Props = {
    categoriesArray: string[],
    getJokeFromCategory: Function
}

function Categories({categoriesArray, getJokeFromCategory}: Props) {  
    
  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white">
        <div className="pb-4 pt-4 text-center">Joke Categories</div>
        {
            categoriesArray.map(category => <CategoryCard key={category} name={category} getJokeFromCategory={getJokeFromCategory}/>)
        }
    </div>   
  )
}

export default Categories