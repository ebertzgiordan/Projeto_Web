import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchSiteStats = async (siteId) => {
  if (!siteId) return null;
  const response = await api.get(`/api/dashboard/site-stats/${siteId}`);
  return response.data;
};

export function useSiteStatsData(siteId) {
  return useQuery({
    queryKey: ['site-stats', siteId],
    queryFn: () => fetchSiteStats(siteId),
    enabled: !!siteId,
  });
}