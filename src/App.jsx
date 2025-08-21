import { useState, useEffect } from 'react'
import './App.css'
import TaskGroups from './components/TaskGroups'
import TaskDetails from './components/TaskDetails'
import Calendar from './components/Calendar'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedGroup, setSelectedGroup] = useState(null)
  
  const loadTasks = () => {
    const savedTasks = localStorage.getItem('todo-tasks')
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks)
      return parsedTasks.map(task => ({
        ...task,
        date: new Date(task.date)
      }))
    }
    return []
  }

  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks))
  }, [tasks])

  const [groups] = useState([
    { id: 1, name: "Estudos", color: "#3B82F6", taskCount: 0 },
    { id: 2, name: "Trabalho", color: "#10B981", taskCount: 0 },
    { id: 3, name: "Treino", color: "#F59E0B", taskCount: 0 }
  ])

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'pending' }])
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const clearAllData = () => {
    if (window.confirm('Tem certeza que deseja apagar todas as tarefas? Esta ação não pode ser desfeita.')) {
      setTasks([])
      localStorage.removeItem('todo-tasks')
    }
  }

  const updateGroupCounts = () => {
    return groups.map(group => ({
      ...group,
      taskCount: tasks.filter(task => task.group === group.name).length
    }))
  }

  const groupsWithRealCounts = updateGroupCounts()

  const getStartOfWeek = (date) => {
    const start = new Date(date)
    const day = start.getDay()
    const diff = start.getDate() - day + (day === 0 ? -6 : 1)
    start.setDate(diff)
    start.setHours(0, 0, 0, 0)
    return start
  }

  const getEndOfWeek = (date) => {
    const end = new Date(date)
    const day = end.getDay()
    const diff = end.getDate() - day + (day === 0 ? 0 : 7)
    end.setDate(diff)
    end.setHours(23, 59, 59, 999)
    return end
  }

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.date)
    const startOfWeek = getStartOfWeek(selectedDate)
    const endOfWeek = getEndOfWeek(selectedDate)
    return taskDate >= startOfWeek && taskDate <= endOfWeek
  })

  return (
    <div className="app">
      <div className="container">
        <div className="sidebar">
          <TaskGroups 
            groups={groupsWithRealCounts}
            selectedGroup={selectedGroup}
            onSelectGroup={setSelectedGroup}
            onAddTaskToGroup={addTask}
          />
        </div>

        <div className="main-content">
          <TaskDetails 
            tasks={filteredTasks}
            selectedGroup={selectedGroup}
            onDeleteTask={deleteTask}
            onAddTask={addTask}
            onClearAll={clearAllData}
            onUpdateTaskStatus={updateTaskStatus}
          />
        </div>

        <div className="calendar-sidebar">
          <Calendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  )
}

export default App