import { Box } from "@mui/material";
import LoginPage from "../pages/login";
import { useAuthContext, useLayoutContext } from "../context";
import {
  DRAWER_OPENED_WIDTH,
  DRAWER_CLOSED_WIDTH,
  TOP_BAR_HEIGHT,
  FOOTER_HEIGHT,
} from "../constants";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const AppLayout = () => {
  const { user } = useAuthContext();
  const { isDrawerOpened } = useLayoutContext();
  if (!user) {
    return <LoginPage />;
  }
  return (
    <>
      <Header />
      <Box
        sx={{
          ml: isDrawerOpened ? DRAWER_OPENED_WIDTH : DRAWER_CLOSED_WIDTH,
          mt: TOP_BAR_HEIGHT,
          mb: FOOTER_HEIGHT,
          p: 1,
        }}
      >
        <Content />
      </Box>
      <Footer />
    </>
  );
};

export default AppLayout;
