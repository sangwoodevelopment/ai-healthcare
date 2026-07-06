import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getAiHistories } from "../../api/aiApi";

function HistoryPage() {
    const [histories, setHistories] = useState([]);

    const fetchHistories = async () => {
        try {
            const response = await getAiHistories();
            setHistories(response.data.data);
        } catch (error) {
            alert("AI 분석 이력 조회 실패");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchHistories();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-2">🕓 AI 분석 이력</h1>
                <p className="text-slate-500 mb-8">이전에 분석한 증상 기록입니다.</p>

                <div className="grid gap-4">
                    {histories.map((history) => (
                        <div key={history.id} className="bg-white rounded-2xl shadow p-6">
                            <p className="text-sm text-slate-400 mb-2">
                                {history.createdAt}
                            </p>

                            <h2 className="text-lg font-bold mb-2">
                                증상: {history.symptom}
                            </h2>

                            <p className="text-blue-600 font-semibold">
                                추천: {history.recommendedDepartment}
                            </p>

                            <p className="text-slate-600 mt-2">{history.reason}</p>
                        </div>
                    ))}
                </div>

                {histories.length === 0 && (
                    <div className="text-center text-slate-500 mt-12">
                        분석 이력이 없습니다.
                    </div>
                )}
            </main>
        </div>
    );
}

export default HistoryPage;