import { Outlet } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useUserData } from '../hooks/userData'; // Hook que já criamos

const MainLayout = () => {
  const { data: usuario } = useUserData();
  const isAdmin = usuario?.papel === 1;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        backgroundColor="#2c2d2e" 
        rootStyles={{ color: '#e3e3e3', borderColor: '#444746' }}
      >
        <div className="p-3 text-center">
          <h4>NetManager</h4>
        </div>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              return {
                color: active ? '#8ab4f8' : '#e3e3e3',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: '#1e1f20',
                  color: '#8ab4f8',
                },
              };
            },
          }}
        >
          <MenuItem component={<Link to="/" />}> 🏠 Dashboard </MenuItem>

          {isAdmin && (
            <SubMenu label="Administração">
              <MenuItem component={<Link to="/admin/usuarios" />}> 👥 Gerenciar Usuários </MenuItem>
            </SubMenu>
          )}

          <SubMenu label="Conta">
            <MenuItem component={<Link to="/profile" />}> 👤 Meu Perfil </MenuItem>
          </SubMenu>

          <MenuItem component={<Link to="/ajuda" />}> ❓ Ajuda </MenuItem>
        </Menu>
      </Sidebar>

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;