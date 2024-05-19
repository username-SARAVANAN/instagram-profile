import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Instagram from "./components/Instagram";
import ScrollToTop from "./components/ScrollToTop";
import ContentArea from "./components/ContentArea";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/instagram-profile" element={<Instagram />}>
          <Route index element={<ContentArea />} />
          <Route path="/instagram-profile/reels" element={<ContentArea />} />
          <Route path="/instagram-profile/feed" element={<ContentArea />} />
          <Route path="/instagram-profile/tagged" element={<ContentArea />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
