import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchPontosBySite = async (siteId) => {
  if (!siteId) return [];
  const response = await api.get(`/api/pontos-de-rede/by-site/${siteId}`);
  return response.data;
};

export function usePontosDeRedeBySiteData(siteId) {
  return useQuery({
    queryKey: ['pontos-de-rede-data', siteId],
    queryFn: () => fetchPontosBySite(siteId),
    enabled: !!siteId,
  });
}