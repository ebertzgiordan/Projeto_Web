import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const importData = async ({ siteId, data }) => {
    const response = await api.post(`/api/sites/${siteId}/import-data`, data);
    return response.data;
};

export function useImportMutate(siteId) {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: importData,
        onSuccess: () => {
            alert('Dados importados com sucesso! Atualizando o rack...');
            
            queryClient.invalidateQueries({ queryKey: ['site-data', siteId] });
            queryClient.invalidateQueries({ queryKey: ['patch-panels', siteId] });
            queryClient.invalidateQueries({ queryKey: ['pontos-de-rede-data'] });
            queryClient.invalidateQueries({ queryKey: ['site-stats'] });
            queryClient.invalidateQueries({ queryKey: ['global-stats'] });
        },
        onError: (error) => {
            alert(`Falha na importação: ${error.message || 'Erro do servidor'}`);
        }
    });

    return {
        importData: mutation.mutate,
        isImporting: mutation.isPending,
    };
}