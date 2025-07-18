import { useState } from 'react';
import {
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  MenuItem,
  DialogActions,
  Grid2 as Grid,
  Button,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { editCoffeeData, binCoffeeData } from 'helpers';
import { useEffect } from 'react';

function EditCoffeeDialog({
  open,
  handleClose,
  updateData,
  coffeeData,
  weightUnit = 'g',
  toastMsg,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('425'));

  const roastDate = new Date(coffeeData.roastDate);
  const frozenStart = coffeeData.frozenStart ? new Date(coffeeData.frozenStart) : null;
  const frozenEnd = coffeeData.frozenEnd ? new Date(coffeeData.frozenEnd) : null;

  const roastLevels = [
    { value: 'Light', label: 'Light' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Dark', label: 'Dark' },
  ];

  const handleEditCoffeeSubmit = (formJson) => {
    if (formJson.frozenStart && !formJson.frozenEnd) {
      formJson.isFrozen = true;
    } else if (formJson.frozenStart && formJson.frozenEnd) {
      const today = new Date();
      const frozenStartDate = new Date(formJson.frozenStart);
      const frozenEndDate = new Date(formJson.frozenEnd);
      if (today >= frozenStartDate && today <= frozenEndDate) {
        formJson.isFrozen = true;
      } else {
        formJson.isFrozen = false;
      }
    } else {
      formJson.isFrozen = false;
    }
    editCoffeeData(coffeeData._id, formJson).then(() => {
      handleClose();
      updateData();
      if (formJson.name) {
        toastMsg(`Changes saved for ${formJson.name} (${formJson.coffeeName})`);
      } else {
        toastMsg(`Changes saved for ${formJson.coffeeName}`);
      }
    });
  };

  const binData = () => {
    binCoffeeData(coffeeData._id).then(() => {
      handleClose();
      updateData();
      if (coffeeData.name) {
        toastMsg(`${coffeeData.name} (${coffeeData.coffeeName}) moved to bin`);
      } else {
        toastMsg(`${coffeeData.coffeeName} moved to bin`);
      }
    });
  };

  const [disableFrozenEnd, setDisableFrozenEnd] = useState(!frozenStart);
  useEffect(() => {
    if (open) {
      setDisableFrozenEnd(!frozenStart);
    }
  }, [open, frozenStart]);

  const handleFrozenStartChange = (newValue) => {
    setDisableFrozenEnd(!newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth={'md'}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleEditCoffeeSubmit(formJson);
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: '25px 40px 15px 40px',
        }}
      >
        Edit Coffee Log
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '40px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Log name"
            type="text"
            defaultValue={coffeeData.name}
            fullWidth
          />
          <TextField
            required
            margin="normal"
            id="coffeeName"
            name="coffeeName"
            label="Coffee name"
            type="text"
            defaultValue={coffeeData.coffeeName}
            fullWidth
          />
          <TextField
            margin="dense"
            id="coffeeRoaster"
            name="coffeeRoaster"
            label="Roaster name"
            type="text"
            defaultValue={coffeeData.coffeeRoaster}
            fullWidth
          />
          <TextField
            margin="normal"
            id="coffeeWeight"
            name="coffeeWeight"
            label="Weight"
            type="number"
            defaultValue={coffeeData.coffeeWeight}
            InputProps={{
              inputProps: { step: '0.1', min: '0' },
              endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment>,
            }}
            fullWidth
          />
          <TextField
            margin="dense"
            id="coffeeDose"
            name="coffeeDose"
            label="Dose"
            type="number"
            defaultValue={coffeeData.coffeeDose}
            InputProps={{
              inputProps: { step: '0.1', min: '0' },
              endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment>,
            }}
            fullWidth
          />
          <TextField
            select
            margin="normal"
            id="roastLevel"
            name="roastLevel"
            label="Roast level"
            type="text"
            defaultValue={coffeeData.roastLevel}
            fullWidth
          >
            {roastLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DesktopDatePicker
            id="roastDate"
            name="roastDate"
            label="Roast date"
            format="dd/MM/yyyy"
            defaultValue={roastDate}
            disableFuture={true}
            slotProps={{ textField: { fullWidth: true, margin: 'dense', required: true } }}
          />
          <DesktopDatePicker
            id="frozenStart"
            name="frozenStart"
            label="Frozen start date"
            format="dd/MM/yyyy"
            defaultValue={frozenStart}
            disableFuture={true}
            onChange={handleFrozenStartChange}
            slotProps={{
              field: { clearable: true },
              textField: { fullWidth: true, margin: 'normal' },
            }}
          />
          <DesktopDatePicker
            id="frozenEnd"
            name="frozenEnd"
            label="Frozen end date (leave blank if frozen)"
            format="dd/MM/yyyy"
            defaultValue={frozenEnd}
            disableFuture={true}
            disabled={disableFrozenEnd}
            slotProps={{
              field: { clearable: true },
              textField: { fullWidth: true, margin: 'dense' },
            }}
          />
          <TextField
            margin="normal"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            defaultValue={coffeeData.notes}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            id="websiteUrl"
            name="websiteUrl"
            label="Website"
            type="text"
            defaultValue={coffeeData.websiteUrl}
            fullWidth
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions sx={{ padding: '20px 35px 20px 35px' }}>
        <Button onClick={binData} color="primary">
          Delete
        </Button>
        <div style={{ flex: '1 0 0' }} />
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCoffeeDialog;
