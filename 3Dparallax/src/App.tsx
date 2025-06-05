import { CardBody, CardContainer, CardItem } from "./3d-parallax";
import { products } from "./data.json";

export default function App() {
  return (
    <div className="h-screen bg-black bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ED813C]/2 from-0% via-black via-30% to-black flex items-center justify-center">
      <div className="flex gap-8">
        {products.map((product, index) => (
          <CardContainer key={index} className="inter-var">
            <CardBody className="group/card flex flex-col items-center gap-8 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 p-8 max-w-[400px] min-h-[600px] border-[0.5px] border-zinc-800 transition-all duration-300 hover:border-[#ED813C]/20">
              <CardItem
                translateZ="200"
                className="w-full"
              >
                <img
                  src={product.src}
                  className="h-[280px] w-full rounded-xl object-contain"
                  alt={product.title}
                />
              </CardItem>

              <CardItem
                translateZ="100"
                className="text-3xl font-bold text-[#ED813C] text-center px-4"
              >
                {product.title}
              </CardItem>

              <CardItem
                translateZ="150"
                className="text-sm font-medium text-[#F5E6D3] text-center max-w-md px-4 leading-relaxed"
                component="p"
              >
                {product.description}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
}
