import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchUser = async () => {
  const { data } = await api.get('/api/usuarios/me');
  return data;
};

export function useUserData() {
  return useQuery({ queryKey: ['user-data'], queryFn: fetchUser, staleTime: Infinity });
}