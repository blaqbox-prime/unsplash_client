import React from 'react'

function Title({title, className=""}) {
  return (
    <h1 className={`title text-5xl text-center ${className}`}>
      {title}
    </h1>
  )
}

export default Title
