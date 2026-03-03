import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    try {
        const payloadBase64Url = token.split('.')[1];
        const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const userRoleId = Number(decodedPayload.role);
        const currentPath = request.nextUrl.pathname.toLowerCase();
        if (userRoleId === 2 && currentPath.startsWith('/hrmanagement')) {
            return NextResponse.redirect(new URL('/Employees/Profile', request.url));
        }
        if (userRoleId === 1 && currentPath.startsWith('/employees')) {
            return NextResponse.redirect(new URL('/HRManagement/Profile', request.url));
        }
    } catch (error) {
        console.error('Middleware Error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        '/HRManagement/:path*',
        '/Employees/:path*'
    ],
};