import { BrowserRouter } from "react-router-dom";
import Content from "./layout/Content";
import Header from "./layout/Header";
// import Content from "./layout/Content";
// import ReactGA from "react-ga";
import {
  DEFAULT_BOARD_STATUSES,
  FOOTER_HEIGHT,
  TOP_BAR_HEIGHT,
} from "src/constants";

// const TRACKING_ID = "UA-238475580-1"; // OUR_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Content />
      </BrowserRouter>
    </>
  );
}

export default App;
