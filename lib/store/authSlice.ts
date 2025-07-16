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
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
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
