import NavBar from './components/NavBar';
import Revista from './components/Revista';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>

      <main>
        <Revista />
      </main>

      <Footer />
    </div>
  );
}

export default App;
