"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("testHistory")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Riwayat Tes</h1>
      {history.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat tes.</p>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-lg shadow-md text-gray-200"
            >
              <h3 className="text-lg font-semibold">Tes {index + 1}</h3>
              <p className="text-sm">Tanggal: {item.date}</p>
              <p className="text-sm">Jawaban: {item.answers.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
