import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast"


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,

    signup: async (credentials)=>{
        set({isSigningUp: true});
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user:response.data.user, isSigningUp: false });
            toast.success("Signup successful");
        } catch (error) {
           toast.error(error.response.data.message || "Signing Failed");
           set({isSigningUp: false, user: null });
        }
    },


    login: async (credentials)=>{
        set({isLogingIn: true});
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({user: response.data.user, isLogingIn: false});
            toast.success("Login successful");
        } catch (error) {
            set({isLogingIn: false, user: null});
            toast.error(error.response.data.message || "Logging Failed");
        }
    },


    logout: async ()=>{
        set({isLogingOut: true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user: null, isLogingOut: false});
            toast.success("Logged out successful");
        } catch (error) {
            set({isLogingOut: false});
            toast.error(error.response.data.message || "Logging out Failed");
        }
    },

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isCheckingAuth: false });
        } catch {
            set({ isCheckingAuth: false, user: null });
        }
    },
    }));