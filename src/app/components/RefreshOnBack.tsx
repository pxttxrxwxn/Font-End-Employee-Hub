'use client';

import { useEffect } from 'react';

export default function RefreshOnBack() {
    useEffect(() => {
        const handlePopState = () => {
            window.location.reload();
        };
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload();
            }
        };
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('pageshow', handlePageShow);
        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('pageshow', handlePageShow);
        };
    }, []);

    return null;
}