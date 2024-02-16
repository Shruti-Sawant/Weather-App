import React from 'react'

function tempDisplayComponents({weather,time}) {
  return (
    <div>
         <p className='font-light'>
                   {weather}<span className='font-medium ml-1'>{time}</span>
                </p>
                <p className='font-light'>|</p>
    </div>
  )
}

export default tempDisplayComponents
