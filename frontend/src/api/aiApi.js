import api from "./api";

export const analyzeSymptom = (symptom) => {
    return api.post("/api/ai/symptom", { symptom });
};

export const getAiHistories = () => {
    return api.get("/api/ai/histories");
};