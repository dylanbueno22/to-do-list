// Cores dos grupos padrão
export const DEFAULT_GROUPS = [
  { id: 1, name: "Estudos", color: "#3B82F6", taskCount: 0 },
  { id: 2, name: "Trabalho", color: "#10B981", taskCount: 0 },
  { id: 3, name: "Treino", color: "#F59E0B", taskCount: 0 }
]



// Configurações da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 5000
}

// Mensagens de erro
export const ERROR_MESSAGES = {
  API_NOT_FOUND: 'API não encontrada. Verifique se o servidor está rodando.',
  CONNECTION_ERROR: 'Não foi possível conectar com a API. Verifique se o servidor está rodando.',
  LOAD_TASKS_ERROR: 'Erro ao carregar tarefas da API',
  CREATE_TASK_ERROR: 'Erro ao criar tarefa',
  UPDATE_TASK_ERROR: 'Erro ao atualizar status da tarefa',
  DELETE_TASK_ERROR: 'Erro ao deletar tarefa',
  CLEAR_TASKS_ERROR: 'Erro ao limpar tarefas',
  LOAD_GROUPS_ERROR: 'Erro ao carregar grupos da API',
  CREATE_GROUP_ERROR: 'Erro ao criar grupo',
  UPDATE_GROUP_ERROR: 'Erro ao atualizar grupo',
  DELETE_GROUP_ERROR: 'Erro ao deletar grupo'
}
