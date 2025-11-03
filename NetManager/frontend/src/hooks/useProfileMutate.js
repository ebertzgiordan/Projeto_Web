import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const updateProfile = async (data) => {
  const response = await api.put(`/api/usuarios/me`, data); 
  return response.data;
};

export function useProfileMutate() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
    }
  });

  return {
    updateProfile: mutate, 
    isUpdating: isPending,
  };
}