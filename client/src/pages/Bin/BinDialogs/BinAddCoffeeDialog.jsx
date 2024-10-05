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
  Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addCoffeeData } from 'helpers';

function BinAddCoffeeDialog({
  open,
  handleClose,
  updateData,
  coffeeData,
  isDuplicate,
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

  const handleAddCoffeeSubmit = (formJson) => {
    addCoffeeData(formJson).then(() => {
      handleClose();
      updateData();
      if (formJson.name) {
        toastMsg(`Created ${formJson.name} (${formJson.coffeeName})`);
      } else {
        toastMsg(`Created ${formJson.coffeeName}`);
      }
    });
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
          handleAddCoffeeSubmit(formJson);
        },
      }}
    >
      <DialogTitle>New Coffee Log</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Log name"
            type="text"
            {...(isDuplicate ? { defaultValue: coffeeData.name } : {})}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="coffeeName"
            name="coffeeName"
            label="Coffee name"
            type="text"
            {...(isDuplicate ? { defaultValue: coffeeData.coffeeName } : {})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="coffeeRoaster"
            name="coffeeRoaster"
            label="Roaster name"
            type="text"
            {...(isDuplicate ? { defaultValue: coffeeData.coffeeRoaster } : {})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="coffeeWeight"
            name="coffeeWeight"
            label="Weight"
            type="number"
            InputProps={{
              inputProps: { step: '0.1', min: '0' },
              endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment>,
            }}
            {...(isDuplicate ? { defaultValue: coffeeData.coffeeWeight } : {})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="coffeeDose"
            name="coffeeDose"
            label="Dose"
            type="number"
            InputProps={{
              inputProps: { step: '0.1', min: '0' },
              endAdornment: <InputAdornment position="end">{weightUnit}</InputAdornment>,
            }}
            {...(isDuplicate ? { defaultValue: coffeeData.coffeeDose } : {})}
            fullWidth
          />
          <TextField
            select
            margin="dense"
            id="roastLevel"
            name="roastLevel"
            label="Roast level"
            type="text"
            {...(isDuplicate ? { defaultValue: coffeeData.roastLevel } : { defaultValue: '' })}
            fullWidth
          >
            {roastLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker
            id="roastDate"
            name="roastDate"
            label="Roast date"
            format="dd/MM/yyyy"
            {...(isDuplicate ? { defaultValue: roastDate } : { defaultValue: new Date() })}
            slotProps={{ textField: { fullWidth: true, margin: 'dense', required: true } }}
          />
          <DatePicker
            id="frozenStart"
            name="frozenStart"
            label="Frozen start date"
            format="dd/MM/yyyy"
            {...(isDuplicate ? { defaultValue: frozenStart } : {})}
            slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
          />
          <DatePicker
            id="frozenEnd"
            name="frozenEnd"
            label="Frozen end date (leave blank if frozen)"
            format="dd/MM/yyyy"
            {...(isDuplicate ? { defaultValue: frozenEnd } : {})}
            slotProps={{ textField: { fullWidth: true, margin: 'dense' } }}
          />
          <TextField
            margin="dense"
            id="notes"
            name="notes"
            label="Notes"
            type="text"
            {...(isDuplicate ? { defaultValue: coffeeData.notes } : {})}
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
            {...(isDuplicate ? { defaultValue: coffeeData.websiteUrl } : {})}
            fullWidth
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
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

export default BinAddCoffeeDialog;
