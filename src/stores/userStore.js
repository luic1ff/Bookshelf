import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async register(userData) {
            try {
                const response = await axios.post('http://localhost:3000/register', userData);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
            } catch (error) {
                console.error('Ошибка регистрации:', error);
            }
        },
        async login(credentials) {
            try {
                const response = await axios.post('http://localhost:3000/login', credentials);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
            } catch (error) {
                console.error('Ошибка входа:', error);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
        },
        async checkAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:3000/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    this.user = response.data.user;
                    this.token = token;
                } catch {
                    this.logout();
                }
            }
        },
    },
});
