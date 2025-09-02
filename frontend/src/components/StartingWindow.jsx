import React from 'react'
import './StartingWindow.css'
import {Link} from 'react-router-dom'
import { FaGithub } from "react-icons/fa";

function StartingWindow() {
  return (
    <div className='starting-container'>
        <div className='starting-navbar'>
            <div><FaGithub /> GitHub</div>
            <Link to="/signup" className='signup-link'>Signup Now</Link>
        </div>
        <div className='hero-section'>
            <Link to="/signup" className='get-started'>Get Started </Link>
        </div>
    </div>
  )
}

export default StartingWindow