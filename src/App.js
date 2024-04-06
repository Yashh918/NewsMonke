import React, { Component } from "react";
import { Navbar } from "./components/Navbar";
import { News } from "./components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<News pageSize={12} key="a" country="in" category="general" />} />
            <Route path="/business" element={<News pageSize={12} key="b" country="in" category="business" />} />
            <Route path="/entertainment" element={<News pageSize={12} key="c" country="in" category="entertainment" />} />
            <Route path="/health" element={<News pageSize={12} key="d" country="in" category="health" />} />
            <Route path="/science" element={<News pageSize={12} key="e" country="in" category="science" />} />
            <Route path="/sports" element={<News pageSize={12} key="f" country="in" category="sports" />} />
            <Route path="/technology" element={<News pageSize={12} key="g" country="in" category="technology" />} />
          </Routes>

        </Router>
      </div>
    );
  }
}
