// import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Charts from "./Charts";

function App() {
  return (
    <Router basename="/ContactNChart_Appliaction">
      <Routes>
        <Route
          path="/"
          element={
            <div className="md:flex-1">
              <div className="container text-black p-24 text-center">
                <p className="text-6xl my-24">
                  <strong>Ahoy! Welcome Aboard.</strong>
                </p>
                <p className="text-lg">
                  <span>Go to </span>
                  <a href="/contact" className="text-blue-500 underline">
                    Contacts{" "}
                  </a>
                  <span>or </span>
                  <a href="/charts" className="text-blue-500 underline">
                    Charts
                  </a>
                </p>
              </div>
            </div>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </Router>
  );
}

export default App;
