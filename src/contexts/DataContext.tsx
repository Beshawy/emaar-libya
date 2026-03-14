import React, { createContext, useContext, useState } from "react";

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

const defaultServices: ServiceItem[] = [
  { id: "1", title: "Aluminum Doors Manufacturing", titleAr: "تصنيع أبواب الألومنيوم", description: "Custom aluminum doors for residential and commercial buildings with premium finishes.", descriptionAr: "أبواب ألومنيوم مخصصة للمباني السكنية والتجارية بتشطيبات ممتازة.", image: "/images/gallery1.jpg" },
  { id: "2", title: "Aluminum Windows Installation", titleAr: "تركيب نوافذ الألومنيوم", description: "Energy-efficient window systems with thermal break technology.", descriptionAr: "أنظمة نوافذ موفرة للطاقة بتقنية القطع الحراري.", image: "/images/gallery2.jpg" },
  { id: "3", title: "Double Glazing Solutions", titleAr: "حلول الزجاج المزدوج", description: "Professional double glass installations for superior insulation.", descriptionAr: "تركيبات زجاج مزدوج احترافية للعزل الفائق.", image: "/images/gallery4.jpg" },
  { id: "4", title: "Decorative Aluminum Works", titleAr: "أعمال الألومنيوم الزخرفية", description: "Architectural aluminum facades, cladding, and decorative structures.", descriptionAr: "واجهات ألومنيوم معمارية وكسوة وهياكل زخرفية.", image: "/images/gallery3.jpg" },
];

const defaultGallery: GalleryItem[] = [
  { id: "1", image: "/images/gallery1.jpg", description: "Modern aluminum sliding doors", descriptionAr: "أبواب ألومنيوم منزلقة حديثة" },
  { id: "2", image: "/images/gallery2.jpg", description: "Premium aluminum window frames", descriptionAr: "إطارات نوافذ ألومنيوم ممتازة" },
  { id: "3", image: "/images/gallery3.jpg", description: "Decorative aluminum facade", descriptionAr: "واجهة ألومنيوم زخرفية" },
  { id: "4", image: "/images/gallery4.jpg", description: "Double glazing cross-section", descriptionAr: "مقطع عرضي للزجاج المزدوج" },
  { id: "5", image: "/images/hero.jpg", description: "Factory production line", descriptionAr: "خط إنتاج المصنع" },
];

const defaultCompanyInfo: CompanyInfo = {
  phone: "0917916620",
  email: "emarlybya44@gmail.com",
  address: "Tripoli, Libya",
  addressAr: "طرابلس، ليبيا",
  facebook: "",
};

interface DataContextType {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    // Try to get data from localStorage first, then fallback to defaults
    const saved = localStorage.getItem("emaar-services");
    return saved ? JSON.parse(saved) : defaultServices;
  });
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem("emaar-gallery");
    return saved ? JSON.parse(saved) : defaultGallery;
  });
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem("emaar-company");
    return saved ? JSON.parse(saved) : defaultCompanyInfo;
  });

  // Custom setters that sync with localStorage and trigger storage events
  const setServicesWithSync = React.useCallback((newServices: React.SetStateAction<ServiceItem[]>) => {
    setServices((prev) => {
      const updated = typeof newServices === 'function' ? newServices(prev) : newServices;
      localStorage.setItem("emaar-services", JSON.stringify(updated));
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('emaar-services-update', { detail: updated }));
      return updated;
    });
  }, []);

  const setGalleryWithSync = React.useCallback((newGallery: React.SetStateAction<GalleryItem[]>) => {
    setGallery((prev) => {
      const updated = typeof newGallery === 'function' ? newGallery(prev) : newGallery;
      localStorage.setItem("emaar-gallery", JSON.stringify(updated));
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('emaar-gallery-update', { detail: updated }));
      return updated;
    });
  }, []);

  const setCompanyInfoWithSync = React.useCallback((newCompanyInfo: React.SetStateAction<CompanyInfo>) => {
    setCompanyInfo((prev) => {
      const updated = typeof newCompanyInfo === 'function' ? newCompanyInfo(prev) : newCompanyInfo;
      localStorage.setItem("emaar-company", JSON.stringify(updated));
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('emaar-company-update', { detail: updated }));
      return updated;
    });
  }, []);

  // Listen for storage events and custom events for cross-tab synchronization
  React.useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'emaar-services' && e.newValue) {
        setServices(JSON.parse(e.newValue));
      }
      if (e.key === 'emaar-gallery' && e.newValue) {
        setGallery(JSON.parse(e.newValue));
      }
      if (e.key === 'emaar-company' && e.newValue) {
        setCompanyInfo(JSON.parse(e.newValue));
      }
    };

    const handleCustomServiceUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<ServiceItem[]>;
      setServices(customEvent.detail);
    };

    const handleCustomGalleryUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<GalleryItem[]>;
      setGallery(customEvent.detail);
    };

    const handleCustomCompanyUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<CompanyInfo>;
      setCompanyInfo(customEvent.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('emaar-services-update', handleCustomServiceUpdate);
    window.addEventListener('emaar-gallery-update', handleCustomGalleryUpdate);
    window.addEventListener('emaar-company-update', handleCustomCompanyUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('emaar-services-update', handleCustomServiceUpdate);
      window.removeEventListener('emaar-gallery-update', handleCustomGalleryUpdate);
      window.removeEventListener('emaar-company-update', handleCustomCompanyUpdate);
    };
  }, []);

  return (
    <DataContext.Provider value={{ 
      services, 
      setServices: setServicesWithSync, 
      gallery, 
      setGallery: setGalleryWithSync, 
      companyInfo, 
      setCompanyInfo: setCompanyInfoWithSync 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
