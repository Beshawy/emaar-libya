import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData, ServiceItem, GalleryItem } from "@/contexts/DataContext";
import { LogOut, Image, Wrench, Building, Plus, Pencil, Trash2, Save, X, Facebook, Video } from "lucide-react";
import { toast } from "sonner";

const ADMIN_EMAIL = "emarlybya44@gmail.com";
const ADMIN_PASS = "Password246";

const AdminPage = () => {
  const { t, lang } = useLanguage();
  const { services, setServices, gallery, setGallery, companyInfo, setCompanyInfo } = useData();
  const loading = false, error = null;
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("emaar-admin") === "true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"services" | "gallery" | "company">("services");
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      sessionStorage.setItem("emaar-admin", "true");
      setAuthed(true);
    } else {
      toast.error(t.admin.invalidCredentials);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("emaar-admin");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <form onSubmit={handleLogin} className="bg-card p-6 sm:p-8 rounded-lg shadow-lg border border-border w-full max-w-sm">
          <div className="flex justify-center mb-4 sm:mb-6">
            <img src="/images/logo.jpeg" alt="Emaar Libya" className="h-12 w-12 sm:h-16 sm:w-16 rounded" />
          </div>
          <h2 className="font-cairo font-bold text-lg sm:text-xl text-center text-foreground mb-4 sm:mb-6">{t.admin.login}</h2>
          <input
            type="email"
            placeholder={t.admin.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 mb-3 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <input
            type="password"
            placeholder={t.admin.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 mb-3 sm:mb-4 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
          <button type="submit" className="w-full bg-accent text-accent-foreground py-2 sm:py-3 rounded font-semibold text-sm">
            {t.admin.loginBtn}
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center text-destructive">
          <p>حدث خطأ: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 bg-accent text-accent-foreground px-4 py-2 rounded">
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  const saveService = (item: ServiceItem) => {
    setServices((prev) => {
      const exists = prev.find((s) => s.id === item.id);
      if (exists) return prev.map((s) => (s.id === item.id ? item : s));
      return [...prev, { ...item, id: Date.now().toString() }];
    });
    setEditingService(null);
    toast.success("Saved!");
  };

  const saveGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => {
      const exists = prev.find((g) => g.id === item.id);
      if (exists) return prev.map((g) => (g.id === item.id ? item : g));
      return [...prev, { ...item, id: Date.now().toString() }];
    });
    setEditingGallery(null);
    toast.success("Saved!");
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-3 sm:py-4">
        <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
          <h1 className="font-cairo font-bold text-lg sm:text-xl">{t.admin.dashboard}</h1>
          <button onClick={handleLogout} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:text-accent transition-colors">
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{t.admin.logout}</span>
            <span className="sm:hidden">خروج</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          {[
            { key: "services" as const, icon: Wrench, label: t.admin.manageServices },
            { key: "gallery" as const, icon: Image, label: t.admin.manageGallery },
            { key: "company" as const, icon: Building, label: t.admin.manageCompany },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${
                tab === item.key ? "bg-accent text-accent-foreground" : "bg-card text-foreground border border-border"
              }`}
            >
              <item.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {tab === "services" && (
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="font-cairo font-semibold text-base sm:text-lg text-foreground">{t.admin.manageServices}</h2>
              <button
                onClick={() => setEditingService({ id: "", title: "", titleAr: "", description: "", descriptionAr: "", image: "" })}
                className="flex items-center justify-center gap-1 bg-accent text-accent-foreground px-3 py-2 rounded text-xs sm:text-sm font-medium w-full sm:w-auto"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                {t.admin.add}
              </button>
            </div>
            {editingService && (
              <ServiceForm item={editingService} onSave={saveService} onCancel={() => setEditingService(null)} t={t} />
            )}
            <div className="space-y-2 sm:space-y-3 mt-4">
              {services.map((s) => (
                <div key={s.id} className="flex flex-col sm:flex-row sm:items-center justify-between border border-border rounded p-3 gap-3">
                  <div className="flex items-center gap-3">
                    <img src={s.image} alt="" className="h-10 w-10 sm:h-12 sm:w-12 rounded object-cover flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground text-xs sm:text-sm truncate">{lang === "ar" ? s.titleAr : s.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{lang === "ar" ? s.descriptionAr : s.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button onClick={() => setEditingService(s)} className="text-muted-foreground hover:text-accent p-1"><Pencil className="h-3 w-3 sm:h-4 sm:w-4" /></button>
                    <button onClick={() => s.id && setServices((prev) => prev.filter((item) => item.id !== s.id))} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === "gallery" && (
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="font-cairo font-semibold text-base sm:text-lg text-foreground">{t.admin.manageGallery}</h2>
              <button
                onClick={() => setEditingGallery({ id: "", image: "", description: "", descriptionAr: "" })}
                className="flex items-center justify-center gap-1 bg-accent text-accent-foreground px-3 py-2 rounded text-xs sm:text-sm font-medium w-full sm:w-auto"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                {t.admin.add}
              </button>
            </div>
            {editingGallery && (
              <GalleryForm item={editingGallery} onSave={saveGalleryItem} onCancel={() => setEditingGallery(null)} t={t} />
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mt-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative group rounded overflow-hidden border border-border">
                  <img src={g.image} alt="" className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 sm:gap-2">
                    <button onClick={() => setEditingGallery(g)} className="bg-card p-1.5 sm:p-2 rounded"><Pencil className="h-3 w-3 sm:h-4 sm:w-4 text-foreground" /></button>
                    <button onClick={() => g.id && setGallery((prev) => prev.filter((item) => item.id !== g.id))} className="bg-card p-1.5 sm:p-2 rounded"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Company Tab */}
        {tab === "company" && (
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
            <h2 className="font-cairo font-semibold text-base sm:text-lg text-foreground mb-4">{t.admin.manageCompany}</h2>
            <CompanyForm info={companyInfo} onSave={(info) => { setCompanyInfo(info); toast.success("Saved!"); }} t={t} />
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceForm = ({
  item,
  onSave,
  onCancel,
  t,
}: {
  item: ServiceItem;
  onSave: (s: ServiceItem) => void;
  onCancel: () => void;
  t: { admin: { image: string; save: string; cancel: string } };
}) => {
  const [form, setForm] = useState(item);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, video: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="border border-border rounded p-3 sm:p-4 space-y-3 bg-muted">
      <input placeholder="Title (EN)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="العنوان (AR)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" dir="rtl" />
      <textarea placeholder="Description (EN)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" rows={2} />
      <textarea placeholder="الوصف (AR)" value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" rows={2} dir="rtl" />
      
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">{t.admin.image}</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-3 sm:px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Image className="h-4 w-4" />
          <span className="text-xs sm:text-sm">اختر صورة من جهازك</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {form.image && (
          <img src={form.image} alt="preview" className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded border border-border mt-1" />
        )}
      </div>
      
      {/* Video Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">فيديو (اختياري)</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-3 sm:px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Video className="h-4 w-4" />
          <span className="text-xs sm:text-sm">اختر فيديو من جهازك</span>
          <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
        </label>
        {form.video && (
          <video src={form.video} controls className="h-20 w-32 sm:h-24 sm:w-40 object-cover rounded border border-border mt-1">
            متصفحك لا يدعم الفيديو
          </video>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => onSave(form)} className="flex items-center justify-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
        <button onClick={onCancel} className="flex items-center justify-center gap-1 border border-border px-4 py-2 rounded text-sm text-foreground"><X className="h-4 w-4" />{t.admin.cancel}</button>
      </div>
    </div>
  );
};

const GalleryForm = ({
  item,
  onSave,
  onCancel,
  t,
}: {
  item: GalleryItem;
  onSave: (g: GalleryItem) => void;
  onCancel: () => void;
  t: { admin: { image: string; save: string; cancel: string } };
}) => {
  const [form, setForm] = useState(item);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, video: reader.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="border border-border rounded p-3 sm:p-4 space-y-3 bg-muted">
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">{t.admin.image}</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-3 sm:px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Image className="h-4 w-4" />
          <span className="text-xs sm:text-sm">اختر صورة من جهازك</span>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {form.image && (
          <img src={form.image} alt="preview" className="h-24 sm:h-32 w-full object-cover rounded border border-border mt-1" />
        )}
      </div>
      
      {/* Video Upload */}
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">فيديو (اختياري)</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-3 sm:px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Video className="h-4 w-4" />
          <span className="text-xs sm:text-sm">اختر فيديو من جهازك</span>
          <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
        </label>
        {form.video && (
          <video src={form.video} controls className="h-24 sm:h-32 w-full object-cover rounded border border-border mt-1">
            متصفحك لا يدعم الفيديو
          </video>
        )}
      </div>
      
      <input placeholder="Description (EN)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="الوصف (AR)" value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" dir="rtl" />
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={() => onSave(form)} className="flex items-center justify-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
        <button onClick={onCancel} className="flex items-center justify-center gap-1 border border-border px-4 py-2 rounded text-sm text-foreground"><X className="h-4 w-4" />{t.admin.cancel}</button>
      </div>
    </div>
  );
};

const CompanyForm = ({
  info,
  onSave,
  t,
}: {
  info: { phone: string; email: string; address: string; addressAr: string; facebook: string };
  onSave: (i: { phone: string; email: string; address: string; addressAr: string; facebook: string }) => void;
  t: { admin: { save: string } };
}) => {
  const [form, setForm] = useState(info);
  return (
    <div className="space-y-3">
      <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="Address (EN)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="العنوان (AR)" value={form.addressAr} onChange={(e) => setForm({ ...form, addressAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" dir="rtl" />
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Facebook link"
            value={form.facebook ?? ""}
            onChange={(e) => setForm({ ...form, facebook: e.target.value })}
            className="w-full pl-10 pr-3 px-3 py-2 rounded border border-input bg-background text-foreground text-sm"
            dir="ltr"
          />
        </div>
        <button
          type="button"
          onClick={() => setForm({ ...form, facebook: "" })}
          className="shrink-0 inline-flex items-center gap-1 rounded border border-border bg-card px-3 py-2 text-xs sm:text-sm text-foreground hover:bg-muted transition-colors"
          title="Remove Facebook link"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-destructive" />
          <span className="hidden sm:inline">حذف</span>
        </button>
      </div>
      <button onClick={() => onSave(form)} className="flex items-center justify-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
    </div>
  );
};

export default AdminPage;
