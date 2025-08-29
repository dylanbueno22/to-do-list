import { useState } from 'react'
import { getStartOfWeek, getEndOfWeek } from '../utils/dateUtils'

export const useDateSelection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Filtrar tarefas por semana
  const filterTasksByWeek = (tasks, date) => {
    const startOfWeek = getStartOfWeek(date)
    const endOfWeek = getEndOfWeek(date)
    
    return tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate >= startOfWeek && taskDate <= endOfWeek
    })
  }

  return {
    selectedDate,
    setSelectedDate,
    filterTasksByWeek
  }
}
