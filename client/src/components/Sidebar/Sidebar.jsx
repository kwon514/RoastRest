import { Drawer } from '@mui/material';
import { Dashboard, PersonOutlineOutlined } from '@mui/icons-material';
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
          <SidebarItem icon={<Dashboard />} label={'Dashboard'} link={'/dashboard'} />
          <SidebarItem icon={<PersonOutlineOutlined />} label={'Account'} link={'/account'} />
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
        <div className="mt-24 pr-2">
          <SidebarItem
            icon={<Dashboard />}
            label={'Dashboard'}
            link={'/dashboard'}
            responsiveLabel={false}
          />
          <SidebarItem
            icon={<PersonOutlineOutlined />}
            label={'Account'}
            link={'/account'}
            responsiveLabel={false}
          />
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
