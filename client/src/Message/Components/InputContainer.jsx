import React,{useState} from 'react'

const InputContainer = ({handleSend}) => {
  const sendImg = 'https://cdn-icons-png.flaticon.com/512/60/60525.png'
  const [inputMessage, setInputMessage]  = useState('')
  // console.log('inputMessage', inputMessage)

  const handleClickSend = ()=>{
    if(inputMessage == '')
      alert('please enter a message')
    else
    handleSend(inputMessage)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClickSend();
      setInputMessage('')
    }
  };

  return (
    <div className='flex h-[60px] items-center py-4 px-2 abolute top-0 relative'>
      <div className='flex flex-1 h-[40px]'>
        <input type='text' className='flex flex-1 rounded-full outline-none px-1 pl-4 pr-[50px]'
         value={inputMessage} 
         onChange={()=>setInputMessage(event.target.value)}
         onKeyPress={handleKeyPress}
         >
        </input>
      </div>
      <div className='flex  w-[40px] pl-1 absolute right-2' onClick={handleClickSend}>
        <img src={sendImg} alt="" className='h-[20px]' />
      </div>
    </div>
  )
}

export default InputContainer
