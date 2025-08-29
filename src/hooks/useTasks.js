import { useState, useEffect } from 'react'
import { taskService } from '../services/api'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carregar tarefas da API
  const loadTasks = async () => {
    try {
      setLoading(true)
      const apiTasks = await taskService.getAllTasks()
      setTasks(apiTasks)
      setError(null)
      console.log('Tarefas carregadas da API:', apiTasks.length)
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err)
      setError('Erro ao carregar tarefas da API')
      setTasks([])
      console.log('Usando tarefas vazias - API não disponível')
    } finally {
      setLoading(false)
    }
  }

  // Adicionar tarefa
  const addTask = async (newTask) => {
    try {
      const createdTask = await taskService.createTask(newTask)
      setTasks([...tasks, createdTask])
      console.log('Tarefa criada via API:', createdTask)
    } catch (err) {
      console.error('Erro ao criar tarefa:', err)
      // Fallback: criar tarefa localmente se API não estiver disponível
      const localTask = {
        id: Date.now(),
        title: newTask.title,
        group: newTask.group || 'Trabalho',
        time: newTask.time || '',
        priority: newTask.priority || 'medium',
        date: new Date(newTask.date),
        status: 'pending',
        completed: false
      }
      setTasks([...tasks, localTask])
      console.log('Tarefa criada localmente - API não disponível')
    }
  }

  // Atualizar status da tarefa
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, newStatus)
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ))
      console.log('Status da tarefa atualizado via API:', updatedTask)
    } catch (err) {
      console.error('Erro ao atualizar status da tarefa:', err)
      // Fallback: atualizar tarefa localmente se API não estiver disponível
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus, completed: newStatus === 'completed' }
          : task
      ))
      console.log('Status da tarefa atualizado localmente - API não disponível')
    }
  }

  // Deletar tarefa
  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(tasks.filter(task => task.id !== taskId))
      console.log('Tarefa deletada via API:', taskId)
    } catch (err) {
      console.error('Erro ao deletar tarefa:', err)
      // Fallback: deletar tarefa localmente se API não estiver disponível
      setTasks(tasks.filter(task => task.id !== taskId))
      console.log('Tarefa deletada localmente - API não disponível')
    }
  }

  // Limpar todas as tarefas
  const clearAllTasks = async () => {
    if (window.confirm('Tem certeza que deseja apagar todas as tarefas? Esta ação não pode ser desfeita.')) {
      try {
        // Deletar todas as tarefas uma por uma
        for (const task of tasks) {
          await taskService.deleteTask(task.id)
        }
        setTasks([])
        console.log('Todas as tarefas deletadas via API')
      } catch (err) {
        console.error('Erro ao limpar tarefas:', err)
        // Fallback: limpar tarefas localmente se API não estiver disponível
        setTasks([])
        console.log('Todas as tarefas deletadas localmente - API não disponível')
      }
    }
  }

  // Carregar tarefas quando o hook for inicializado
  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTaskStatus,
    deleteTask,
    clearAllTasks
  }
}
