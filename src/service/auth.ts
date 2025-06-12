export class AuthService {
    private static TOKEN_KEY = 'spotify_token';

    static setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    static removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    static isAuthenticated(): boolean {
        return !!this.getToken();
    }
}