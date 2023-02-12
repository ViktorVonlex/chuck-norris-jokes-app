import React from 'react'

type Props = {
    name: string,
    getJokeFromCategory: Function
}

function CategoryCard({name, getJokeFromCategory}: Props) {

  return (
    <button className="category-entry block" onClick={() => getJokeFromCategory(name)}>
        <div className="text-center py-2">{name}</div>
    </button>
  )
}

export default CategoryCard