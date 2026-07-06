import api from "./api";

export const searchHospitals = (keyword, page = 0, size = 10) => {
    return api.get("/api/hospitals", {
        params: {
            keyword,
            page,
            size,
        },
    });
};