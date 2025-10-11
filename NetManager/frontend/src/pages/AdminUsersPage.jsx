import { useState } from 'react';
import { useAdminUsersData } from '../hooks/useAdminUsersData';
import { useUserMutate } from '../hooks/useUserMutate';
import EditUserModal from '../components/EditUserModal';
import { Container, Table, Spinner, Button, Alert } from 'react-bootstrap';

const AdminUsersPage = () => {
  const { data: users, isLoading, isError } = useAdminUsersData();
  const { updateUser, isUpdating } = useUserMutate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleOpenEditModal = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = (data) => {
    updateUser({ id: editingUser.id, data }, {
      onSuccess: () => setShowEditModal(false)
    });
  };

  if (isLoading) return <div className="text-center mt-4"><Spinner /></div>;
  if (isError) return <Alert variant="danger">Erro ao carregar os usuários.</Alert>;

  return (
    <>
      <Container>
        <h1 className="mb-4">Gerenciar Usuários</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th><th>Nome</th><th>Email</th><th>Papel</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.papel === 1 ? 'Admin' : 'Técnico'}</td>
                <td className="text-center">
                  <Button variant="outline-primary" size="sm" onClick={() => handleOpenEditModal(user)}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showEditModal && (
        <EditUserModal
          user={editingUser}
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          onSubmit={handleUpdateUser}
          isLoading={isUpdating}
        />
      )}
    </>
  );
};

export default AdminUsersPage;