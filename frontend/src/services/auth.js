const AUTH_STORAGE_KEY = "isLoggedIn";

export const isAuthenticated = () =>
  localStorage.getItem(AUTH_STORAGE_KEY) === "true";

export const setAuthenticated = () => {
  localStorage.setItem(AUTH_STORAGE_KEY, "true");
};

export const clearAuthentication = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};