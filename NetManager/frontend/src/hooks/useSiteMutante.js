import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const createSite = async (data) => {
  const { data: responseData } = await api.post('/api/sites', data);
  return responseData;
};

const updateSite = async ({ id, data }) => {
  const { data: responseData } = await api.put(`/api/sites/${id}`, data);
  return responseData;
};

const deleteSite = async (id) => {
  await api.delete(`/api/sites/${id}`);
  return id;
};

export function useSiteMutate() {
  const queryClient = useQueryClient();

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateSite,
    onSuccess: (updatedSiteData, variables) => {
      console.log('Site atualizado com sucesso. Invalidando queries...');
      queryClient.invalidateQueries({ queryKey: ['sites-data'] });

      queryClient.invalidateQueries({ queryKey: ['site-data', variables.id] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar o site:", error);
      alert("Não foi possível salvar as alterações. Verifique o console para mais detalhes.");
    }
  });

  const { mutate: create, isPending: isCreating } = useMutation({
    mutationFn: createSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites-data'] });
    },
  });

  const { mutate: del, isPending: isDeleting } = useMutation({
    mutationFn: deleteSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites-data'] });
    },
  });

  return {
    create,
    update,
    delete: del,
    isCreating,
    isUpdating,
    isDeleting,
  };
}