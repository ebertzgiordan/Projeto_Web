import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

// Funções que falam com o backend
const createPonto = async (data) => {
  const response = await api.post('/api/pontos-de-rede', data);
  return response.data;
};

const updatePonto = async ({ id, data }) => {
  const response = await api.put(`/api/pontos-de-rede/${id}`, data);
  return response.data;
};

const deletePonto = async (id) => {
  await api.delete(`/api/pontos-de-rede/${id}`);
};

export function usePontosDeRedeMutate() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPonto,
    onSuccess: () => {
      // Invalida o cache para forçar a atualização da lista
      queryClient.invalidateQueries(['pontos-de-rede-data']);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updatePonto,
    onSuccess: () => {
      queryClient.invalidateQueries(['pontos-de-rede-data']);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePonto,
    onSuccess: () => {
      queryClient.invalidateQueries(['pontos-de-rede-data']);
    }
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}