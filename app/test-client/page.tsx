"use client";

import { useState } from "react";

export default function TestClient() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <button
        className="p-2 border"
        onClick={() => setCount(count + 1)}
      >
        Click: {count}
      </button>
    </div>
  );
}
