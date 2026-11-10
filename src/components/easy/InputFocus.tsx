import { useRef } from 'react'

const InputFocus = () => {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputFocus = () => {
     inputRef.current.focus();
  }

  return (
    <div className='container'>
        <input ref={inputRef} placeholder='Type here' />
        <button onClick={handleInputFocus}>Focus Input</button>
    </div>
  )
}

export default InputFocus