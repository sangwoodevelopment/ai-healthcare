import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Header from "../../components/Header";
import { getDashboard, getMyPage } from "../../api/userApi";

function MyPage() {
    const [myInfo, setMyInfo] = useState(null);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myPageResponse = await getMyPage();
                const dashboardResponse = await getDashboard();

                setMyInfo(myPageResponse.data.data);
                setDashboard(dashboardResponse.data.data);
            } catch (error) {
                toast.error("마이페이지 조회 실패");
                console.error(error);
            }
        };

        fetchData();
    }, []);

    if (!myInfo || !dashboard) return null;

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500">즐겨찾기 병원</p>
                                <h3 className="text-4xl font-bold mt-2">
                                    {dashboard.favoriteCount}
                                </h3>
                            </div>
                            <div className="text-5xl">⭐</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-500">AI 분석 횟수</p>
                                <h3 className="text-4xl font-bold mt-2">
                                    {dashboard.aiHistoryCount}
                                </h3>
                            </div>
                            <div className="text-5xl">🤖</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">📊 활동 요약</h2>

                    <div className="space-y-5">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600">즐겨찾기 활용도</span>
                                <span className="font-semibold">{dashboard.favoriteCount}개</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <div
                                    className="bg-yellow-400 h-3 rounded-full"
                                    style={{ width: `${Math.min(dashboard.favoriteCount * 10, 100)}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-slate-600">AI 분석 활용도</span>
                                <span className="font-semibold">{dashboard.aiHistoryCount}회</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <div
                                    className="bg-blue-500 h-3 rounded-full"
                                    style={{ width: `${Math.min(dashboard.aiHistoryCount * 10, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow p-8">
                    <h2 className="text-2xl font-bold mb-6">🩺 진료과 분석 통계</h2>

                    <div className="space-y-4">
                        {dashboard.departmentStats?.length > 0 ? (
                            dashboard.departmentStats.map((stat) => (
                                <div key={stat.department}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-700">{stat.department}</span>
                                        <span className="font-semibold">{stat.count}회</span>
                                    </div>

                                    <div className="w-full bg-slate-200 rounded-full h-3">
                                        <div
                                            className="bg-blue-500 h-3 rounded-full"
                                            style={{
                                                width: `${Math.min(stat.count * 20, 100)}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-500">AI 분석 통계가 없습니다.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPage;