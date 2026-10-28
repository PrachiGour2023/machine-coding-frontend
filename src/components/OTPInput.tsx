import React, { useRef, useState } from 'react'


const length = 4;
const OTPInput = () => {

  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRef = useRef<any>([])

  console.log(inputRef);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
     const value = e.target.value;
     if(!/^\d*$/.test(value)) return;

     const newOtp = [...otp];
     newOtp[index] = value;
     setOtp(newOtp);

     if (value && index < length - 1) {
        inputRef.current[index + 1].focus();
     }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
     if (e.key === "Backspace") {
        if (otp[index] === "" && index > 0) {
            inputRef.current[index - 1].focus()
        }
     }
  }

  return (
    <div>
        {otp.map((digit, index) => {
            return (
                <input 
                key={index}
                ref={(el) => (inputRef.current[index] = el)} 
                value={digit} 
                maxLength={1}
                className='otp-input'
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                />
            )
        })}
    </div>
  )
}

export default OTPInput