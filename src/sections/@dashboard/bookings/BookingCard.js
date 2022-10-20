import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Cookies from 'cookies-js';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import BookingConfirmation from './BookingConfirmation';
import { createBooking } from '../../../api/booking';

// ----------------------------------------------------------------------

const BookingImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopBookingCard.propTypes = {
  booking: PropTypes.array,
};

export default function ShopBookingCard({ booking, date, interval }) {

  const [bookingSelected, setBookingSelected] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(undefined);
  const navigate = useNavigate();

  const openConfirmationDialog = () => {
    setBookingSelected(true);
  }

  const closeConfirmationDialog = () => {
    setBookingSelected(false);
  }

  const confirmAndBook = (name, description) => {
    createBooking({
      booking: {
        name,
        description,
        start: moment.utc(booking[0]).format('DD-MM-YYYY HH:mmA'),
        end: moment.utc(booking[1]).format('DD-MM-YYYY HH:mmA'),
        user_id: Cookies.get('user_id')
      }, date: moment(date).format('DD-MM-YYYY'), interval
    }).then(() => {
        setBookingStatus(['success', 'Booked Successfully'])
        // navigate('/dashboard/myBookings', { replace: false });
    }).catch(err => {
      setBookingStatus(['error', `Booked not completed: ${err.response.data.join(',')}`])
    });

    setBookingSelected(false);
  }

  return (
    <>
      <Card>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <BookingImgStyle src="https://lowshiprate.com/wp-content/uploads/2018/11/logistics-2.png" />
        </Box>

        <Stack spacing={2} sx={{ p: 2 }}>
          {bookingStatus && <Stack direction="row" alignItems="center">
            <Alert severity={bookingStatus[0]}>{ bookingStatus[1] }</Alert>
          </Stack>}
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
              >
                <strong>From: </strong> {moment.utc(booking[0]).format('hh:mm:ss A')}
              </Typography>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
              >
                <strong>To: </strong> {moment.utc(booking[1]).format('hh:mm:ss A').toLocaleString()}
              </Typography>
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center">
            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={openConfirmationDialog}>
              Book This
            </LoadingButton>
          </Stack>
        </Stack>
      </Card>
      { bookingSelected && <BookingConfirmation isOpen={bookingSelected} onClose={closeConfirmationDialog} onConfirm={confirmAndBook}/>}
    </>
  );
}
