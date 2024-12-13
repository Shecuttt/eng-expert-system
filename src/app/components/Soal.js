"use client";
import React, { useState } from "react";
import { soal } from "@/data/soal";
import { solusi } from "@/data/solusi";
import { rules } from "@/data/rules";
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
        const currentProblemId = soal[currentIndex].id; // Ambil ID soal saat ini
        setAnswers({ ...answers, [currentProblemId]: answer });
    };

    const checkRepeatedAnswers = () => {
        const values = Object.values(answers);
        if (values.length < 3) return false; // Tidak cukup jawaban untuk pola
        const lastThree = values.slice(-3);
        return lastThree.every((val) => val === lastThree[0]); // Semua jawaban sama
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
        if (checkRepeatedAnswers()) {
            setShowResult(true);
        } else if (currentIndex < soal.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (!showResult) {
                await handleAddHistory();
                setShowResult(true);
            }
        }
    };

    const calculateCertaintyFactor = () => {
        let calculatedCF = {};

        // Iterasi semua rules
        rules.forEach((rule) => {
            if (answers[rule.masalah]) {
                let userCF = 0;

                // Nilai CF dari pengguna berdasarkan jawaban
                switch (answers[rule.masalah]) {
                    case "Ya":
                        userCF = 1.0;
                        break;
                    case "Mungkin iya":
                        userCF = 0.7;
                        break;
                    case "Mungkin tidak":
                        userCF = 0.4;
                        break;
                    case "Tidak":
                        userCF = 0.0;
                        break;
                }

                // Hitung CF total (pakar dan pengguna)
                const combinedCF = rule.cf * userCF;

                // Gabungkan nilai CF untuk solusi terkait
                if (calculatedCF[rule.solusi]) {
                    calculatedCF[rule.solusi] =
                        calculatedCF[rule.solusi] +
                        combinedCF * (1 - calculatedCF[rule.solusi]);
                } else {
                    calculatedCF[rule.solusi] = combinedCF;
                }
            }
        });

        return calculatedCF;
    };

    // Hitung Certainty Factor dan menampilkan solusi
    const calculateSolution = () => {
        const certaintyFactors = calculateCertaintyFactor();

        // Urutkan solusi berdasarkan nilai CF tertinggi
        const sortedSolutions = Object.entries(certaintyFactors)
            .sort(([, cfA], [, cfB]) => cfB - cfA)
            .map(
                ([solusiId]) =>
                    solusi.find((s) => s.id === solusiId)?.description
            );

        return sortedSolutions;
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
