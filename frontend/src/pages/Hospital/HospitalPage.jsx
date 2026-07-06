import {useEffect, useState} from "react";
import api from "../../api/api";
import Header from "../../components/Header";

function HospitalPage() {
    const [keyword, setKeyword] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const searchHospitals = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("accessToken");

            const response = await api.get("/api/hospitals", {
                params: {
                    keyword,
                    page: 0,
                    size: 10,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHospitals(response.data.data.content);
        } catch (error) {
            alert("병원 검색 실패");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addFavorite = async (hospitalId) => {
        try {
            const token = localStorage.getItem("accessToken");

            await api.post(
                `/api/favorites/${hospitalId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavoriteIds((prev) => [...prev, hospitalId]);
        } catch (error) {
            alert("즐겨찾기 추가 실패");
            console.error(error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await api.get("/api/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const ids = response.data.data.map((favorite) => favorite.hospitalId);
            setFavoriteIds(ids);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Header/>

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
                        onClick={searchHospitals}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-400"
                    >
                        {loading ? "검색 중..." : "검색"}
                    </button>
                </div>

                <div className="grid gap-4">
                    {hospitals.map((hospital) => (
                        <div
                            key={hospital.id}
                            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50"
                        >
                            <div className="flex justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold">{hospital.name}</h2>
                                    <p className="text-slate-600 mt-2">{hospital.address}</p>
                                    <p className="text-slate-500 mt-1">{hospital.phoneNumber}</p>

                                    <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {hospital.department}
                  </span>
                                </div>

                                <button
                                    onClick={() => addFavorite(hospital.id)}
                                    className={`h-fit text-3xl transition hover:scale-110 ${
                                        favoriteIds.includes(hospital.id)
                                            ? "text-yellow-500"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {favoriteIds.includes(hospital.id) ? "★" : "☆"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {hospitals.length === 0 && (
                    <div className="text-center text-slate-500 mt-12">
                        검색 결과가 없습니다.
                    </div>
                )}
            </main>
        </div>
    );
}

export default HospitalPage;