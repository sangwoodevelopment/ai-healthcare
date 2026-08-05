import api from "./api";

export const getFavorites = () => {
    return api.get("/api/favorites");
};

export const addFavorite = (hospitalId) => {
    return api.post(`/api/favorites/${hospitalId}`, {});
};

export const deleteFavorite = (hospitalId) => {
    return api.delete(`/api/favorites/${hospitalId}`);
};