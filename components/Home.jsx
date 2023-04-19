import React from "react";
import { useState } from "react";

export default function Home() {
  const [counter, set] = useState(1);
  return (
    <>
      <p>{counter}</p>
      <button
        onClick={() => {
          set((c) => c + 1);
          console.log("Working");
        }}
      >
        Aumentar
      </button>
    </>
  );
}
