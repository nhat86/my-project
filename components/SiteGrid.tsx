type Site = {
  name: string;
  url: string;
  image: string;
  description: string;
};

export default function SiteGrid({ sites }: { sites: Site[] }) {
  const total = sites.length;

  // Helper căn giữa hàng cuối
  const getColStart = (rowLength: number) => {
    if (rowLength === 2 || rowLength === 1) return 2; // 2 hoặc 1 card → bắt đầu cột 2
    return 1; // 3 card → bắt đầu cột 1
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site, idx) => {
        const isLastRow = idx >= Math.floor(total / 3) * 3;
        const remaining = total % 3 || 3; // số card hàng cuối
        const colStart = isLastRow && remaining < 3 ? getColStart(remaining) : 1;

        return (
          <a
            key={idx}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-white rounded-xl shadow-md hover:shadow-xl hover:bg-gray-50 transition overflow-hidden
              ${isLastRow && remaining < 3 && idx % 3 === 0 ? `lg:col-start-${colStart}` : ""}`}
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-50">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-600">{site.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{site.description}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
