import api from "./api";

export const analyzeSymptom = (symptom) => {
    return api.post("/api/ai/symptom", { symptom });
};