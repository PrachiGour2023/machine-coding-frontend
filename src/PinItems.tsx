import { useState } from 'react'

interface ItemState {
  id: number;
  text: string;
  pinned: boolean;
}

const item = [
  { id: 1, text: "Buy groceries", pinned: false },
  { id: 2, text: "Call Alice", pinned: false },
  { id: 3, text: "Meeting with Bob", pinned: false },
  { id: 4, text: "Pay electricity bill", pinned: false },
  { id: 5, text: "Read a book", pinned: false },
  { id: 6, text: "Go for a walk", pinned: false },
  { id: 7, text: "Fix bug #234", pinned: false },
  { id: 8, text: "Review pull requests", pinned: false },
]
const PinItems = () => {

  const [items, setItems] = useState<ItemState[]>(item)

  const handleSelectItem = (id: number, value: boolean) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, pinned: value } : item)
    )
  }

  const sortedItem = [
    ...items.filter(item => item.pinned),
    ...items.filter(item => !item.pinned)
  ]

  return (
    <div className='main-container'>
      <h3>Pin Items To Top</h3>

      <div className='item-box'>
        {
          sortedItem.map(item => {
            return (
              <div key={item.id} className={`item ${item.pinned ? 'active' : ''}`}>
                <input type="checkbox" checked={item.pinned} onChange={(e) => handleSelectItem(item.id, e.target.checked)} />
                <span>{item.text}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PinItems