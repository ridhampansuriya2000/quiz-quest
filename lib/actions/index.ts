import axiosInstance from "@/lib/axios";

export const fetchCategories = ({search}: { search?: string }) => axiosInstance.get("/category", {
    params: {search}
}).then(({data}) => data.categories);

export const fetchQuizzes = ({search}: { search?: string }) => axiosInstance.get("/quiz", {
    params: {search}
}).then(({data}) => data.quizzes);

export const fetchQuizById = async (id: string) => axiosInstance.get(`/quiz/${id}`).then(({data}) => data);

export const fetchQuestions = async ({quiz}: { quiz?: string }) => axiosInstance.get(`/question`, {
    params: {quiz}
}).then(({data}) => data.questions);


/** AUTH */
export const login = async ({email, password}: {
    email: string,
    password: string
}) => axiosInstance.post("/auth/login", {
    email,
    password
}).then(({data}) => data);

export const signup = async ({name, email, password}: {
    name: string,
    email: string,
    password: string
}) => axiosInstance.post("/auth/signup", {
    name,
    email,
    password
}).then(({data}) => data);

export const logout = async () => axiosInstance.post("/auth/logout").then(({data}) => data);

export const me = async () => axiosInstance.post("/auth/me").then(({data}) => data?.user);