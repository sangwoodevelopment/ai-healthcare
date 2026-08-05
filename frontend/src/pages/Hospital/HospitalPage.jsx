import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import HospitalCard from "../../components/HospitalCard";
import { searchHospitals } from "../../api/hospitalApi";
import {
    getFavorites,
    addFavorite as addFavoriteApi,
    deleteFavorite as deleteFavoriteApi,
} from "../../api/favoriteApi";
import toast from "react-hot-toast";
import HospitalCardSkeleton from "../../components/HospitalCardSkeleton.jsx";
import EmptyState from "../../components/EmptyState.jsx";

function HospitalPage() {
    const [keyword, setKeyword] = useState("");
    const [hospitals, setHospitals] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            const ids = response.data.data.map((favorite) => favorite.hospitalId);
            setFavoriteIds(ids);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchHospitals = async (targetPage = page) => {
        try {
            setLoading(true);

            const response = await searchHospitals(keyword, targetPage, 10);

            setHospitals(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setPage(targetPage);
        } catch (error) {
            toast.error("병원 검색 실패");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchButtonClick = () => {
        handleSearchHospitals(0);
    };

    const handleToggleFavorite = async (hospitalId) => {
        try {
            if (favoriteIds.includes(hospitalId)) {
                await deleteFavoriteApi(hospitalId);

                setFavoriteIds((prev) => prev.filter((id) => id !== hospitalId));

                toast.success("즐겨찾기에서 삭제되었습니다.");
            } else {
                await addFavoriteApi(hospitalId);

                setFavoriteIds((prev) => [...prev, hospitalId]);

                toast.success("즐겨찾기에 추가되었습니다.");
            }
        } catch (error) {
            toast.error("즐겨찾기 처리 실패");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index);

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
                        onClick={handleSearchButtonClick}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-400"
                    >
                        {loading ? "검색 중..." : "검색"}
                    </button>
                </div>

                {loading ? (
                    <div className="grid gap-4">
                        {[1, 2, 3].map((item) => (
                            <HospitalCardSkeleton key={item} />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {hospitals.map((hospital) => (
                            <HospitalCard
                                key={hospital.id}
                                hospital={hospital}
                                onClick={() => navigate(`/hospitals/${hospital.id}`)}
                                rightArea={
                                    <button
                                        onClick={() => handleToggleFavorite(hospital.id)}
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
                    <EmptyState
                        icon="🔍"
                        title="검색 결과가 없습니다"
                        description="다른 병원명, 지역, 병원 유형으로 검색해보세요."
                    />
                )}

                {!loading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-10">
                        <button
                            onClick={() => handleSearchHospitals(page - 1)}
                            disabled={page === 0}
                            className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40"
                        >
                            ◀
                        </button>

                        {pageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                onClick={() => handleSearchHospitals(pageNumber)}
                                className={`w-10 h-10 rounded-lg transition ${
                                    page === pageNumber
                                        ? "bg-blue-600 text-white"
                                        : "bg-white border hover:bg-slate-100"
                                }`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => handleSearchHospitals(page + 1)}
                            disabled={page === totalPages - 1}
                            className="px-3 py-2 rounded-lg border bg-white hover:bg-slate-100 disabled:opacity-40"
                        >
                            ▶
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default HospitalPage;