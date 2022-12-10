import React from 'react'

type Props = {
    name: string,
    getJokeFromCategory: Function
}

function CategoryCard({name, getJokeFromCategory}: Props) {

  return (
    <div className="category-entry" onClick={() => getJokeFromCategory(name)}>
        <div className="text-center py-2">{name}</div>
    </div>
  )
}

export default CategoryCard