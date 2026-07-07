import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { getHospital } from "../../api/hospitalApi";
import {addFavorite} from "../../api/favoriteApi.js";

function HospitalDetailPage() {
    const { id } = useParams();
    const [hospital, setHospital] = useState(null);

    const handleAddFavorite = async () => {
        try {
            await addFavorite(hospital.id);
            alert("즐겨찾기에 추가되었습니다.");
        } catch (error) {
            alert("즐겨찾기 추가 실패");
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchHospital = async () => {
            const response = await getHospital(id);
            setHospital(response.data.data);
        };

        fetchHospital();
    }, [id]);

    if (!hospital) return null;

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <div className="bg-white rounded-3xl shadow p-10">
                    <div className="flex justify-between items-start gap-6">
                        <div>
                            <p className="text-sm text-blue-600 font-semibold mb-3">
                                병원 상세 정보
                            </p>

                            <h1 className="text-4xl font-bold mb-6">
                                🏥 {hospital.name}
                            </h1>

                            <div className="space-y-4 text-slate-700">
                                <p className="text-lg">📍 {hospital.address}</p>
                                <p className="text-lg">☎ {hospital.phoneNumber}</p>
                                <p className="text-lg">
                                    🏷 {hospital.department}
                                </p>
                                <p className="text-lg">
                                    🌐 {hospital.sido} / {hospital.sigungu}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleAddFavorite}
                            className="bg-yellow-400 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500"
                        >
                            ⭐ 즐겨찾기 추가
                        </button>
                    </div>

                    <div className="mt-10 border-t pt-8">
                        <h2 className="text-xl font-bold mb-4">안내</h2>
                        <p className="text-slate-600">
                            방문 전 전화로 진료 가능 여부와 운영 시간을 확인하는 것을 권장합니다.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HospitalDetailPage;