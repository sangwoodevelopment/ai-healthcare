import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HospitalCard from "../../components/HospitalCard";
import { searchHospitals } from "../../api/hospitalApi";
import {
    getFavorites,
    addFavorite as addFavoriteApi,
} from "../../api/favoriteApi";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";

function HospitalPage() {
    const [keyword, setKeyword] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            const ids = response.data.data.map((favorite) => favorite.hospitalId);
            setFavoriteIds(ids);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchHospitals = async () => {
        try {
            setLoading(true);
            const response = await searchHospitals(keyword);
            setHospitals(response.data.data.content);
        } catch (error) {
            alert("병원 검색 실패");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFavorite = async (hospitalId) => {
        try {
            await addFavoriteApi(hospitalId);

            setFavoriteIds((prev) =>
                prev.includes(hospitalId) ? prev : [...prev, hospitalId]
            );
        } catch (error) {
            alert("즐겨찾기 추가 실패");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-2">🏥 병원 검색</h1>
                <p className="text-slate-500 mb-8">
                    병원명, 지역, 병원 유형으로 검색할 수 있습니다.
                </p>

                <div className="bg-white rounded-2xl shadow p-6 mb-8 flex gap-3">
                    <input
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="예: 서울, 종합병원, 성빈센트"
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                        onClick={handleSearchHospitals}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-400"
                    >
                        {loading ? "검색 중..." : "검색"}
                    </button>
                </div>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid gap-4">
                        {hospitals.map((hospital) => (
                            <HospitalCard
                                key={hospital.id}
                                hospital={hospital}
                                rightArea={
                                    <button
                                        onClick={() => handleAddFavorite(hospital.id)}
                                        className={`h-fit text-3xl transition hover:scale-110 ${
                                            favoriteIds.includes(hospital.id)
                                                ? "text-yellow-500"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {favoriteIds.includes(hospital.id) ? "★" : "☆"}
                                    </button>
                                }
                            />
                        ))}
                    </div>
                )}

                {!loading && hospitals.length === 0 && (
                    <div className="text-center text-slate-500 mt-12">
                        검색 결과가 없습니다.
                    </div>
                )}
            </main>
        </div>
    );
}

export default HospitalPage;