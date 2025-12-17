'use client'

import React from "react";

interface ProductDescriptionProps {
  title?: string | null;
  description?: string | null;
}

export default function ProductDescription({ title, description }: ProductDescriptionProps) {
  const handleTranslate = () => {
    const text = `${title ?? ""}\n${description ?? ""}`;
    const url = `https://translate.google.com/?sl=auto&tl=vi&text=${encodeURIComponent(text)}&op=translate`;
    window.open(url, "_blank"); // mở tab mới Google Translate
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{description || "Không có mô tả"}</p>

      <button
        onClick={handleTranslate}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        Dịch sang Tiếng Việt
      </button>
    </div>
  );
}
