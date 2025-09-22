import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { SiteData } from '../types/SiteData';

const createSite = async (data: SiteData) => {
  const response = await api.post('/api/sites', data); // Endpoint para criar sites
  return response.data;
};

export function useSiteMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSite,
    onSuccess: () => {
      // Invalida o cache da lista de sites, forçando o React a buscar a lista atualizada
      queryClient.invalidateQueries({ queryKey: ['sites-data'] });
    }
  });
}