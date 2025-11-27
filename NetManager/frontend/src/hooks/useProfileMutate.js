import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const updateProfile = async (data) => {
  const response = await api.put(`/api/usuarios/me`, data); 
  return response.data;
};

const deleteProfile = async () => {
    await api.delete('/api/usuarios/me');
};

export function useProfileMutate() {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); 

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] });
      alert("Perfil atualizado com sucesso!");
    },
    onError: (err) => alert("Erro ao atualizar: " + err.message)
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
        alert("Sua conta foi excluída com sucesso. Até logo!");
        queryClient.clear();
        localStorage.removeItem('jwt_token'); 
        navigate('/login');
    },
    onError: (err) => alert("Erro ao excluir conta: " + err.message)
  });

  return {
    updateProfile: updateMutation.mutate, 
    isUpdating: updateMutation.isPending,
    
    deleteProfile: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
}