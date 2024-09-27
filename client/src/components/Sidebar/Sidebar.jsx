import { Drawer, Grid2 as Grid } from '@mui/material';
import { Dashboard, PersonOutlineOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
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
          <Link to="/dashboard">
            <div className="px-4 py-2 hover:bg-slate-200">
              <Grid container>
                <Grid size={2}>
                  <Dashboard />
                </Grid>
                <Grid size={10}>Dashboard</Grid>
              </Grid>
            </div>
          </Link>
          <Link to="/account">
            <div className="px-4 py-2 hover:bg-slate-200">
              <Grid container>
                <Grid size={2}>
                  <PersonOutlineOutlined />
                </Grid>
                <Grid size={10}>Account</Grid>
              </Grid>
            </div>
          </Link>
        </div>
      </Drawer>
    </>
  );
}

export default Sidebar;
