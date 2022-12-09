import React from 'react'
import CategoryCard from './CategoryCard'

function Categories() {
  return (
    <div className="bg-gray-900 h-screen w-64 m-0 fixed top-4 left-4 text-white">
        <div className="pb-4 pt-4 text-center">Joke Categories</div>
        <CategoryCard name='Mother' />
        <CategoryCard name='Dad' />
        <CategoryCard name='Food' />
    </div>   
  )
}

export default Categories