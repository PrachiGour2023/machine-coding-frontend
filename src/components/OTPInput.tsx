import React, { useRef, useState } from 'react'

const length = 4;
const OTPInput = () => {

  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if(!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < length - 1){
        inputRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
        if (otp[index] === "" && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    }
  }

  return (
    <div>
        <h2>OTP Component</h2>
        <div>
        {
            otp.map((otp, index) => {
                return (
                    <input 
                    key={index}
                    className='otp-input' 
                    ref={(el) => {
                        inputRef.current[index] = el
                    }} 
                    maxLength={1}
                    value={otp}  
                    onChange={(e) => handleChangeOtp(e, index)}
                    onKeyDown={(e) => {
                         handleKeyDown(e , index)
                    }}
                    />
                )
            })
        }
        </div>
    </div>
  )
}

export default OTPInput