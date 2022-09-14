/** @jsxImportSource @emotion/react */
import { useAuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
// import SalesManager from "src/assets/images/newLogo.png";
import { Alert, Avatar, Box, Grid, Typography } from "@mui/material";
import {
  loginButtonWidth,
  loginBackgroundImage,
  loginSection,
  loginSectionContainer,
  userContainer,
  userContainerImage,
  userContainerImageBox,
  loginButtonBox,
  fieldsFormContainer,
} from "./loginStyles";
import LoginWithUserNamePassword from "./LoginWithUserNamePassword";

const LoginForm = () => {
  const { googleLogin, userNotExistInDb } = useAuthContext();

  return (
    <Box sx={loginBackgroundImage}>
      <Box sx={loginSection}>
        <Box sx={loginSectionContainer}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {/* <Grid item xs={6}>
                  <Box sx={userContainer}> */}
                {/* <Box sx={userContainerImageBox}> */}
                {/* <Avatar sx={userContainerImage} height="500px" alt="sales-manager-icon" src={SalesManager} /> */}
                {/* </Box> */}
                {/* </Box>
                </Grid> */}
                <Grid item md={12} xs={12} sx={{ mt: 8 }}>
                  <Box sx={fieldsFormContainer}>
                    {/* <LoginWithUserNamePassword /> */}
                  </Box>
                  <Box>
                    <form>
                      <Box sx={loginButtonBox}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                        >
                          Collage Attendence Systems
                        </Typography>
                        <Button
                          sx={loginButtonWidth}
                          variant="contained"
                          className="buttonWidth"
                          onClick={() => googleLogin()}
                        >
                          {" "}
                          Google login
                        </Button>
                      </Box>
                      {userNotExistInDb && (
                        <Alert severity="error" sx={{ textAlign: "left" }}>
                          {userNotExistInDb.email} do not exist in our database,
                          please contact Newton Systems to provide access.
                        </Alert>
                      )}
                    </form>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
