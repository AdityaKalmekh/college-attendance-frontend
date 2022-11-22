/** @jsxImportSource @emotion/react */
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import Button from "@mui/material/Button";
import SalesManager from "../../assets/images/newLogo.png";
import { Alert, Avatar, Box, Grid } from "@mui/material";
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
  createButtonBox,
} from "./loginStyles";
import LoginWithUserNamePassword from "./LoginWithUserNamePassword";
import SignupForm from "../../pages/Signup/SignupForm";

const LoginForm = () => {
  const { googleLogin, userNotExistInDb } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleSignup = () => {
    setOpen((current) => !current);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={loginBackgroundImage}>
      <Box sx={loginSection}>
        <Box sx={loginSectionContainer}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={userContainer}>
                    <Box sx={userContainerImageBox}>
                      <Avatar
                        sx={userContainerImage}
                        alt="sales-manager-icon"
                        src={SalesManager}
                      />
                    </Box>
                  </Box>
                </Grid>
                {open ? (
                  <Grid item md={6} xs={12} sx={{ mt: 8 }}>
                    <Box sx={fieldsFormContainer}>
                      <SignupForm />
                      <Button onClick={handleClickClose}>
                        Already Created Account ??
                      </Button>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item md={6} xs={12} sx={{ mt: 8 }}>
                    <Box sx={fieldsFormContainer}>
                      <LoginWithUserNamePassword />
                    </Box>
                    <Box>
                      <form>
                        <Box sx={loginButtonBox}>
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
                            {userNotExistInDb.email} do not exist in our
                            database, please contact Collage Attendence Systems
                            to provide access.
                          </Alert>
                        )}
                      </form>
                      <br />
                      <Box sx={createButtonBox}>
                        <Button variant="outlined" onClick={handleSignup}>
                          Create your Account
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
