import { useState } from 'react'

const TOTAL = 9;
const GRID_SIZE = 3;

const GridLight = () => {

  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState<number[]>([])
  const [isDeactivating, setIsDeactivating] = useState<boolean>(false)  

  const handleClick = (i: number) => {
    const updateSet = new Set(activeCells);
    
    updateSet.add(i)

    const updateOrder = [...activationOrder, i]
    
    setActiveCells(updateSet)
    setActivationOrder(updateOrder)

    if (updateSet.size === TOTAL) {
      setTimeout(() => {
        startReverseDeactivation(updateOrder)
      }, 500);
    }
  }

  const startReverseDeactivation = (order: number[]) => {
     setIsDeactivating(true)
     const reverse = [...order].reverse();

     reverse.forEach((cellIndex, i) => {
       setTimeout(() => {
          setActiveCells(prev => {
             const copy = new Set(prev);
             copy.delete(cellIndex);
             return copy;
          })

          if (i === reverse.length - 1) {
            setTimeout(() => {
              setIsDeactivating(false)
              setActivationOrder([])
            }, 100);
          }
       }, i * 300);
     })
  }

  const resetGrid = () => {
    setActiveCells(new Set());
    setActivationOrder([])
    setIsDeactivating(false)
  }

  return (
    <div className='container'>
       <h2>Grid Lights</h2>

       <button onClick={resetGrid}>Reset Grid</button>

       <div className='grid'>
        {
          Array.from({ length: GRID_SIZE}, (_, rowIndex) => (
            <div className='grid-container' key={rowIndex}>
              {
                Array.from({ length: GRID_SIZE}, (_, colIndex) => {
                  const index = rowIndex * GRID_SIZE + colIndex
                  return (
                    <div 
                    className={`col ${activeCells.has(index) ? 'active' : ''}`} 
                    key={index} 
                    onClick={() => handleClick(index)}></div>
                  )
                })
              }
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default GridLight