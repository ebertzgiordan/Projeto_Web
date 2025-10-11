import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const createSite = async (data) => {
  const response = await api.post('/api/sites', data);
  return response.data;
};

const updateSite = async ({ id, data }) => {
  const response = await api.put(`/api/sites/${id}`, data);
  return response.data;
};

const deleteSite = async (id) => {
  await api.delete(`/api/sites/${id}`);
};

export function useSiteMutate() {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['sites-data'] });
  };

  const createMutation = useMutation({ mutationFn: createSite, onSuccess });
  const updateMutation = useMutation({ mutationFn: updateSite, onSuccess });
  const deleteMutation = useMutation({ mutationFn: deleteSite, onSuccess });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    delete: deleteMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}