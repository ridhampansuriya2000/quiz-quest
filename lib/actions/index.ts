import axiosInstance from "@/lib/axios";

export const fetchCategories = ({search}: { search?: string }) => axiosInstance.get("/category", {
    params: {search}
}).then(({data}) => data.categories);

export const fetchQuizzes = ({search}: { search?: string }) => axiosInstance.get("/quiz", {
    params: {search}
}).then(({data}) => data.quizzes);

export const fetchQuizById = async (id: string) => axiosInstance.get(`/quiz/${id}`).then(({data}) => data);