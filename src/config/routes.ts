/**
 * Centralized registry of all application routes.
 * Using this prevents any hardcoded route strings across the codebase.
 */
export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  patients: "/patients",
  facilities: "/facilities",
  gallery: "/gallery",
  team: "/team",
  contact: "/contact",
  privacy: "/privacy",
  legal: "/legal",
  booking: "/#booking",
  tour: "/#tour",
  admin: {
    dashboard: "/admin",
    login: "/admin/login",
    forgotPassword: "/admin/forgot-password",
    resetPassword: "/admin/reset-password",
    users: "/admin/users",
    team: "/admin/team",
    facilities: "/admin/facilities",
    sections: "/admin/sections",
    gallery: "/admin/gallery",
    testimonies: "/admin/testimonies",
  },
} as const;

export type AppRouteKey = keyof typeof routes;
