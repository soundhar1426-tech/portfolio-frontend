const rawBaseUrl = import.meta.env.VITE_API_URL || '';
const API_BASE = rawBaseUrl ? `${rawBaseUrl.replace(/\/$/, '')}/api` : '/api';

// Helper to resolve full asset URLs for uploads
export const getFileUrl = (filePath) => {
  if (!filePath) return '';
  if (filePath.startsWith('http://') || filePath.startsWith('https://') || filePath.startsWith('data:') || filePath.startsWith('blob:')) {
    return filePath;
  }
  const cleanBase = rawBaseUrl.replace(/\/$/, '');
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return cleanBase ? `${cleanBase}${cleanPath}` : cleanPath;
};

// Helper for fetch requests
const request = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `HTTP error! status: ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${url}:`, error);
    throw error;
  }
};

// Auth API
export const verifyManagementPassword = async (password) => {
  return request(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });
};

// Projects API
export const fetchProjects = async () => {
  return request(`${API_BASE}/projects`);
};

export const createProject = async (projectData, token) => {
  return request(`${API_BASE}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
};

export const updateProject = async (id, projectData, token) => {
  return request(`${API_BASE}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(projectData)
  });
};

export const deleteProject = async (id, token) => {
  return request(`${API_BASE}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Certificates API
export const fetchCertificates = async () => {
  return request(`${API_BASE}/certificates`);
};

export const createCertificate = async (formData, token) => {
  return request(`${API_BASE}/certificates`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData // multipart/form-data
  });
};

export const updateCertificate = async (id, formData, token) => {
  return request(`${API_BASE}/certificates/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData // multipart/form-data
  });
};

export const deleteCertificate = async (id, token) => {
  return request(`${API_BASE}/certificates/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
