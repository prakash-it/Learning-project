import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3115/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error signing up";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ isAuthenticated: true, user: response.data.user, error: null, isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error logging in";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            const errorMessage = "Error logging out";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error verifying email";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            return response.data;
        } catch (error) {
            set({ error: "Failed to check authentication", isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error sending reset password email";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Error resetting password";
            set({ error: errorMessage, isLoading: false });
            throw new Error(errorMessage);
        }
    },
}));
