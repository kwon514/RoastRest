import { Drawer } from '@mui/material';
import { Dashboard, PersonOutlineOutlined } from '@mui/icons-material';
import { SidebarItem } from 'components';
function Sidebar() {
  return (
    <>
      <Drawer
        open={true}
        variant="permanent"
        PaperProps={{
          sx: { width: '255px' },
        }}
      >
        <div className="mt-24">
          <SidebarItem icon={<Dashboard />} label={'Dashboard'} link={'/dashboard'} />
          <SidebarItem icon={<PersonOutlineOutlined />} label={'Account'} link={'/account'} />
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
