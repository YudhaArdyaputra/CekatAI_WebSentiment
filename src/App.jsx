import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import LiveDemo from './pages/LiveDemo';
import ResearchInsights from './pages/ResearchInsights';
import Methodology from './pages/Methodology';
import './App.css';

import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full bg-slate-50 dark:bg-black min-h-screen flex flex-col transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <ThemeToggle />
      <main className="pt-28 md:pt-28 px-4 pb-12 max-w-7xl mx-auto w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<LiveDemo />} />
          <Route path="/research" element={<ResearchInsights />} />
          <Route path="/methodology" element={<Methodology />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
