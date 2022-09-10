/** @jsxImportSource @emotion/react */
import { LogoutOutlined } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import newLogo from 'src/assets/images/newLogo.png';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Notifications from 'src/components/notifications/Notifications';
import { drawerWidth } from 'src/constants/styleConstants';
import { useAuthContext, useLayoutContext } from 'src/context';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'block',
  position: 'fixed',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DRAWER_ITEMS = [
  {
    route: '/users',
    literal: 'Users',
    Icon: SupervisedUserCircleIcon,
  },
  {
    route: '/customer',
    literal: 'Customer',
    Icon: EmojiPeopleIcon,
  },
  {
    route: '/supplier',
    literal: 'Supplier',
    Icon: TransferWithinAStationIcon,
  },
  {
    route: '/product',
    literal: 'Product',
    Icon: CategoryIcon,
  },
  {
    route: '/invoice',
    literal: 'Invoice',
    Icon: ReceiptIcon,
  },
  {
    route: '/purchase',
    literal: 'Purchase',
    Icon: AccountBalanceWalletIcon,
  },
  // {
  //   route: '/create-sale',
  //   literal: 'Create Sale',
  //   Icon: AddIcon,
  // },
];

const mainListItems = (
  <>
    {DRAWER_ITEMS.map(({ route, literal, Icon }) => (
      <Link to={route} key={literal} css={{ textDecoration: 'none', color: 'black' }}>
        <ListItemButton
          classes={{
            root: { background: 'red' },
            selected: { background: 'green' },
          }}
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={literal} />
        </ListItemButton>
      </Link>
    ))}
  </>
);
const Header = () => {
  const { isDrawerOpened, toggleDrawer } = useLayoutContext();

  const { user, logout } = useAuthContext();

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <AppBar open={isDrawerOpened}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(isDrawerOpened && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <IconButton>
              <a href="#" target="_blank" rel="noreferrer">
                <img alt="sales-manager-icon" src={newLogo} width="80" height="50" />
              </a>
              <b>Billing Master </b>
            </IconButton>
            {/* Home */}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            {user?.displayName || '-'} ( {user?.role || '-'} )
          </Typography>
          <div css={{ position: 'relative' }}>
            <Notifications open={open} setOpen={setOpen} />
          </div>
          <IconButton sx={{ ml: 1 }} onClick={logout} color="inherit">
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ position: 'fixed' }} open={isDrawerOpened}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
