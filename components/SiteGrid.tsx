import React from "react";

export type Site = {
  name: string;
  url: string;
  description: string;
  image: string;
};

type SiteGridProps = {
  sites: Site[];
};

export default function SiteGrid({ sites }: SiteGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((site) => (
        <a
          key={site.url}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group relative p-6 bg-white rounded-xl border border-slate-200
            transition-all duration-300 ease-out
            hover:border-blue-500 hover:shadow-xl hover:-translate-y-1
            flex flex-col
          "
        >
          <img
            src={site.image}
            alt={site.name}
            className="rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
          />

          <h3 className="text-xl font-semibold mb-2 text-slate-900 transition-colors group-hover:text-blue-600">
            {site.name}
          </h3>

          <p className="text-slate-600 flex-1">{site.description}</p>

          <span className="
            mt-4 text-sm font-medium text-blue-600 opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0
            transition
          ">
            Xem trang web →
          </span>
        </a>
      ))}
    </div>
  );
}
