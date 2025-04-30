import { useState } from 'react';
import { MoreVert, AcUnit, PushPinOutlined, ContentCopy, DeleteOutline } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { toggleCoffeePin, toggleCoffeeFrozen, binCoffeeData } from 'helpers';

function CoffeeCardMenu({ coffeeData, updateData, duplicateData, toastMsg }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFrozen = () => {
    toggleCoffeeFrozen(coffeeData._id, coffeeData.isFrozen).then(() => {
      updateData();
      if (coffeeData.isFrozen) {
        toastMsg(`Froze ${coffeeData.name ? coffeeData.name : coffeeData.coffeeName}`);
      } else {
        toastMsg(`Unfroze ${coffeeData.name ? coffeeData.name : coffeeData.coffeeName}`);
      }
    });
    handleClose();
  };

  const handlePin = () => {
    toggleCoffeePin(coffeeData._id, coffeeData.isPinned).then(() => {
      updateData();
      if (coffeeData.isPinned) {
        toastMsg(`Unpinned ${coffeeData.name ? coffeeData.name : coffeeData.coffeeName}`);
      } else {
        toastMsg(`Pinned ${coffeeData.name ? coffeeData.name : coffeeData.coffeeName}`);
      }
    });
    handleClose();
  };

  const handleDuplicate = () => {
    duplicateData(coffeeData._id);
    handleClose();
  };

  const handleBin = () => {
    binCoffeeData(coffeeData._id).then(() => {
      updateData();
      if (coffeeData.name) {
        toastMsg(`${coffeeData.name} (${coffeeData.coffeeName}) moved to bin`);
      } else {
        toastMsg(`${coffeeData.coffeeName} moved to bin`);
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
        <MenuItem onClick={handlePin}>
          <ListItemIcon>
            <PushPinOutlined fontSize="small" />
          </ListItemIcon>
          {coffeeData.isPinned ? 'Unpin' : 'Pin'}
        </MenuItem>
        {coffeeData.frozenStart && coffeeData.frozenEnd ? null : (
          <MenuItem onClick={handleFrozen}>
            <ListItemIcon>
              <AcUnit fontSize="small" />
            </ListItemIcon>
            {coffeeData.isFrozen ? 'Unfreeze' : 'Freeze'}
          </MenuItem>
        )}
        <MenuItem onClick={handleDuplicate}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          Duplicate
        </MenuItem>
        <MenuItem onClick={handleBin}>
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
