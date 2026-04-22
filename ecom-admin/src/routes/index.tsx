import { createBrowserRouter } from 'react-router-dom';
import { routeConfig } from './routeConfig';

/**
 * Application router instance.
 * Uses the Data Router API (createBrowserRouter) for modern React Router v7.
 */
export const router = createBrowserRouter(routeConfig);
