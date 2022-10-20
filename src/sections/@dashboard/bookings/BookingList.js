import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopBookingCard from './BookingCard';

// ----------------------------------------------------------------------

BookingList.propTypes = {
  bookings: PropTypes.array.isRequired
};

export default function BookingList({ bookings, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {bookings.map((booking) => (
        <Grid key={booking.id} item xs={12} sm={6} md={3}>
          <ShopBookingCard booking={booking} />
        </Grid>
      ))}
    </Grid>
  );
}
