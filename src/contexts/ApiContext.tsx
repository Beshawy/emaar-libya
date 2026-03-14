import React, { createContext, useContext, useEffect, useState } from 'react';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:5000';

// Base interfaces
export interface ServiceItem {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  video?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  video?: string;
  description: string;
  descriptionAr: string;
}

export interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  facebook: string;
}

// Extended types for MongoDB compatibility
export interface MongoServiceItem extends Omit<ServiceItem, 'id'> {
  _id?: string;
}

export interface MongoGalleryItem extends Omit<GalleryItem, 'id'> {
  _id?: string;
}

interface ApiContextType {
  services: MongoServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<MongoServiceItem[]>>;
  gallery: MongoGalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<MongoGalleryItem[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  loading: boolean;
  error: string | null;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<MongoServiceItem[]>([]);
  const [gallery, setGallery] = useState<MongoGalleryItem[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    phone: '',
    email: '',
    address: '',
    addressAr: '',
    facebook: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [servicesRes, galleryRes, companyRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/services`),
        fetch(`${API_BASE_URL}/api/gallery`),
        fetch(`${API_BASE_URL}/api/company`)
      ]);

      if (!servicesRes.ok || !galleryRes.ok || !companyRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [servicesData, galleryData, companyData] = await Promise.all([
        servicesRes.json(),
        galleryRes.json(),
        companyRes.json()
      ]);

      setServices(servicesData);
      setGallery(galleryData);
      setCompanyInfo(companyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced setters with API calls
  const setServicesWithApi = React.useCallback(async (newServices: React.SetStateAction<ServiceItem[]>) => {
    const updated = typeof newServices === 'function' ? newServices(services) : newServices;
    
    try {
      // Find new items (without _id) and existing items (with _id)
      const newItems = updated.filter(item => !item._id);
      const existingItems = updated.filter(item => item._id);

      // Add new items
      for (const item of newItems) {
        const response = await fetch(`${API_BASE_URL}/api/services`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to add service');
      }

      // Update existing items
      for (const item of existingItems) {
        const response = await fetch(`${API_BASE_URL}/api/services/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to update service');
      }

      // Refresh data
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update services');
      console.error('Services update error:', err);
    }
  }, [services]);

  const setGalleryWithApi = React.useCallback(async (newGallery: React.SetStateAction<GalleryItem[]>) => {
    const updated = typeof newGallery === 'function' ? newGallery(gallery) : newGallery;
    
    try {
      const newItems = updated.filter(item => !item._id);
      const existingItems = updated.filter(item => item._id);

      for (const item of newItems) {
        const response = await fetch(`${API_BASE_URL}/api/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to add gallery item');
      }

      for (const item of existingItems) {
        const response = await fetch(`${API_BASE_URL}/api/gallery/${item._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Failed to update gallery item');
      }

      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update gallery');
      console.error('Gallery update error:', err);
    }
  }, [gallery]);

  const setCompanyInfoWithApi = React.useCallback(async (newCompanyInfo: React.SetStateAction<CompanyInfo>) => {
    const updated = typeof newCompanyInfo === 'function' ? newCompanyInfo(companyInfo) : newCompanyInfo;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/company`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (!response.ok) throw new Error('Failed to update company info');
      
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update company info');
      console.error('Company info update error:', err);
    }
  }, [companyInfo]);

  const deleteService = React.useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete service');
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete service');
      console.error('Service deletion error:', err);
    }
  }, []);

  const deleteGalleryItem = React.useCallback(async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete gallery item');
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery item');
      console.error('Gallery item deletion error:', err);
    }
  }, []);

  return (
    <ApiContext.Provider value={{
      services,
      setServices: setServicesWithApi,
      gallery,
      setGallery: setGalleryWithApi,
      companyInfo,
      setCompanyInfo: setCompanyInfoWithApi,
      loading,
      error,
      deleteService,
      deleteGalleryItem
    }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};
