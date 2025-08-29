import { useState } from 'react'
import './App.css'
import TaskGroups from './components/TaskGroups'
import TaskDetails from './components/TaskDetails'
import Calendar from './components/Calendar'
import ErrorBanner from './components/ErrorBanner'
import LoadingSpinner from './components/LoadingSpinner'
import { useTasks } from './hooks/useTasks'
import { useGroups } from './hooks/useGroups'
import { useDateSelection } from './hooks/useDateSelection'

function App() {
  const [selectedGroup, setSelectedGroup] = useState(null)
  
  // Hooks personalizados
  const { 
    tasks, 
    loading, 
    error, 
    addTask, 
    updateTaskStatus, 
    deleteTask, 
    clearAllTasks 
  } = useTasks()
  
  const { 
    loading: groupsLoading, 
    addGroup, 
    updateGroup, 
    deleteGroup, 
    updateGroupCounts 
  } = useGroups()
  
  const { 
    selectedDate, 
    setSelectedDate, 
    filterTasksByWeek 
  } = useDateSelection()

  // Filtrar tarefas por semana e grupo selecionado
  const filteredTasks = filterTasksByWeek(tasks, selectedDate)
  const groupsWithRealCounts = updateGroupCounts(tasks)

  return (
    <div className="app">
      <ErrorBanner error={error} />
      
      {loading ? (
        <LoadingSpinner message="Carregando tarefas..." />
      ) : (
        <div className="container">
          <div className="sidebar">
            <TaskGroups 
              groups={groupsWithRealCounts}
              selectedGroup={selectedGroup}
              onSelectGroup={setSelectedGroup}
              onAddTaskToGroup={addTask}
              onAddGroup={addGroup}
              onUpdateGroup={updateGroup}
              onDeleteGroup={deleteGroup}
              loading={groupsLoading}
            />
          </div>

          <div className="main-content">
            <TaskDetails 
              tasks={filteredTasks}
              selectedGroup={selectedGroup}
              onDeleteTask={deleteTask}
              onAddTask={addTask}
              onClearAll={clearAllTasks}
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
      )}
    </div>
  )
}

export default App