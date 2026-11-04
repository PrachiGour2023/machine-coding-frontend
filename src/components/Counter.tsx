import { useState } from 'react'

const Counter = () => {

  const [count, setCount] = useState<number>(0);

  return (
    <div>
       <h2>React Counter App</h2>
       <h3>Counter: {count}</h3>
       <div>
        <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
       </div>
    </div>
  )
}

export default Counter