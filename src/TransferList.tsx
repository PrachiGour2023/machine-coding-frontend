import { useState } from 'react';

interface DataState {
  id: number;
  title: string;
  status: string;
  isChecked: boolean;
}

const items = [
  { id: 1, title: 'Item A', status: 'available', isChecked: false },
  { id: 2, title: 'Item B', status: 'available', isChecked: false },
  { id: 3, title: 'Item C', status: 'available', isChecked: false }
]

const TransferList = () => {

  const [data, setData] = useState<DataState[]>(items)

  const handleCheckedItem = (id: number, checked: string) => {
    setData(prev =>
      prev.map(item => item.id === id ? { ...item, isChecked: Boolean(checked) } : item)
    )
  }

  const moveItemSelection = () => {
    setData(prev =>
      prev.map(item => item.isChecked ? { ...item, status: 'selected', isChecked: false } : item)
    )
  }

  const moveItemAvailable = () => {
    setData(prev =>
      prev.map(item => item.isChecked ? { ...item, status: 'available', isChecked: false } : item)
    )
  }

  console.log(data);
  

  return (
    <div>
      <div className='header'>

        <div>
          <h3>Available</h3>
          {
            data.map(item => {
              return item.status === "available" && (
                <div key={item.id}>
                  <input type='checkbox' checked={item.isChecked} onChange={(e) => handleCheckedItem(item.id, e.target.value)} />
                  <span>{item.title}</span>
                </div>
              )
            })
          }
        </div>

        <div>
          <button onClick={moveItemAvailable}>←</button>
          <button onClick={moveItemSelection}>→</button>
        </div>

        <div>
          <h3>Selected</h3>
          {
            data.map(item => {
              return item.status === "selected" && (
                <div key={item.id}>
                  <input type='checkbox' checked={item.isChecked} onChange={(e) => handleCheckedItem(item.id, e.target.value)} />
                  <span>{item.title}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default TransferList