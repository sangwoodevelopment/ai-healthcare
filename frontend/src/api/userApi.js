import api from "./api";

export const getMyPage = () => {
    return api.get("/api/users/me");
};