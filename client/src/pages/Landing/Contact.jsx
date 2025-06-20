import { Helmet } from 'react-helmet';
import LandingNavbar from './LandingNavbar';
import { Paper, TextField, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { toastMessage } from 'helpers';

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append('access_key', 'df9e880e-cb2a-43e7-8e01-2196c688f6e2');
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toastMessage('success', 'Message sent successfully!');
        e.target.reset();
      } else {
        toastMessage('error', data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Helmet>
        <title>Contact | RoastRest</title>
      </Helmet>
      <LandingNavbar />
      <div className="max-w-screen-lg mx-auto px-3">
        <Paper className="mx-auto mt-20 bg-white p-5 sm:w-2/3">
          <h2 className="text-2xl font-semibold pb-2">Get in touch</h2>
          <p className="text-md pb-2">
            If you have any questions, feedback, or just want to chat about coffee, feel free to
            reach out below!
          </p>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="given-name"
              name="given-name"
              label="First Name"
              type="text"
              autoComplete="given-name"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="family-name"
              name="family-name"
              label="Last Name"
              type="text"
              autoComplete="family-name"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              margin="normal"
              fullWidth
            />
            <TextField
              required
              id="message"
              name="message"
              label="Message"
              type="text"
              margin="normal"
              fullWidth
              multiline
              rows={4}
            />
            <input type="checkbox" name="botcheck" className="hidden" />
            <Button type="submit" variant="contained" color="primary" className="!mt-4" fullWidth>
              Send Message
            </Button>
          </form>
        </Paper>
        <ToastContainer />
      </div>
    </>
  );
}

export default Contact;
