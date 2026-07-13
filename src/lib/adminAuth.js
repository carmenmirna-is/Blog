const KEY = "rincon-admin-auth";

export function isAdminAuthorized() {
  return sessionStorage.getItem(KEY) === "true";
}

export function setAdminAuthorized() {
  sessionStorage.setItem(KEY, "true");
}

export function clearAdminAuth() {
  sessionStorage.removeItem(KEY);
}