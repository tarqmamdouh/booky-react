import { useEffect, useState } from 'react';
// material
import moment from 'moment';
import { Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CachedIcon from '@mui/icons-material/Cached';

// components
import IconButton from '@mui/material/IconButton';
import Page from '../components/Page';
import BookingList from '../sections/@dashboard/bookings/BookingList';

// mock
import BOOKINGS from '../_mock/bookings';
import { list } from '../api/booking';
// ----------------------------------------------------------------------

export default function EcommerceShop() {

  const [bookingList, setBookingList] = useState([]);
  const [date, setDate] = useState(moment());
  const [interval, setInterval] = useState(15);
  const [intervalError, setIntervalError] = useState(null)

  useEffect(() => {
    searchForAvailableSlots();
  }, [])

  const handleDateChange = (event) => {
    setDate(event)
  }

  const searchForAvailableSlots = () => {
    list({date: date.format("DD-MM-YYYY"), interval}).then(response => {
      setBookingList(response.data);
    });
  }

  const handleIntervalChanges = (event) => {
    if(event.target.value < 15) {
      setIntervalError('Cannot be less than 15 minutes')
    } else if(event.target.value > 1439) {
      setIntervalError('Cannot be more than 1439 minutes')
    } else {
      setIntervalError(null)
    }
    setInterval(event.target.value);
  }

  return (
    <Page title="New Booking">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Available Bookings
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3} sx={{ mb: 5 }}>
            <Grid item xs={12} sm={6} md={3}>
              <DesktopDatePicker
                label="Booking Date"
                inputFormat="DD-MM-YYYY"
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} onBlur={searchForAvailableSlots}/>}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField value={interval} onChange={handleIntervalChanges} 
                label="Interval"
                type="number"
                InputProps={{
                  inputProps: { 
                      max: 1439, min: 15 
                  }
                }}
                helperText={intervalError}
                onBlur={searchForAvailableSlots}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <IconButton color="primary" component="label" onClick={searchForAvailableSlots}>
                <CachedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </LocalizationProvider>

        <Stack direction="row" alignItems="center">
          <BookingList bookings={bookingList} date={date} interval={interval}/>
        </Stack>
      </Container>
    </Page>
  );
}
