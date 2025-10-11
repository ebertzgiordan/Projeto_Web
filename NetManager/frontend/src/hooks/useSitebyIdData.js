import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchSiteById = async (siteId) => {
  if (!siteId) return null;
  const response = await api.get(`/api/sites/${siteId}`);
  return response.data;
};

export function useSiteByIdData(siteId) {
  return useQuery({
    queryKey: ['site-data', siteId],
    queryFn: () => fetchSiteById(siteId),
    enabled: !!siteId,
  });
}