import { useState } from 'react'


interface ExpenseData {
  id: number;
  title: string;
  amount: number;
  type: string;
}

const ExpenseTracker = () => {

  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<string>('income');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('')
  const [expenseList, setExpenseList] = useState<ExpenseData[]>([])

  const handleFormOpen = () => {
    setIsOpen(!isOpen)
  }

  const AddTransaction = () => {
    const data = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type
    }
    setExpenseList([...expenseList, data])
    setAmount('')
    setTitle('')
    setType('')
  }

  const total_income = expenseList.reduce((acc: number, curr: ExpenseData) => {
    if (curr.type === "income") {
      acc = acc + curr.amount
    }
    return acc
  }, 0)

  const total_expense = expenseList.reduce((acc: number, curr: ExpenseData) => {
    if (curr.type === "expense") {
      acc = acc + curr.amount
    }
    return acc
  }, 0)

  const total_balance = total_income - total_expense

  const removeExpenseItems = (id: number) => {
    setExpenseList(prev =>
      prev.filter(item => item.id != id)
    )
  }

  const filteredTransaction = expenseList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))


  return (
    <div className='container'>
      <h2>Expense Tracker</h2>
      <div className='section'>
        <div className='header'>
          <span>Balance: ₹{total_balance}</span>
          <button onClick={handleFormOpen}>{isOpen ? 'Close Form' : 'Open Form'}</button>
        </div>

        {isOpen && <div className='form'>
          <input
            type="text"
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="number"
            min={0}
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className='transaction-btn' onClick={AddTransaction}>Add Transaction</button>
        </div>}

        <div className='display-details'>
          <span>Income: ₹{total_income}</span>
          <span>Expense: ₹{total_expense}</span>
        </div>

        <input type="text" placeholder='Search' className='search' value={search} onChange={(e) => setSearch(e.target.value)} />

        <div>
          {
            filteredTransaction.length === 0 ? (
              <span className='not-found'>No Transection Found</span>
            ) : (
              filteredTransaction.map((item) => {
                return (
                  <div key={item.id} className='records' style={{
                    borderLeft: item.type === 'income' ? "5px solid green" : "5px solid red"
                  }}>
                    <span>{item.title}: ₹{item.amount}</span>
                    <button onClick={() => removeExpenseItems(item.id)}>Remove</button>
                  </div>
                )
              })
            )
          }
        </div>

      </div>
    </div>
  )
}

export default ExpenseTracker