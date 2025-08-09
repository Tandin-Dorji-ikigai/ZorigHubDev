import { useState, useEffect } from 'react';
import ApiService from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      const data = await ApiService.getFeaturedProducts();
      return data;
    } catch (err) {
      console.error('Failed to fetch featured products:', err);
      return [];
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      const data = await ApiService.getProductsByCategory(category);
      return data;
    } catch (err) {
      console.error('Failed to fetch products by category:', err);
      return [];
    }
  };

  const getProductsByArtisan = async (artisanId) => {
    try {
      const data = await ApiService.getProductsByArtisan(artisanId);
      return data;
    } catch (err) {
      console.error('Failed to fetch products by artisan:', err);
      return [];
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getProductsByArtisan,
  };
};

export const useArtisans = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllArtisans();
      setArtisans(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch artisans:', err);
    } finally {
      setLoading(false);
    }
  };

  const getArtisanById = async (id) => {
    try {
      const data = await ApiService.getArtisanById(id);
      return data;
    } catch (err) {
      console.error('Failed to fetch artisan:', err);
      return null;
    }
  };

  return {
    artisans,
    loading,
    error,
    fetchArtisans,
    getArtisanById,
  };
};

