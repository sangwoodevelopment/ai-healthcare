import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getMyPage } from "../../api/userApi";

function MyPage() {
    const [myInfo, setMyInfo] = useState(null);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await getMyPage();
                setMyInfo(response.data.data);
            } catch (error) {
                alert("내 정보 조회 실패");
                console.error(error);
            }
        };

        fetchMyInfo();
    }, []);

    if (!myInfo) return null;

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />

            <main className="max-w-5xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-2">👤 마이페이지</h1>
                <p className="text-slate-500 mb-8">내 계정 정보를 확인할 수 있습니다.</p>

                <div className="bg-white rounded-3xl shadow p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">{myInfo.name}님</h2>

                    <div className="grid gap-4 text-slate-700">
                        <p>📧 이메일: {myInfo.email}</p>
                        <p>🔐 권한: {myInfo.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow p-8 text-center">
                        <div className="text-4xl mb-3">⭐</div>
                        <p className="text-slate-500">즐겨찾기</p>
                        <h3 className="text-3xl font-bold mt-2">{myInfo.favoriteCount}개</h3>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-8 text-center">
                        <div className="text-4xl mb-3">🤖</div>
                        <p className="text-slate-500">AI 분석</p>
                        <h3 className="text-3xl font-bold mt-2">{myInfo.aiHistoryCount}회</h3>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPage;