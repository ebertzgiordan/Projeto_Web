import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchPontos = async (panelId) => {
  if (!panelId) return [];
  const response = await api.get(`/api/pontos-de-rede/by-panel/${panelId}`);
  return response.data;
};

export function usePontosDeRedeByPanelData(panelId) {
  return useQuery({
    queryKey: ['pontos-de-rede-data', panelId],
    queryFn: () => fetchPontos(panelId),
    enabled: !!panelId,
  });
}