// Cores dos grupos padrão
export const DEFAULT_GROUPS = [
  { id: 1, name: "Estudos", color: "#3B82F6", taskCount: 0 },
  { id: 2, name: "Trabalho", color: "#10B981", taskCount: 0 },
  { id: 3, name: "Treino", color: "#F59E0B", taskCount: 0 }
]

// Configurações da API
export const API_CONFIG = {
  BASE_URL: 'https://api-projeto-to-do-list-bedgsfig6-dylanbueno22s-projects.vercel.app', // URL NOVA
  TIMEOUT: 5000
}

// Mensagens de erro em português brasileiro
export const ERROR_MESSAGES = {
  API_NOT_FOUND: 'API não encontrada. Verifique se o servidor backend está rodando.',
  CONNECTION_ERROR: 'Não foi possível conectar com a API. Verifique sua conexão com a internet.',
  LOAD_TASKS_ERROR: 'Erro ao carregar tarefas do servidor',
  CREATE_TASK_ERROR: 'Erro ao criar nova tarefa',
  UPDATE_TASK_ERROR: 'Erro ao atualizar status da tarefa',
  DELETE_TASK_ERROR: 'Erro ao excluir tarefa',
  CLEAR_TASKS_ERROR: 'Erro ao limpar todas as tarefas',
  LOAD_GROUPS_ERROR: 'Erro ao carregar grupos do servidor',
  CREATE_GROUP_ERROR: 'Erro ao criar novo grupo',
  UPDATE_GROUP_ERROR: 'Erro ao atualizar grupo',
  DELETE_GROUP_ERROR: 'Erro ao excluir grupo'
}