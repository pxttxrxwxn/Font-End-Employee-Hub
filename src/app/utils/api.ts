// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
export const API_URL = 'http://localhost:8787';

const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return '';
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = getToken();
    
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    let data;
    try {
        data = await res.json();
    } catch {
        data = null;
    }

    if (!res.ok) {
        throw new Error(data?.error || data?.message || `API Error: ${res.statusText}`);
    }

    return data;
};