import React from 'react'

function WeatherForcast({time,temp}) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <p className='font-light  text-sm'>
         {time}
        </p>
        {/* <img src="http://openweathermap.org/img/wn/01d@2x.png" */}
          alt=""
          className='w-12 my-1' />
        <p className='font-medium'>{temp}</p>
      </div>
    </div>
  )
}

export default WeatherForcast