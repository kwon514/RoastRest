import { Link, useLocation } from 'react-router-dom';
import { Grid2 as Grid } from '@mui/material';

function SidebarItem({ icon, activeIcon, label, link, responsiveLabel = true }) {
  const location = useLocation();
  const active = location.pathname === link;

  return (
    <Link to={link}>
      <div
        className={
          'px-4 py-3 rounded-r-2xl lg:w-64 ' +
          (active ? 'bg-[#eaddca] ' : 'hover:bg-slate-50 ') +
          (responsiveLabel ? '' : 'w-60')
        }
      >
        <Grid container>
          <Grid size={3}>{active ? activeIcon : icon}</Grid>
          <Grid size={9} className={responsiveLabel ? 'hidden lg:block' : ''}>
            {label}
          </Grid>
        </Grid>
      </div>
    </Link>
  );
}

export default SidebarItem;
