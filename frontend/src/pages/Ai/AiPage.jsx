import { useState } from "react";
import Header from "../../components/Header";
import {analyzeSymptom} from "../../api/aiApi.js";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

function AiPage() {
    const [symptom, setSymptom] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        try {
            setLoading(true);

            const response = await analyzeSymptom(symptom);

            setResult(response.data.data);
        } catch (error) {
            alert("AI 분석 실패");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <Header/>

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-2">🤖 AI 증상 분석</h1>
                <p className="text-slate-500 mb-8">
                    증상을 입력하면 추천 병원을 안내합니다.
                </p>

                <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <textarea
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
              rows={6}
              placeholder="예: 머리가 아프고 열이 나요"
              className="w-full border border-slate-300 rounded-xl p-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !symptom}
                        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-400"
                    >
                        {loading ? "분석 중..." : "AI 분석하기"}
                    </button>
                </div>
                {loading && <LoadingSpinner />}
                {result && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-bold mb-4">🩺 분석 결과</h2>

                            <p className="mb-2">
                                <span className="font-semibold">추천 진료/병원 유형: </span>
                                {result.recommendedDepartment}
                            </p>

                            <p className="text-slate-600">
                                <span className="font-semibold text-slate-800">추천 이유: </span>
                                {result.reason}
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-bold mb-4">🏥 추천 병원</h2>

                            {result.hospitals?.length > 0 ? (
                                <div className="grid gap-4">
                                    {result.hospitals.map((hospital) => (
                                        <div
                                            key={hospital.id}
                                            className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50"
                                        >
                                            <h3 className="font-bold text-lg">🏥 {hospital.name}</h3>
                                            <p className="text-slate-600 mt-1">📍 {hospital.address}</p>
                                            <p className="text-slate-500 mt-1">☎ {hospital.phoneNumber}</p>
                                            <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                {hospital.department}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500">추천 병원이 없습니다.</p>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default AiPage;