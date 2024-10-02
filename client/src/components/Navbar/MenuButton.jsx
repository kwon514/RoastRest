import { IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

function MenuButton({ mobileSidebar, setMobileSidebar }) {
  const handleDrawerToggle = () => {
    setMobileSidebar(!mobileSidebar);
  };

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      sx={{ ml: '1px', display: { sm: 'none' } }}
    >
      <Menu />
    </IconButton>
  );
}

export default MenuButton;
