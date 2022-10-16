// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Bookings',
    path: '/dashboard/bookings',
    icon: getIcon('eva:inbox-fill'),
  },
  {
    title: 'My Bookings',
    path: '/dashboard/mybookings',
    icon: getIcon('eva:list-fill'),
  }
];

export default navConfig;
