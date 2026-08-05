import { useEffect, useState } from "react";
import Header from "../../components/Header";
import HospitalCard from "../../components/HospitalCard";
import {
    getFavorites,
    deleteFavorite as deleteFavoriteApi,
} from "../../api/favoriteApi";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

function FavoritePage() {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    const fetchFavorites = async () => {
        try {
            const response = await getFavorites();
            setFavorites(response.data.data);
        } catch (error) {
            alert("즐겨찾기 조회 실패");
            console.error(error);
        }
    };

    const handleDeleteFavorite = async (hospitalId) => {
        try {
            await deleteFavoriteApi(hospitalId);

            setFavorites((prev) =>
                prev.filter((favorite) => favorite.hospitalId !== hospitalId)
            );
            toast.success("즐겨찾기가 삭제되었습니다.");
        } catch (error) {
            toast.error("즐겨찾기 삭제 실패");
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
                <h1 className="text-3xl font-bold mb-2">⭐ 즐겨찾기</h1>
                <p className="text-slate-500 mb-8">저장한 병원을 확인할 수 있습니다.</p>

                <div className="grid gap-4">
                    {favorites.map((favorite) => (
                        <HospitalCard
                            key={favorite.favoriteId}
                            hospital={favorite}
                            onClick={() => navigate(`/hospitals/${favorite.hospitalId}`)}
                            rightArea={
                                <button
                                    onClick={() => handleDeleteFavorite(favorite.hospitalId)}
                                    className="h-fit text-red-500 font-semibold hover:text-red-700"
                                >
                                    삭제
                                </button>
                            }
                        />
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