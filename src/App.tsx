import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Revista from './components/Revista';
import Footer from './components/Footer';
import Sucursales from './components/Sucursales';
import Productos from './components/Productos';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carta" element={<Revista />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/productos" element={<Productos />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
