import {useState} from "react";
import { useNavigate } from "react-router-dom"
import {login} from "../../api/authApi.js";
import toast from "react-hot-toast";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        try {
            const response = await login({
                email,
                password,
            });

            const token = response.data.data.accessToken;

            localStorage.setItem("accessToken", token);

            navigate("/home");

            toast.success("로그인 성공");
        } catch (error) {
            toast.error("로그인에 실패했습니다.");
            console.error(error);
        }
    };
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        🏥 AI Healthcare
                    </h1>
                    <p className="text-slate-500 mt-2">
                        AI 기반 병원 추천 서비스
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            이메일
                        </label>
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        로그인
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500 mt-6">
                    계정이 없으신가요?{" "}
                    <span className="text-blue-600 font-semibold cursor-pointer">
            회원가입
          </span>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;