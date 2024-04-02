import { useState } from 'react';
import { MoreVert, ContentCopy, DeleteOutline } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';

function CoffeeCardMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          padding: '0',
          height: '32px',
          width: '32px',
          margin: '0 2px 0 0',
        }}
      >
        <MoreVert
          sx={{
            padding: 0,
            margin: 0,
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeleteOutline fontSize="medium" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default CoffeeCardMenu;