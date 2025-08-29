import { useState, useEffect } from 'react'
import { groupService } from '../services/api'
import { DEFAULT_GROUPS } from '../constants'

export const useGroups = () => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  // Carregar grupos da API
  const loadGroups = async () => {
    try {
      setLoading(true)
      const apiGroups = await groupService.getAllGroups()
      setGroups(apiGroups)
    } catch (err) {
      console.error('Erro ao carregar grupos:', err)
      // Se não conseguir carregar da API, usar grupos padrão
      setGroups(DEFAULT_GROUPS)
      console.log('Usando grupos padrão - API de grupos não disponível')
    } finally {
      setLoading(false)
    }
  }

  // Adicionar grupo
  const addGroup = async (newGroup) => {
    try {
      const createdGroup = await groupService.createGroup(newGroup)
      setGroups([...groups, createdGroup])
    } catch (err) {
      console.error('Erro ao criar grupo:', err)
      // Fallback: criar grupo localmente se API não estiver disponível
      const localGroup = {
        id: Date.now(),
        name: newGroup.name,
        color: newGroup.color,
        taskCount: 0
      }
      setGroups([...groups, localGroup])
      console.log('Grupo criado localmente - API não disponível')
    }
  }

  // Atualizar grupo
  const updateGroup = async (groupId, updatedGroup) => {
    try {
      const updated = await groupService.updateGroup(groupId, updatedGroup)
      setGroups(groups.map(group => 
        group.id === groupId ? updated : group
      ))
    } catch (err) {
      console.error('Erro ao atualizar grupo:', err)
      // Fallback: atualizar grupo localmente se API não estiver disponível
      setGroups(groups.map(group => 
        group.id === groupId 
          ? { ...group, name: updatedGroup.name, color: updatedGroup.color }
          : group
      ))
      console.log('Grupo atualizado localmente - API não disponível')
    }
  }

  // Deletar grupo
  const deleteGroup = async (groupId) => {
    try {
      await groupService.deleteGroup(groupId)
      setGroups(groups.filter(group => group.id !== groupId))
    } catch (err) {
      console.error('Erro ao deletar grupo:', err)
      // Fallback: deletar grupo localmente se API não estiver disponível
      setGroups(groups.filter(group => group.id !== groupId))
      console.log('Grupo deletado localmente - API não disponível')
    }
  }

  // Atualizar contagem de tarefas dos grupos
  const updateGroupCounts = (tasks) => {
    return groups.map(group => ({
      ...group,
      taskCount: tasks.filter(task => task.group === group.name).length
    }))
  }

  // Carregar grupos quando o hook for inicializado
  useEffect(() => {
    loadGroups()
  }, [])

  return {
    groups,
    loading,
    addGroup,
    updateGroup,
    deleteGroup,
    updateGroupCounts
  }
}
