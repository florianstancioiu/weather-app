import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexPage from "./pages/Index";

// TODO: Remove this after finishing the unit tests
/*
import getMockDataForFetch from "./utils/tests/getMockDataForFetch";

function Test() {
  getMockDataForFetch();
  return <div></div>;
}
*/

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexPage />
  </StrictMode>
);
