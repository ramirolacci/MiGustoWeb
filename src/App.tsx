import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Revista from './components/Revista';
import Footer from './components/Footer';
import Sucursales from './components/Sucursales';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <Navbar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Revista />} />
            <Route path="/sucursales" element={<Sucursales />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
