import { Route, Routes } from "react-router-dom";
import StudentCollection from "../components/pages/students/Student";
// import PropertyCollection from "../components/pages/property/PropertyCollection";
// import PropertyDetails from "../components/pages/property/PropertyDetails";
import { Box } from "@mui/material";
// import ImageGallery from "../components/ImageGallery";
// import ReactGA from "react-ga";
import { useEffect } from "react";

const Content = () => {
  return (
    <>
      {/* <Box>
        <Link to="/manage-properties">Properties</Link>
      </Box> */}
      <Routes>
        <Route exact path="/manage-students" element={<StudentCollection />} />
        {/* <Route
          exact
          path="/:city/:area/:propertyId"
          element={<PropertyDetails />}
        ></Route>
        <Route
          exact
          path="/:city/:area/:propertyId/images"
          element={<ImageGallery />}
        ></Route> */}
      </Routes>
    </>
  );
};

export default Content;
