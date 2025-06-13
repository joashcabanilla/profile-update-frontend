/**
 * public route
 * This route will not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * auth route
 * This route will use for authentication
 * @type {string[]}
 */
    export const authRoutes = ["/login"];

/**
 * The prefix for API authentication routes
 * This prefix is used to group all authentication-related API endpoints
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * default redirect path after login
 * This path is used as the default redirect location after a successful login
 * @type {string}
 */
export const defaultLoginRedirect = "/admin";