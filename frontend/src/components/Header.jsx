import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <header className="bg-white border-b border-slate-200">
            <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                <h1
                    onClick={() => navigate("/home")}
                    className="text-2xl font-bold cursor-pointer"
                >
                    🏥 AI Healthcare
                </h1>

                <nav className="flex items-center gap-6 text-slate-600">
                    <button onClick={() => navigate("/ai")} className="hover:text-blue-600">
                        AI 분석
                    </button>
                    <button onClick={() => navigate("/hospitals")} className="hover:text-blue-600">
                        병원 검색
                    </button>
                    <button onClick={() => navigate("/favorites")} className="hover:text-blue-600">
                        즐겨찾기
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                    >
                        로그아웃
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;