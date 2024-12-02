"use client";
import React, { useState } from "react";
import { soal } from "@/data/soal";
import { solusi } from "@/data/solusi";

export default function Soal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Fungsi untuk mengubah index soal
  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  // Fungsi untuk pindah ke soal berikutnya
  const handleNext = () => {
    if (currentIndex < soal.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true); // Menampilkan hasil setelah semua soal selesai
    }
  };

  // hitung Certainty Factor dan menampilkan solusi
  const calculateSolution = () => {
    let score = 0;

    // Menghitung skor berdasarkan jawaban
    Object.values(answers).forEach((answer) => {
      if (answer === "Ya") score += 1;
      else if (answer === "Mungkin") score += 0.5;
    });

    // Tentukan solusi berdasarkan skor
    let recommendedSolution = [];
    if (score >= 4) {
      recommendedSolution = [solusi[0], solusi[3]];
    } else if (score >= 2) {
      recommendedSolution = [solusi[1], solusi[4]];
    } else {
      recommendedSolution = [solusi[2]];
    }

    return recommendedSolution;
  };

  return (
    <div className="w-1/2 flex flex-col space-y-6">
      <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-6">
        {/* soal sekarang dari jumlah soal */}
        <p className="text-xs text-white mb-3">
          Soal {currentIndex + 1} dari {soal.length}
        </p>

        {/* teks soal */}
        <p className="text-white font-medium text-lg">
          {soal[currentIndex].description}
        </p>
      </div>

      {/* opsi jawaban */}
      <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-4 flex flex-col">
        <button
          className="p-2 text-white hover:bg-white/10 rounded-lg"
          onClick={() => {
            handleAnswer("Ya");
            handleNext();
          }}
        >
          Ya
        </button>
        <button
          className="p-2 text-white hover:bg-white/10 rounded-lg"
          onClick={() => {
            handleAnswer("Mungkin");
            handleNext();
          }}
        >
          Mungkin
        </button>
        <button
          className="p-2 text-white hover:bg-white/10 rounded-lg"
          onClick={() => {
            handleAnswer("Tidak");
            handleNext();
          }}
        >
          Tidak
        </button>
      </div>

      {/* hasil atau solusi */}
      {showResult && (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
          <h2 className="text-2xl text-gray-100">Hasil Diagnosis</h2>
          <div className="p-4">
            <h3 className="text-xl font-semibold">Solusi yang Disarankan</h3>
            <ul className="mt-3 text-white space-y-2">
              {calculateSolution().map((solution, index) => (
                <li key={index}>{solution.description}</li>
              ))}
            </ul>
          </div>
          <button
            className="p-2 text-white hover:bg-white/10"
            onClick={() => {
              setAnswers({});
              setCurrentIndex(0);
              setShowResult(false);
            }}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
