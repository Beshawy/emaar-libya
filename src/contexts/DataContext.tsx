import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

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

interface DataContextType {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  companyInfo: CompanyInfo;
  setCompanyInfo: React.Dispatch<React.SetStateAction<CompanyInfo>>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    phone: "0917916620",
    email: "emarlybya44@gmail.com",
    address: "Tripoli, Libya",
    addressAr: "طرابلس، ليبيا",
    facebook: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, galleryRes, companyRes] = await Promise.all([
          fetch("/api/services").then(res => res.json()),
          fetch("/api/gallery").then(res => res.json()),
          fetch("/api/company").then(res => res.json()),
        ]);
        
        if (Array.isArray(servicesRes)) setServices(servicesRes);
        if (Array.isArray(galleryRes)) setGallery(galleryRes);
        if (companyRes && !companyRes.error && Object.keys(companyRes).length > 0) {
          // Merge to ensure no missing properties causing UI crashes like .replace
          setCompanyInfo((prev) => ({ ...prev, ...companyRes }));
        }
      } catch (err) {
        console.error("Failed to fetch initial data", err);
        toast.error("حدث خطأ أثناء جلب البيانات من السيرفر");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ services, setServices, gallery, setGallery, companyInfo, setCompanyInfo, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};
