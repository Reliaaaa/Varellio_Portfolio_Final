import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { SkillsPage } from "./components/SkillsPage";
import { ProjectsPage } from "./components/ProjectsPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
