import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopBookingCard from './BookingCard';

// ----------------------------------------------------------------------

BookingList.propTypes = {
  bookings: PropTypes.array
};

export default function BookingList({ bookings, date, interval, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {bookings.map((booking, index) => (
        <Grid key={`${booking[0]}-${booking[1]}-${index}`} item xs={12} sm={6} md={3}>
          <ShopBookingCard booking={booking} date={date} interval={interval} />
        </Grid>
      ))}
    </Grid>
  );
}
