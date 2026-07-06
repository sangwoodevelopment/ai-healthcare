import { useEffect, useState } from "react";
import api from "../../api/api";
import Header from "../../components/Header";

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await api.get("/api/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFavorites(response.data.data);
        } catch (error) {
            alert("즐겨찾기 조회 실패");
            console.error(error);
        }
    };

    const deleteFavorite = async (hospitalId) => {
        try {
            const token = localStorage.getItem("accessToken");

            await api.delete(`/api/favorites/${hospitalId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFavorites((prev) =>
                prev.filter((favorite) => favorite.hospitalId !== hospitalId)
            );
        } catch (error) {
            alert("즐겨찾기 삭제 실패");
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
                <h1 className="text-3xl font-bold mb-2">⭐ 즐겨찾기</h1>
                <p className="text-slate-500 mb-8">저장한 병원을 확인할 수 있습니다.</p>

                <div className="grid gap-4">
                    {favorites.map((favorite) => (
                        <div
                            key={favorite.favoriteId}
                            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50"
                        >
                            <div className="flex justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold">{favorite.hospitalName}</h2>
                                    <p className="text-slate-600 mt-2">{favorite.address}</p>
                                    <p className="text-slate-500 mt-1">{favorite.phoneNumber}</p>

                                    <span className="inline-block mt-3 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {favorite.department}
                  </span>
                                </div>

                                <button
                                    onClick={() => deleteFavorite(favorite.hospitalId)}
                                    className="h-fit text-red-500 font-semibold hover:text-red-700"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {favorites.length === 0 && (
                    <div className="text-center text-slate-500 mt-12">
                        즐겨찾기한 병원이 없습니다.
                    </div>
                )}
            </main>
        </div>
    );
}

export default FavoritePage;