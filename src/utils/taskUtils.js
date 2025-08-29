// Agrupar tarefas por dia
export const groupTasksByDay = (tasks) => {
  const grouped = {}
  
  tasks.forEach(task => {
    const taskDate = new Date(task.date)
    const dayKey = taskDate.toDateString()
    const dayName = taskDate.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'short' 
    })
    
    if (!grouped[dayKey]) {
      grouped[dayKey] = {
        date: taskDate,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        tasks: []
      }
    }
    grouped[dayKey].tasks.push(task)
  })
  
  return Object.values(grouped).sort((a, b) => a.date - b.date)
}

// Obter cor da prioridade
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return '#EF4444'
    case 'medium': return '#F97316'
    case 'low': return '#10B981'
    default: return '#6B7280'
  }
}

// Obter cor do status
export const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return '#10B981'
    case 'in-progress': return '#F59E0B'
    case 'pending': return '#6B7280'
    default: return '#6B7280'
  }
}

// Obter texto do status
export const getStatusText = (status) => {
  switch (status) {
    case 'completed': return 'Concluída'
    case 'in-progress': return 'Em Produção'
    case 'pending': return 'Pendente'
    default: return 'Pendente'
  }
}

// Obter ícone do status
export const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return '✓'
    case 'in-progress': return '⚡'
    case 'pending': return '○'
    default: return '○'
  }
}

// Calcular progresso das tarefas
export const calculateProgress = (tasks) => {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter(t => (t.status === 'completed' || t.completed)).length
  return (completedTasks / tasks.length) * 100
}
