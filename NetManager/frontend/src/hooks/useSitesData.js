import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchSites = async () => {
  const response = await api.get('/api/sites');
  return response.data;
};

export function useSitesData() {
  return useQuery({
    queryKey: ['sites-data'],
    queryFn: fetchSites,
  });
}