import React from 'react'

const MyMessage = ({message}) => {
  return (
    <div className='flex flex-1 min-h-[30px] min-w-[80px] max-w-[270px] p-2 self-end bg-slate-300 rounded-md mb-2'>
      <h2>{message}</h2>
    </div>
  )
}

export default MyMessage
