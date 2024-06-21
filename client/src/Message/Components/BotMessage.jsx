import React from 'react'

const BotMessage = ({message}) => {
  return (
    <div className='min-h-[30px] min-w-[80px] max-w-[270px] p-2 bg-slate-600 rounded-md mb-2'>
      <h2>{message}</h2>
    </div>
  )
}

export default BotMessage
