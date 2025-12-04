import ProductCard from "./ProductCard";

const sample = [
  { id: 1, name: "Nước mắm Phú Quốc", price: 8.5, image: "/images/nuoc-mam.jpg" },
  { id: 2, name: "Cà phê G7", price: 4.2, image: "/images/cafe-g7.jpg" },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sample.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
