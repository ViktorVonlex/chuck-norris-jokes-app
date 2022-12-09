import React from 'react'

type Props = {
    name: string
}

function CategoryCard({name}: Props) {
  return (
    <div className="category-entry">
        <div className="text-center py-2">{name}</div>
    </div>
  )
}

export default CategoryCard