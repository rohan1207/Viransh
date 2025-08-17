// Simple helper around fetch to include JWT token if present
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('adminToken');
  const isAdminEndpoint = endpoint.startsWith('/api/admin/');
  const isLogin = endpoint === '/api/admin/login';
  // Allow login without token, block other admin endpoints
  if (isAdminEndpoint && !isLogin && !token) {
    throw new Error('Authentication required');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const url = new URL(endpoint.startsWith('/') ? endpoint : `/${endpoint}`, API_BASE);
  
  try {
    const res = await fetch(url.href, { ...options, headers });
    
    if (res.status === 401) {
      if (!isLogin) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
      }
      const errorBody = await res.json().catch(()=>({ message:'Unauthorized'}));
      throw new Error(errorBody.message || 'Unauthorized');
    }
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || 'Request failed');
    }
    
    return res.json();
  } catch (error) {
    throw error;
  }
};
