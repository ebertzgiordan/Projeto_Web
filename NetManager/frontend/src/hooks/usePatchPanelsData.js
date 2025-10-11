import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchPanels = async (siteId) => {
  if (!siteId) return [];
  const response = await api.get(`/api/patch-panels/by-site/${siteId}`);
  return response.data;
};

export function usePatchPanelsData(siteId) {
  return useQuery({
    queryKey: ['patch-panels', siteId],
    queryFn: () => fetchPanels(siteId),
    enabled: !!siteId,
  });
}