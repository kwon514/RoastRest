import { toggleSkipLanding, toastMessage } from 'helpers';
import { Paper, Grid, FormControlLabel, Switch } from '@mui/material';

function MiscOptionsBox() {
  const initialSkipLanding = localStorage.getItem('skipLanding') === 'true';

  const handleSkipLandingToggle = () => {
    const skipLandingStatus = toggleSkipLanding();
    toastMessage(
      'success',
      skipLandingStatus ? 'Landing page will now be skipped!' : 'Landing page will now be shown!'
    );
  };

  return (
    <Paper className="bg-white p-5 mt-4">
      <Grid container spacing={0}>
        <Grid item xs={10} sm={11} className="items-center flex">
          <h3 className="text-xl font-bold">Direct dashboard</h3>
        </Grid>
        <Grid item xs={2} sm={1}>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={initialSkipLanding}
                onChange={handleSkipLandingToggle}
                color="primary"
              />
            }
          />
        </Grid>
        <Grid item xs={11} sm={12}>
          <p>
            Skip the landing page when you visit RoastRest and go directly to your dashboard for
            convenience.
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MiscOptionsBox;
