/**
 * CampusCare API Client
 * Talks to backend Express REST API
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: "include", // send cookies
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "API request failed");
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' || err.message === 'Failed to fetch') {
      throw new Error("Backend server is not running. Please start it with: cd backend && npm run dev");
    }
    throw err;
  }
}

export const api = {
  // Auth API
  auth: {
    register: (userData) =>
      request("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    login: (credentials) =>
      request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    me: () => request("/api/auth/me"),
    logout: () => request("/api/auth/me", { method: "DELETE" }),
  },

  // Complaints API
  complaints: {
    getAll: (params = {}) => {
      const query = new URLSearchParams();
      if (params.status) query.append("status", params.status);
      if (params.building) query.append("building", params.building);
      if (params.urgency) query.append("urgency", params.urgency);
      const queryString = query.toString();
      return request(`/api/complaints${queryString ? `?${queryString}` : ""}`);
    },
    create: (complaintData) =>
      request("/api/complaints", {
        method: "POST",
        body: JSON.stringify(complaintData),
      }),
    updateStatus: (id, status, resolutionNote) =>
      request("/api/complaints", {
        method: "PATCH",
        body: JSON.stringify({ id, status, resolutionNote }),
      }),
  },

  // Image Upload API
  upload: (imageBase64) =>
    request("/api/upload", {
      method: "POST",
      body: JSON.stringify({ image: imageBase64 }),
    }),
};
