"use client";
import React, { useState } from "react";
import { soal } from "@/data/soal";
import { solusi } from "@/data/solusi";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";

export const addHistory = async (token, action) => {
    try {
        const res = await fetch("api/history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ action }),
        });

        if (!res.ok) throw new Error("Failed to add history");

        return await res.json();
    } catch (error) {
        console.error("Error adding history:", error);
        throw error;
    }
};

export default function Soal() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    // Fungsi untuk mengubah index soal
    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [currentIndex]: answer });
    };

    // Tambahkan history baru ke database
    const handleAddHistory = async () => {
        const token = Cookies.get("token");
        const recommendedSolutions = calculateSolution(); // Hitung solusi

        // Format data untuk disimpan (string)
        const historyData = {
            action: JSON.stringify(recommendedSolutions.map(String).join(" ")), // Simpan solusi yang direkomendasikan ke format string
        };

        try {
            await addHistory(token, historyData.action); //fungsi add history untuk disimpan ke database
            Swal.fire({
                title: "Berhasil",
                text: "Riwayat anda telah disimpan!",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Failed to save history:", error);
        }
    };

    // Fungsi untuk pindah ke soal berikutnya
    const handleNext = async () => {
        if (currentIndex < soal.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Cek history sudah disimpan belum
            if (!showResult) {
                // Simpan history ke database setelah soal terakhir
                await handleAddHistory();
                setShowResult(true); // Menampilkan hasil setelah semua soal selesai
            }
        }
    };

    // Hitung Certainty Factor dan menampilkan solusi
    const calculateSolution = () => {
        let score = 0;

        // Menghitung skor berdasarkan jawaban
        Object.values(answers).forEach((answer) => {
            if (answer === "Ya") score += 1;
            else if (answer === "Mungkin") score += 0.7;
            else if (answer === "Mungkin tidak") score += 0.4;
        });

        // Tentukan solusi berdasarkan skor
        let recommendedSolution = [];
        if (score >= 4) {
            recommendedSolution = [solusi[0], solusi[3]];
            console.log(recommendedSolution);
        } else if (score >= 2) {
            recommendedSolution = [solusi[1], solusi[4]];
        } else {
            recommendedSolution = [solusi[2]];
        }

        return recommendedSolution.map((solution) => solution.description);
    };

    const slideVariants = {
        initial: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
            transition: { duration: 0.5 },
        }),
    };

    return (
        <div className="lg:w-1/2 mt-32 lg:mt-0 flex flex-col space-y-6">
            {/* jika belum waktunya menunjukkan hasil, maka tampilkan pertanyaan */}
            {!showResult ? (
                <>
                    <AnimatePresence custom={1} initial={false} mode="wait">
                        <motion.div
                            key={currentIndex}
                            variants={slideVariants}
                            custom={1} // Direction of slide (1 = forward, -1 = backward)
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-6">
                                <p className="text-xs text-white mb-3">
                                    Soal {currentIndex + 1} dari {soal.length}
                                </p>
                                <p className="text-white font-medium text-lg">
                                    {soal[currentIndex].description}
                                </p>
                            </div>

                            {/* Answer button group */}
                            <div className="bg-black/5 shadow-sm backdrop-blur-lg rounded-xl p-4 flex flex-col mt-4">
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
                                        handleAnswer("Mungkin iya");
                                        handleNext();
                                    }}
                                >
                                    Mungkin Iya
                                </button>
                                <button
                                    className="p-2 text-white hover:bg-white/10 rounded-lg"
                                    onClick={() => {
                                        handleAnswer("Mungkin tidak");
                                        handleNext();
                                    }}
                                >
                                    Mungkin Tidak
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
                        </motion.div>
                    </AnimatePresence>
                </>
            ) : (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
                    <h2 className="text-2xl text-gray-100">Hasil Diagnosis</h2>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold">
                            Solusi yang Disarankan
                        </h3>
                        <ul className="mt-3 text-white space-y-2 text-left">
                            {calculateSolution().map((solution, index) => (
                                <li key={index}>{solution}</li>
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
