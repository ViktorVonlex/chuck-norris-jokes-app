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
    <div className="bg-gray-900 rounded-3xl h-screen shadow-2xl w-64 m-0 fixed top-4 left-4 text-white">
        <div className="pb-4 pt-4 text-center">Joke Categories</div>
        {
            categoriesArray.map(category => <CategoryCard key={category} name={category}/>)
        }
    </div>   
  )
}

export default Categories