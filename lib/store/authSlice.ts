import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface User {
    id: string
    name: string
    email: string
    coins: number
    quizzesCompleted: number
    avatar?: string
}

interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        addCoins: (state, action: PayloadAction<number>) => {
            if (state.user) {
                state.user.coins += action.payload
            }
        },
        incrementQuizzesCompleted: (state) => {
            if (state.user) {
                state.user.quizzesCompleted += 1
            }
        },
    },
})

export const { setUser, logout, addCoins, incrementQuizzesCompleted } = authSlice.actions
export default authSlice.reducer
