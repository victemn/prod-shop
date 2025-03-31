import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../utils/types-bakery-shop.ts';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const navigationType = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (window.location.pathname !== Paths.ERROR) {
            window.history.replaceState(null, '', Paths.ERROR);
        }
        if (navigationType?.type === "reload") {
            navigate(Paths.HOME, { replace: true });
        }
    }, [navigate]);

    return (
        <div>
            <h1>OOOOPS! Something went wrong! Error 404! Page not found!</h1>
        </div>
    );
};

export default ErrorPage;
