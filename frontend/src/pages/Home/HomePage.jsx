import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h2 className="text-3xl font-bold mb-8">안녕하세요 👋</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div
                        onClick={() => navigate("/ai")}
                        className="bg-white rounded-2xl shadow p-8 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="text-5xl">🤖</div>
                        <h3 className="font-bold mt-4 text-lg">AI 증상 분석</h3>
                    </div>

                    <div
                        onClick={() => navigate("/hospitals")}
                        className="bg-white rounded-2xl shadow p-8 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                        <div className="text-5xl">🏥</div>
                        <h3 className="font-bold mt-4 text-lg">병원 검색</h3>
                    </div>

                    <div
                        onClick={() => navigate("/favorites")}
                        className="bg-white rounded-2xl shadow p-8 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="text-5xl">⭐</div>
                        <h3 className="font-bold mt-4 text-lg">즐겨찾기</h3>
                    </div>

                    <div
                        onClick={() => navigate("/histories")}
                        className="bg-white rounded-2xl shadow p-8 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="text-5xl">🕓</div>
                        <h3 className="font-bold mt-4 text-lg">분석 이력</h3>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;