import { useState } from 'react'

const StarRating = () => {

  const [rating, setRating] = useState<number>(0)
  return (
    <div className='container'>
      <h1>Star Rating</h1>

      <div >
        {
          [1, 2, 3, 4, 5].map((star: number) => {
            return (
              <span
                key={star}
                className='rating'
                style={{
                  color: star <= rating ? 'gold' : 'gray'
                }}
                onClick={() => setRating(star)}>★</span>
            )
          })
        }
      </div>
      <p>Current Rating: {rating}</p>
      <button style={{
        padding: '5px',
        fontWeight: 'bold'
      }}
        onClick={() => setRating(0)}
      >Reset Rating</button>
    </div>
  )
}

export default StarRating