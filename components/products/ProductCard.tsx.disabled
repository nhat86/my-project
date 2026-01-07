import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Image
        src={product.image}
        width={300}
        height={300}
        alt={product.name}
        className="rounded"
      />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-red-500 font-bold">{product.price} €</p>
    </div>
  );
}
