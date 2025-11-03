import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

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
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['pontos-de-rede-data'] });
    
    queryClient.invalidateQueries({ queryKey: ['global-stats'] });

    queryClient.invalidateQueries({ queryKey: ['site-stats'] });
  };

  const createMutation = useMutation({
    mutationFn: createPonto,
    onSuccess: handleSuccess
  });

  const updateMutation = useMutation({
    mutationFn: updatePonto,
    onSuccess: handleSuccess 
  });

  const deleteMutation = useMutation({
    mutationFn: deletePonto,
    onSuccess: handleSuccess 
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