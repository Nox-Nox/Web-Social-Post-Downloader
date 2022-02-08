import { Route, Routes } from "react-router-dom";
import TwitterPage from "./pages/TwitterPage";
import InstagramPage from "./pages/InstagramPage";
import Layout from "./layout/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/twitterPage" exact element={<TwitterPage />} />
        <Route path="/instagramPage" element={<InstagramPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
