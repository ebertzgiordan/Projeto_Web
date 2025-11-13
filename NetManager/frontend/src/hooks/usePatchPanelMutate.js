import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const createPanel = async ({ siteId, data }) => {
    const response = await api.post(`/api/patch-panels/by-site/${siteId}`, data);
    return response.data;
};

const deletePanel = async (panelId) => {
    await api.delete(`/api/patch-panels/${panelId}`);
};

export function usePatchPanelMutate(siteId) { 
    const queryClient = useQueryClient();

    const onSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['patch-panels', siteId] }); 
        queryClient.invalidateQueries({ queryKey: ['pontos-de-rede-data'] }); 
        queryClient.invalidateQueries({ queryKey: ['site-stats'] });          
        queryClient.invalidateQueries({ queryKey: ['global-stats'] });
    };

    const createMutation = useMutation({
        mutationFn: createPanel,
        onSuccess: onSuccess 
    });

    const deleteMutation = useMutation({
        mutationFn: deletePanel,
        onSuccess: onSuccess 
    });

    return {
        create: createMutation.mutate,
        isCreating: createMutation.isPending,
        
        delete: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
}