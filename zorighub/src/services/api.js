import { mockArtisans, mockProducts, mockCategories, mockUser, mockBuyers, mockAdmins } from './mockData';

const API_BASE_URL = 'http://localhost:3000/api';
const USE_MOCK_DATA = true; // Set to false when backend is available

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.useMockData = USE_MOCK_DATA;
  }

  async request(endpoint, options = {}) {
    if (this.useMockData) {
      return this.getMockData(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      // Fallback to mock data if API fails
      return this.getMockData(endpoint, options);
    }
  }

  getMockData(endpoint, options = {}) {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        if (endpoint === '/artisans') {
          resolve(mockArtisans);
        } else if (endpoint === '/products') {
          resolve(mockProducts);
        } else if (endpoint === '/products/featured') {
          resolve(mockProducts.filter(p => p.featured));
        } else if (endpoint.startsWith('/products/category/')) {
          const category = endpoint.split('/').pop();
          resolve(mockProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()));
        } else if (endpoint.startsWith('/products/artisan/')) {
          const artisanId = endpoint.split('/').pop();
          resolve(mockProducts.filter(p => p.artisan._id === artisanId));
        } else if (endpoint === '/categories') {
          resolve(mockCategories);
        } else if (endpoint === '/auth/user') {
          resolve({ user: mockUser, token: 'mock-token-123' });
        } else if (endpoint === '/buyers') {
          resolve(mockBuyers);
        } else if (endpoint.startsWith('/buyers/')) {
          const id = endpoint.split('/').pop();
          resolve(mockBuyers.find(b => b._id === id) || null);
        } else if (endpoint.startsWith('/buyers/wallet/')) {
          const walletAddress = endpoint.split('/').pop();
          resolve(mockBuyers.find(b => b.walletAddress === walletAddress) || null);
        } else if (endpoint.startsWith('/buyers/email/')) {
          const email = endpoint.split('/').pop();
          resolve(mockBuyers.find(b => b.email === email) || null);
        } else if (endpoint === '/admins') {
          resolve(mockAdmins);
        } else if (endpoint.startsWith('/admins/')) {
          const id = endpoint.split('/').pop();
          resolve(mockAdmins.find(a => a._id === id) || null);
        } else if (endpoint.startsWith('/admins/wallet/')) {
          const walletAddress = endpoint.split('/').pop();
          resolve(mockAdmins.find(a => a.walletAddress === walletAddress) || null);
        } else if (endpoint === '/admins/login') {
          resolve({ success: true, token: 'mock-admin-token', user: mockAdmins[0] });
        } else {
          resolve([]);
        }
      }, 500); // 500ms delay to simulate network
    });
  }

  // Auth endpoints
  async googleAuth() {
    if (this.useMockData) {
      // Simulate login success
      localStorage.setItem('authToken', 'mock-token-123');
      return { user: mockUser, token: 'mock-token-123' };
    }
    window.location.href = `${this.baseURL.replace('/api', '')}/api/auth`;
  }

  async getCurrentUser() {
    return this.request('/auth/user');
  }

  // Product endpoints
  async getAllProducts() {
    return this.request('/products');
  }

  async getProductById(id) {
    if (this.useMockData) {
      return mockProducts.find(p => p._id === id) || null;
    }
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts() {
    return this.request('/products/featured');
  }

  async getProductsByCategory(category) {
    return this.request(`/products/category/${category}`);
  }

  async getProductsByArtisan(artisanId) {
    return this.request(`/products/artisan/${artisanId}`);
  }

  // Artisan endpoints
  async getAllArtisans() {
    return this.request('/artisans');
  }

  async getArtisanById(id) {
    if (this.useMockData) {
      return mockArtisans.find(a => a._id === id) || null;
    }
    return this.request(`/artisans/${id}`);
  }

  async getArtisanByWallet(walletAddress) {
    if (this.useMockData) {
      return mockArtisans.find(a => a.walletAddress === walletAddress) || null;
    }
    return this.request(`/artisans/wallet/${walletAddress}`);
  }

  // Buyer endpoints
  async getAllBuyers() {
    return this.request('/buyers');
  }

  async getBuyerById(id) {
    if (this.useMockData) {
      return mockBuyers.find(b => b._id === id) || null;
    }
    return this.request(`/buyers/${id}`);
  }

  async createBuyer(buyerData) {
    if (this.useMockData) {
      console.log('Mock: Created buyer', buyerData);
      return { success: true, buyer: { _id: `mock-buyer-${Date.now()}`, ...buyerData } };
    }
    return this.request('/buyers', {
      method: 'POST',
      body: JSON.stringify(buyerData),
    });
  }

  async updateBuyer(id, buyerData) {
    if (this.useMockData) {
      console.log('Mock: Updated buyer', { id, buyerData });
      return { success: true, buyer: { _id: id, ...buyerData } };
    }
    return this.request(`/buyers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(buyerData),
    });
  }

  async deleteBuyer(id) {
    if (this.useMockData) {
      console.log('Mock: Deleted buyer', id);
      return { success: true };
    }
    return this.request(`/buyers/${id}`, {
      method: 'DELETE',
    });
  }

  async getBuyerByWalletAddress(walletAddress) {
    if (this.useMockData) {
      return mockBuyers.find(b => b.walletAddress === walletAddress) || null;
    }
    return this.request(`/buyers/wallet/${walletAddress}`);
  }

  async getBuyerByEmail(email) {
    if (this.useMockData) {
      return mockBuyers.find(b => b.email === email) || null;
    }
    return this.request(`/buyers/email/${email}`);
  }

  async updateBuyerWallet(id, walletAddress) {
    if (this.useMockData) {
      console.log('Mock: Updated buyer wallet', { id, walletAddress });
      return { success: true };
    }
    return this.request(`/buyers/update-wallet/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ walletAddress }),
    });
  }

  // Admin endpoints
  async getAllAdmins() {
    return this.request('/admins');
  }

  async getAdminById(id) {
    if (this.useMockData) {
      return mockAdmins.find(a => a._id === id) || null;
    }
    return this.request(`/admins/${id}`);
  }

  async createAdmin(adminData) {
    if (this.useMockData) {
      console.log('Mock: Created admin', adminData);
      return { success: true, admin: { _id: `mock-admin-${Date.now()}`, ...adminData } };
    }
    return this.request('/admins', {
      method: 'POST',
      body: JSON.stringify(adminData),
    });
  }

  async updateAdmin(id, adminData) {
    if (this.useMockData) {
      console.log('Mock: Updated admin', { id, adminData });
      return { success: true, admin: { _id: id, ...adminData } };
    }
    return this.request(`/admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(adminData),
    });
  }

  async deleteAdmin(id) {
    if (this.useMockData) {
      console.log('Mock: Deleted admin', id);
      return { success: true };
    }
    return this.request(`/admins/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminByWalletAddress(walletAddress) {
    if (this.useMockData) {
      return mockAdmins.find(a => a.walletAddress === walletAddress) || null;
    }
    return this.request(`/admins/wallet/${walletAddress}`);
  }

  async loginAdmin(credentials) {
    if (this.useMockData) {
      console.log('Mock: Admin login', credentials);
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        localStorage.setItem('authToken', 'mock-admin-token');
        return { success: true, token: 'mock-admin-token', user: mockAdmins[0] };
      } else {
        throw new Error('Invalid mock credentials');
      }
    }
    return this.request('/admins/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Category endpoints
  async getAllCategories() {
    return this.request('/categories');
  }

  // Cart endpoints
  async getCart(userId) {
    if (this.useMockData) {
      return { items: [], total: 0 };
    }
    return this.request(`/carts/${userId}`);
  }

  async addToCart(userId, productId, quantity = 1) {
    if (this.useMockData) {
      console.log('Mock: Added to cart', { userId, productId, quantity });
      return { success: true, message: 'Added to cart' };
    }
    return this.request(`/carts/${userId}/add`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(userId, productId) {
    if (this.useMockData) {
      console.log('Mock: Removed from cart', { userId, productId });
      return { success: true, message: 'Removed from cart' };
    }
    return this.request(`/carts/${userId}/remove`, {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
    });
  }

  // Order endpoints
  async getOrders(userId) {
    if (this.useMockData) {
      return [];
    }
    return this.request(`/orders/user/${userId}`);
  }

  async createOrder(orderData) {
    if (this.useMockData) {
      console.log('Mock: Created order', orderData);
      return { success: true, orderId: 'mock-order-123' };
    }
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrderById(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  // Transaction endpoints
  async getTransactions(userId) {
    if (this.useMockData) {
      return [];
    }
    return this.request(`/transactions/user/${userId}`);
  }

  async createTransaction(transactionData) {
    if (this.useMockData) {
      console.log('Mock: Created transaction', transactionData);
      return { success: true, transactionId: 'mock-tx-123' };
    }
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
  }
}

export default new ApiService();

