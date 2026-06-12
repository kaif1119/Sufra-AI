const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export async function getCurrentUser() {
  const res = await fetch(apiUrl("/api/auth/me"), {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to verify authentication");
  }

  const data = await res.json();
  return data.user ?? null;
}

export async function logout() {
  const res = await fetch(apiUrl("/api/auth/logout"), {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to logout");
  }
}
