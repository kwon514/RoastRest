import { useState } from 'react';
import { MoreVert, ContentCopy, DeleteForeverOutlined } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { deleteCoffeeData } from 'helpers';

function BinCoffeeCardMenu({ coffeeData, updateData, duplicateData, toastMsg }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDuplicate = () => {
    duplicateData(coffeeData._id);
    handleClose();
  };

  const handleDelete = () => {
    deleteCoffeeData(coffeeData._id).then(() => {
      updateData();
      if (coffeeData.name) {
        toastMsg(`${coffeeData.name} (${coffeeData.coffeeName}) deleted forever`);
      } else {
        toastMsg(`${coffeeData.coffeeName} deleted forever`);
      }
    });
    handleClose();
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
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteForeverOutlined fontSize="medium" />
          </ListItemIcon>
          Delete forever
        </MenuItem>
      </Menu>
    </>
  );
}

export default BinCoffeeCardMenu;
