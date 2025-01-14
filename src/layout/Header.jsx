/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource @emotion/react */
import { LogoutOutlined } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import newLogo from "../assets/images/newLogo.png";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import DomainIcon from "@mui/icons-material/Domain";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AssessmentIcon from "@mui/icons-material/Assessment";
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
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { drawerWidth } from "../../src/constants/styleConstants";
import { useAuthContext, useLayoutContext } from "../context";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "block",
  position: "fixed",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const AdminDRAWER_ITEMS = [
  {
    route: "/users",
    literal: "Users",
    Icon: SupervisedUserCircleIcon,
  },
  {
    route: "/branch",
    literal: "Branch",
    Icon: DomainIcon,
  },
  {
    route: "/student",
    literal: "StudentDetails",
    Icon: SchoolIcon,
  },
  {
    route: "/faculty",
    literal: "Faculty",
    Icon: EmojiPeopleIcon,
  },

  {
    route: "/allocation",
    literal: "Faculty Allocation",
    Icon: AssignmentIndIcon,
  },

  {
    route: "/graph",
    literal: "Graph",
    Icon: QueryStatsIcon,
  },

  {
    route: "/report",
    literal: "report",
    Icon: AssessmentIcon,
  },
];

const FacultyDrawer_Item = [
  {
    route: "/Attendance",
    literal: "AttendenceCollection",
    Icon: AutoStoriesIcon,
  },
];

const Header = () => {
  const { isDrawerOpened, toggleDrawer } = useLayoutContext();
  const { user } = useAuthContext();

  const { logout } = useAuthContext();
  const DRAWER_ITEMS =
    user === "faculty" ? FacultyDrawer_Item : AdminDRAWER_ITEMS;
  // const [open, setOpen] = useState(false);
  const mainListItems = (
    <>
      {DRAWER_ITEMS.map(({ route, literal, Icon }) => (
        <Link
          to={route}
          key={literal}
          css={{ textDecoration: "none", color: "black" }}
        >
          <ListItemButton
            classes={{
              root: { background: "red" },
              selected: { background: "green" },
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

  return (
    <Box>
      <AppBar open={isDrawerOpened}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(isDrawerOpened && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <IconButton>
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  alt="sales-manager-icon"
                  src={newLogo}
                  width="50"
                  height="50"
                />
              </a>
              <b>Collage Attendence Systems </b>
            </IconButton>
            {/* Home */}
          </Typography>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            {user?.displayName || "-"} ( {user|| "-"} )
          </Typography>
          {/* <div css={{ position: "relative" }}>
            <Notifications open={open} setOpen={setOpen} />
          </div> */}
          <IconButton sx={{ ml: 1 }} onClick={logout} color="inherit">
            <LogoutOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{ position: "fixed" }}
        open={isDrawerOpened}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
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
