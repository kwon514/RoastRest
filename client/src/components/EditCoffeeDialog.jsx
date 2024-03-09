import { Dialog, DialogTitle, DialogContent, TextField, MenuItem, DialogActions, Grid, Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import axios from "axios";
import { parseDateToISO } from '../helpers';

function EditCoffeeDialog({ open, handleClose, updateData, coffeeData }) {
    const deleteData = () => {
        axios.delete(`http://localhost:4000/api/coffee/${coffeeData._id}`,
            { withCredentials: true }).then(() => {
                handleClose();
                updateData();
            });
    };

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
                axios.put(`http://localhost:4000/api/coffee/${coffeeData._id}`,
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
                Edit Coffee Log
            </DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TextField required margin="dense" id="name" name="name" label="Name" type="text" defaultValue={coffeeData.name} fullWidth />
                    <TextField required margin="dense" id="coffeeName" name="coffeeName" label="Coffee Name" type="text" defaultValue={coffeeData.coffeeName} fullWidth />
                    <TextField select margin="dense" id="roastLevel" name="roastLevel" label="Roast Level" type="text" defaultValue={coffeeData.roastLevel} fullWidth>
                        {roastLevels.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <DatePicker id="roastDate" name="roastDate" label="Roast Date" format="dd/MM/yyyy" defaultValue={coffeeData.roastDate} slotProps={{ textField: { fullWidth: true, margin: "dense", required: true } }} />
                    <DatePicker id="frozenStart" name="frozenStart" label="Frozen Start Date" format="dd/MM/yyyy" defaultValue={coffeeData.frozenStart} slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />
                    <DatePicker id="frozenEnd" name="frozenEnd" label="Frozen End Date (Leave blank if frozen)" format="dd/MM/yyyy" defaultValue={coffeeData.frozenEnd} slotProps={{ textField: { fullWidth: true, margin: "dense" } }} />
                    <TextField margin="dense" id="notes" name="notes" label="Notes" type="text" defaultValue={coffeeData.notes} fullWidth multiline rows={4} />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item xs={4} className='pl-4'>
                        <Button onClick={deleteData} color="primary">Delete</Button>
                    </Grid>
                    <Grid item xs={8} className='inline-flex items-center justify-end pr-4'>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button type="submit" color="primary">Confirm</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

export default EditCoffeeDialog;