import React from 'react'

const BackToTop = () => {

  const data = Array.from({length: 40}, (_, i) => i)
  return (
    <div>
      {
        data.map((item) => {
            return (
                <p>This is a paragraph{item}</p>
            )
        })
      }
    </div>
  )
}

export default BackToTop