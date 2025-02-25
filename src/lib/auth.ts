
const cookieName = 'user_email' as const;

const isLoggedIn = async () => {
    if (typeof window === 'undefined') {
        const cookies = await import('next/headers').then(mod => mod.cookies);
        const cookied = await cookies();
        const user_email = cookied.get(cookieName);
        return user_email ? true : false;
    } else {
        const res = await fetch(`/api/auth/session`, {
            method: 'GET',
        });
        const data = await res.json();
        return data.user_email ? true : false;
    }
};

const logout = async () => {
    return fetch('/api/auth/logout', {
        method: 'GET',
    });
}

const auth = {
    isLoggedIn,
    logout,
    cookieName
}

export default auth;