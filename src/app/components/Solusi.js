import React from "react";

export default function Solusi({ solutions }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
      <h2 className="text-2xl text-gray-100">Hasil Diagnosis</h2>
      <div className="p-4">
        <h3 className="text-xl font-semibold">Solusi yang Disarankan</h3>
        <ul className="mt-3 text-white space-y-2">
          {solutions.map((solution, index) => (
            <li key={index}>{solution.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
