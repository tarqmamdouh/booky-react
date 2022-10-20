import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import BookingList from '../sections/@dashboard/bookings/BookingList';
// mock
import BOOKINGS from '../_mock/bookings';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Page title="New Booking">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Available Bookings
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <BookingFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <BookingSort />
          </Stack>
        </Stack> */}

        <BookingList bookings={BOOKINGS} />
      </Container>
    </Page>
  );
}
