import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const updateUser = async ({ id, data }) => {
  const response = await api.put(`/api/usuarios/${id}`, data);
  return response.data;
};

export function useUserMutate() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  return {
    updateUser: mutate,
    isUpdating: isPending,
  };
}