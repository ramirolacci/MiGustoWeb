import './App.css'
import NavBar from './components/NavBar'
import HTMLFlipBook from 'react-pageflip'

const catalogoFotos = [
  '/catalogo/1.jpg',
  '/catalogo/2.jpg',
  '/catalogo/3.jpg',
  '/catalogo/4.jpg',
  '/catalogo/5.jpg',
  '/catalogo/6.jpg',
  '/catalogo/7.jpg',
  '/catalogo/8.jpg',
  '/catalogo/9.jpg',
  '/catalogo/10.jpg',
  '/catalogo/11.jpg',
  '/catalogo/12.jpg',
];

function App() {
  return (
    <>
      <NavBar />
      <main className="revista-container">
        <HTMLFlipBook
          width={420}
          height={600}
          size="stretch"
          minWidth={280}
          maxWidth={700}
          minHeight={400}
          maxHeight={900}
          drawShadow={true}
          showCover={true}
          mobileScrollSupport={true}
          className="revista-flipbook"
        >
          {catalogoFotos.map((src, i) => (
            <div className="revista-pagina" key={i}>
              <img src={src} alt={`catalogo-${i+1}`} className="revista-img" />
            </div>
          ))}
        </HTMLFlipBook>
      </main>
    </>
  )
}

export default App
