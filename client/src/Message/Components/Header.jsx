import React from 'react'

const Header = () => {
  const botImage = 'https://thumbs.dreamstime.com/z/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-124978455.jpg'
  return (
    <div className='flex bg-slate-500 w-[100%] h-16 relative '>
      <div className='flex w-[70px] items-center justify-center'>
        
        <div  className='h-[50px] w-[50px] rounded-full overflow-hidden'>
          <img src={botImage}></img>
        </div>
      </div>
      <div className='flex items-center'>
        <h1 className='text-white font-bold'>SYKBOT</h1>
        {/* <h1 className='text-white font-thin ml-2 text-[10px]'>Typing...</h1> */}
      </div>
    </div>
  )
}

export default Header
