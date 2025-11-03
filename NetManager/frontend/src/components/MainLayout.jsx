import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useUserData } from '../hooks/userData';

const sidebarBackgroundColor = "#2c2d2e";

const MainLayout = () => {
  const { data: usuario } = useUserData();
  const isAdmin = usuario?.papel === 1;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    navigate('/login');
    window.location.reload();
  };

  const menuItemStyles = {
    button: ({ level, active }) => {
      return {
        color: active ? '#8ab4f8' : '#e3e3e3',
        backgroundColor: sidebarBackgroundColor, 
        '&:hover': {
          backgroundColor: '#1e1f20', 
          color: '#8ab4f8',
        },
      };
    },
    subMenuContent: () => {
      return {
        backgroundColor: sidebarBackgroundColor,
      };
    },
  };


  return (
    <div style={{ display: 'flex', height: '100vh', minHeight: '100vh' }}>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={sidebarBackgroundColor} 
        rootStyles={{
          color: '#e3e3e3',
          borderColor: '#3c4043',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Menu menuItemStyles={menuItemStyles}>
            
            <MenuItem 
              icon={isCollapsed ? "➡️" : "⬅️"} 
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600 }}
            >
              {!isCollapsed && "NetManager"}
            </MenuItem>

            <MenuItem icon={"🏠"} component={<Link to="/" />}> Dashboard </MenuItem>

            {isAdmin && (
              <SubMenu label="Administração" icon={"⚙️"}>
                <MenuItem icon={"👥"} component={<Link to="/admin/usuarios" />}> Gerenciar Usuários </MenuItem>
              </SubMenu>
            )}

            <SubMenu label="Conta" icon={"👤"}>
              <MenuItem icon={"📝"} component={<Link to="/profile" />}> Meu Perfil </MenuItem>
            </SubMenu>

            <MenuItem icon={"❓"} component={<Link to="/ajuda" />}> Ajuda </MenuItem>
          </Menu>
        </div>

        <div style={{ borderTop: '1px solid #3c4043' }}>
          <Menu
             menuItemStyles={{
               ...menuItemStyles, 
               button: { 
                ...menuItemStyles.button, 
                '&:hover': { 
                  backgroundColor: '#1e1f20',
                  color: '#ff8a80', 
                },
               }
            }}
          >
            <MenuItem icon={"🚪"} onClick={handleLogout}> Sair </MenuItem>
          </Menu>
        </div>
      </Sidebar>

      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto', backgroundColor: '#131314' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;