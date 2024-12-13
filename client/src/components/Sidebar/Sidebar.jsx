import { Drawer } from '@mui/material';
import { Dashboard, DashboardOutlined, Delete, DeleteOutline } from '@mui/icons-material';
import roastrest_logo from 'assets/roastrest_icon.png';
import { SidebarItem } from 'components';

function Sidebar({ mobileSidebar, setMobileSidebar }) {
  const closeMobileSidebar = () => {
    setMobileSidebar(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <div className="mt-24 pr-2">
          <SidebarItem
            icon={<DashboardOutlined />}
            activeIcon={<Dashboard />}
            label={'Dashboard'}
            link={'/dashboard'}
          />
          <SidebarItem
            icon={<DeleteOutline />}
            activeIcon={<Delete />}
            label={'Bin'}
            link={'/bin'}
          />
        </div>
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileSidebar}
        onClose={closeMobileSidebar}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: 'none' },
        }}
      >
        <div className="flex items-center ml-4 mt-4">
          <span className="inline-flex items-center">
            <img className="mr-2" src={roastrest_logo} alt="RoastRest logo" width="38px" />
            <span className="text-xl font-semibold">RoastRest</span>
          </span>
        </div>
        <div className="mt-4 pr-2">
          <SidebarItem
            icon={<DashboardOutlined />}
            activeIcon={<Dashboard />}
            label={'Dashboard'}
            link={'/dashboard'}
            responsiveLabel={false}
          />
          <SidebarItem
            icon={<DeleteOutline />}
            activeIcon={<Delete />}
            label={'Bin'}
            link={'/bin'}
            responsiveLabel={false}
          />
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
