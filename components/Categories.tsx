import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

function Categories() {
    
    const [categoriesArray, setCategories] = useState<string[]>([])

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
    }, [])    
    
  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl w-1/6 mt-5 h-min text-white">
        <div className="pb-4 pt-4 text-center">Joke Categories</div>
        {
            categoriesArray.map(category => <CategoryCard key={category} name={category}/>)
        }
    </div>   
  )
}

export default Categories