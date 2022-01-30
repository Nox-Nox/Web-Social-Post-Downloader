import { Route, Routes } from "react-router-dom";
import AnyPage from "./pages/AnyPage";
import TwitterPage from "./pages/TwitterPage";
import InstagramPage from "./pages/InstagramPage";
import Layout from "./layout/layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/anyPage" exact element={<AnyPage />} />
        <Route path="/twitterPage" element={<TwitterPage />} />
        <Route path="/instagramPage" element={<InstagramPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
