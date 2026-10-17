import React, { useState } from "react";

const initialData: BoardProp = {
  "todo": [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" }
  ],
  "in progress": [
    { id: "task-3", label: "Task 3" }
  ],
  "done": [
    { id: "task-4", label: "Task 4" }
  ]
};

const columnList = ['todo', 'in progress', 'done'] as const

interface ColumnProp {
  id: string;
  label: string;
}

interface BoardProp {
  [key: string]: ColumnProp[];
  todo: ColumnProp[];
  "in progress": ColumnProp[];
  done: ColumnProp[];
}

function KanbanBoard() {

  const [columns, setColumns] = useState<BoardProp>(initialData)
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false)
  const [task, setTask] = useState<string>('')
  const [draggedTask, setDraggedTask] = useState<ColumnProp | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState<string>('')

  const dragStart = (task: ColumnProp) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleDrop = (columnId: string) => {
    if (!draggedTask) return;

    setColumns((prevCol: BoardProp): BoardProp => {
      const newCol: BoardProp = { ...prevCol }

      for (const col in newCol) {
        newCol[col] = newCol[col].filter((item: ColumnProp) => item !== draggedTask)
      }

      newCol[columnId].push(draggedTask)
      return newCol;
    })
  }

  const handleAddTask = (e: React.KeyboardEvent<HTMLInputElement>, col: keyof BoardProp) => {
    if (e.key === "Enter") {
      let newTask = {
        id: `task-${Date.now()}`,
        label: task.trim()
      }

      setColumns((prev: BoardProp) => ({
        ...prev,
        [col]: [...prev[col], newTask]
      }))

      setTask('')
      setIsAddingTask(false)
    }
  }

  const handleDeleteTask = (task: ColumnProp) => {
    setColumns((prevColumn) => {
      const newColumn: BoardProp = { ...prevColumn }

      for (const col in newColumn) {
        newColumn[col] = newColumn[col].filter((item: ColumnProp) => item != task)
      }

      return newColumn
    })
  }

  const saveEditTitle = (taskId: string) => {
    setColumns(prevCol => {
       const update: BoardProp = {...prevCol}

       for(let key in update){
         update[key] = update[key].map((item: ColumnProp) => 
           item.id === taskId ? {...item, label: editingTitle} : item
         )
       }

       return update;
    })

    setEditingId(null)
    setEditingTitle('')
  }

  return (
    <div>
      <h2 className="heading">Drag & Drop</h2>
      <div className="container">
        {
          columnList.map((col) => {
            return (
              <div className="column"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(col)}
              >
                <h3>
                  {
                    col === "todo" ? "To Do" : col === "in progress" ? "In Progress" : "Done"
                  }
                </h3>
                {
                  columns[col].map((item: ColumnProp) => {
                    return (
                      <div
                        key={item.id}
                        className="task-container"
                        draggable
                        onDragStart={() => dragStart(item)}

                      >
                        {
                          editingId === item.id ? (
                            <input type="text"
                              value={editingTitle}
                              onChange={(e) => setEditingTitle(e.target.value)}
                              className="input" 
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  saveEditTitle(editingId)
                                }
                              }}
                            />
                          ) : (
                            <>
                              <p className="record" onClick={() => {
                                setEditingId(item.id)
                                setEditingTitle(item.label)
                              }}>{item?.label}</p>
                              <span onClick={() => handleDeleteTask(item)}>🗑️</span>
                            </>
                          )
                        }

                      </div>
                    )
                  })
                }
                {
                  col === "todo" && (
                    <div>
                      {
                        isAddingTask ? (
                          <input type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            onKeyDown={(e) => handleAddTask(e, col)}
                            placeholder="Enter new task..."
                            className="input" />
                        ) : <button className="add-task" onClick={() => setIsAddingTask(true)}>+ Add a task</button>
                      }
                    </div>

                  )
                }
              </div>
            )
          })
        }
      </div>

    </div >
  );
}

export default KanbanBoard;