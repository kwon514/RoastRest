import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import axios from "axios";
import { parseDateToISO } from '../helpers';

function AddCoffeeDialog({ open, handleClose, updateData}) {
    const roastLevels = [
        {
            value: 'Light',
            label: 'Light',
        },
        {
            value: 'Medium',
            label: 'Medium',
        },
        {
            value: 'Dark',
            label: 'Dark',
        },
    ];
    return (
        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'md'} PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries(formData.entries());
                formJson.roastDate = parseDateToISO(formJson.roastDate);
                formJson.frozenStart = parseDateToISO(formJson.frozenStart);
                formJson.frozenEnd = parseDateToISO(formJson.frozenEnd);
                axios.post("http://localhost:4000/api/coffee",
                    {
                        ...formJson,
                    },
                    { withCredentials: true }
                ).then(() => {
                    handleClose();
                    updateData();
                });
            },
        }}>
            <DialogTitle>
                New Coffee Log
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField required margin="dense" id="name" name="name" label="Name" type="text" fullWidth />
                    <TextField required margin="dense" id="coffeeName" name="coffeeName" label="Coffee Name" type="text" fullWidth />
                    <TextField select margin="dense" id="roastLevel" name="roastLevel" label="Roast Level" type="text" defaultValue={""} fullWidth>
                        {roastLevels.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <DatePicker id="roastDate" name="roastDate" label="Roast Date" format="dd/MM/yyyy" defaultValue={(new Date())} slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }} />
                    <DatePicker id="frozenStart" name="frozenStart" label="Frozen Start Date" format="dd/MM/yyyy" slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />
                    <DatePicker id="frozenEnd" name="frozenEnd" label="Frozen End Date (Leave blank if frozen)" format="dd/MM/yyyy" slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />
                    <TextField margin="dense" id="notes" name="notes" label="Notes" type="text" fullWidth multiline rows={4} />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button type="submit" color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddCoffeeDialog;