import { createRouter, createRoute, type AnyRoute } from '@tanstack/react-router';
import { SingIn } from './pages/auth/sing-in';

const loginRoute = createRoute({
    path: '/singIn',
    component: SingIn,
    getParentRoute: function (): AnyRoute {
        throw new Error('Function not implemented.');
    }
});

export const router = createRouter({
    routeTree: loginRoute,
});
