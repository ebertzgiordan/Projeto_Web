import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const createPanel = async ({ siteId, data }) => {
    const response = await api.post(`/api/patch-panels/by-site/${siteId}`, data);
    return response.data;
};

export function usePatchPanelMutate() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createPanel,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['patch-panels', variables.siteId] });
        }
    });

    return {
        create: mutation.mutate,
        isPending: mutation.isPending,
    };
}