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
          width={425}
          height={673}
          size="stretch"
          minWidth={180}
          maxWidth={600}
          minHeight={285}
          maxHeight={950}
          drawShadow={true}
          showCover={true}
          mobileScrollSupport={true}
          className="revista-flipbook"
          startPage={0}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          maxShadowOpacity={0.5}
          useMouseEvents={true}
          clickEventForward={true}
          disableFlipByClick={false}
          onFlip={() => {}}
          onChangeOrientation={() => {}}
          onChangeState={() => {}}
          autoSize={true}
          swipeDistance={30}
          showPageCorners={true}
          style={{ width: '100%', height: '100%' }}
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
