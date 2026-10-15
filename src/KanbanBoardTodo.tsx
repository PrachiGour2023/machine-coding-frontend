import { useState } from 'react'
const columns = ["todo", "in-progress", "completed"];

interface TodoProps {
  id: number;
  title: string;
  status: string;
}

const KanbanBoardTodo = () => {
  const [text, setText] = useState<string>('');
  const [todoList, setTodoList] = useState<TodoProps[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>('')

  const handleAddTask = () => {
    if (!text.trim()) return;
    setTodoList([...todoList, {
      id: Date.now(),
      title: text,
      status: 'todo'
    }])
    setText('')
  }

  const moveTask = (id: number, direction: string) => {
    setTodoList(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          const currentIndex = columns.indexOf(todo.status)
          const newIndex = direction === 'right' ? currentIndex + 1 : currentIndex - 1
          return { ...todo, status: columns[newIndex] }
        }
        return todo;
      })
    )
  }

  const saveTitle = (id: number) => {
    setTodoList(prev =>
      prev.map(todo => todo.id === id ? { ...todo, title: editingTitle } : todo)
    )
    setEditingIndex(null)
    setEditingTitle('')
  }

  const deleteItem = (id: number) => {
    setTodoList(prev =>
      prev.filter(item => item.id !== id)
    )
  }

  return (
    <div className='container'>
      <h2>Kanban Board</h2>

      <div>
        <div>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div className='todo-container'>
          {
            columns.map(col => {
              return (
                <div className='todo-block' key={col}>
                  <h4>{col.replace("-", " ").toUpperCase()}</h4>
                  {
                    todoList
                      .filter(todo => todo.status === col)
                      .map(todo => {
                        return (
                          <div key={todo.id}>
                            {
                              editingIndex === todo.id ? (
                                <input
                                  type="text"
                                  value={editingTitle}
                                  onChange={(e) => setEditingTitle(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      saveTitle(todo.id)
                                    }
                                  }}
                                />
                              ) : (
                                <p>{todo.title}</p>
                              )
                            }
                            <div>
                              {
                                col !== 'todo' && (
                                  <button onClick={() => moveTask(todo.id, 'left')}>←</button>
                                )
                              }
                              {
                                col !== 'completed' && (
                                  <button onClick={() => moveTask(todo.id, 'right')}>→</button>
                                )
                              }
                              <button onClick={() => {
                                setEditingTitle(todo.title)
                                setEditingIndex(todo.id)
                              }}>Edit</button>
                              <button onClick={() => deleteItem(todo.id)}>Delete</button>
                            </div>


                          </div>
                        )
                      })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default KanbanBoardTodo;