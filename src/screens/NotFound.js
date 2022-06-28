import React from 'react'
import graphics from '../images/404.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <img src={graphics} alt="404 Page Not Found" className="mx-auto d-block" />
      <Link to='/' style={{"text-decoration": "none"}}>
        <button className='btn btn-outline-info mt-4 mx-auto d-block'>Back to Home</button>
      </Link>
    </>
  )
}

export default NotFound
