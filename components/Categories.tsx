import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

function Categories() {
    const [categoriesArray, setCategories] = useState([])

    useEffect(() => {
        axios.get('https://api.chucknorris.io/jokes/categories')
        .then(res => {
            setCategories(res.data)
        })
        .catch(err => {
            console.log(err)
        }
        )
    }, []) 

    interface Category {
        name: string
    }

    let categories: Category[] = [];

    categoriesArray.forEach(element => {
        const objekt:Category = {
            name: element
        }
        categories.push(objekt)
    });
    
  return (
    <div className="bg-gray-900 h-screen w-64 m-0 fixed top-4 left-4 text-white">
        <div className="pb-4 pt-4 text-center">Joke Categories</div>
        {
            categories.map(category => <CategoryCard key={category.name} name={category.name}/>)
        }
    </div>   
  )
}

export default Categories