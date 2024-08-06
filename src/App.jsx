import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
 
  const [length,setLength] = useState(8)
  const[numberAllowed,setNumber] = useState(false) 
  const[characterAllowed,setcharacter] = useState(false) 
  const[Password,setPassword] = useState("")
  const passwordref=useRef(null)
  const passwordGenerator =useCallback(() =>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str+="0123456789"
    if (characterAllowed) str+="!@#$%&*(){}?+="
    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    } 
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])
  const copycode=useCallback(()=>{
    window.navigator.clipboard.writeText(Password)
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,length)
  },[Password])
  useEffect(() =>{
    passwordGenerator()
  },[length,numberAllowed,characterAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg
    px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <div className='flex shadow rounded-lg
      overflow-hidden mb-4'>
        <input type='text' 
        value={Password}
        className='outline-none w-full py-1 px-3' 
        placeholder='password'
        ref={passwordref}
        />
        <button className="outline-none bg-blue-700 text-white px-3
       py-0.5 shrink-0" onClick={copycode}>copy</button>
      </div>
      <div className=' flex text-sm gap-x-2'>
      <div className=' flex items-center gap-x-3'>
        <input type="range" min={6}
        max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e) =>{
          setLength(e.target.value)
         }}
         />
         <label>length:{length}</label>
         </div>
         <div className='flex items-center gap-x-3'>
          <input type='checkbox' 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={() => {
           setNumber((prev) =>!prev)
          }}
          />
          <label>Numbers</label>
         </div>
         <div className='flex items-center gap-x-3'>
          <input type='checkbox' 
          defaultChecked={characterAllowed}
          id='characterInput'
          onChange={() => {
           setcharacter((prev) => !prev)
          }}
          />
          <label>characters</label>
         </div>
      </div>
      </div>
    </>
  )
}

export default App
