export default function FeatureCard({ title, desc }) {
  return (
    <div className="border rounded-xl p-6 text-center bg-white shadow-sm">
      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
