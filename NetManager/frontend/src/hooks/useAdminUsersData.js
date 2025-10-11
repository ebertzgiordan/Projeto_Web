import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchUsers = async () => {
  const { data } = await api.get('/api/usuarios');
  return data;
};

export function useAdminUsersData() {
  return useQuery({ queryKey: ['admin-users'], queryFn: fetchUsers });
}