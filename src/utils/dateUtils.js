// Obter início da semana para uma data específica
export const getStartOfWeek = (date) => {
  const start = new Date(date)
  const day = start.getDay()
  const diff = start.getDate() - day + (day === 0 ? -6 : 1)
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)
  return start
}

// Obter fim da semana para uma data específica
export const getEndOfWeek = (date) => {
  const end = new Date(date)
  const day = end.getDay()
  const diff = end.getDate() - day + (day === 0 ? 0 : 7)
  end.setDate(diff)
  end.setHours(23, 59, 59, 999)
  return end
}

// Verificar se uma data está na semana atual
export const isInCurrentWeek = (dateString) => {
  const today = new Date()
  const startOfWeek = getStartOfWeek(today)
  const endOfWeek = getEndOfWeek(today)
  const selectedDate = new Date(dateString)
  
  return selectedDate >= startOfWeek && selectedDate <= endOfWeek
}

// Obter data inicial (hoje)
export const getInitialDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}


