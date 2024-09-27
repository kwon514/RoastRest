import { Link, useLocation } from 'react-router-dom';
import { Grid2 as Grid } from '@mui/material';

function SidebarItem({ icon, label, link }) {
  const location = useLocation();
  const active = location.pathname === link;

  return (
    <Link to={link}>
      <div className={'px-4 py-3 rounded-xl ' + (active ? 'bg-slate-200' : 'hover:bg-slate-200')}>
        <Grid container>
          <Grid size={2}>{icon}</Grid>
          <Grid size={10}>{label}</Grid>
        </Grid>
      </div>
    </Link>
  );
}

export default SidebarItem;
