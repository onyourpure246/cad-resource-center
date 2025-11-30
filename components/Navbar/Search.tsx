import React from 'react'
import { Input } from '../ui/input'

const Search = ({placeholder}: {placeholder?:string}) => {

  return (
    <Input
      type="text"
      id='search'
      name='search'
      placeholder={placeholder}
      className='max-w-xs  placeholder:font-semi-bold' />
  )
}

export default Search