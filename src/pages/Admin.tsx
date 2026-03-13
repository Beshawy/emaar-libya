import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData, ServiceItem, GalleryItem } from "@/contexts/DataContext";
import { LogOut, Image, Wrench, Building, Plus, Pencil, Trash2, Save, X, Facebook } from "lucide-react";
import { toast } from "sonner";

const ADMIN_EMAIL = "emarlybya44@gmail.com";
const ADMIN_PASS = "Password246";

const AdminPage = () => {
  const { t, lang } = useLanguage();
  const { services, setServices, gallery, setGallery, companyInfo, setCompanyInfo } = useData();
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
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <form onSubmit={handleLogin} className="bg-card p-8 rounded-lg shadow-lg border border-border w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <img src="/images/logo.jpeg" alt="Emaar Libya" className="h-16 w-16 rounded" />
          </div>
          <h2 className="font-cairo font-bold text-xl text-center text-foreground mb-6">{t.admin.login}</h2>
          <input
            type="email"
            placeholder={t.admin.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-3 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="password"
            placeholder={t.admin.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-4 rounded border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="w-full bg-accent text-accent-foreground py-3 rounded font-semibold">
            {t.admin.loginBtn}
          </button>
        </form>
      </div>
    );
  }

  const deleteService = (id: string) => setServices((prev) => prev.filter((s) => s.id !== id));
  const deleteGalleryItem = (id: string) => setGallery((prev) => prev.filter((g) => g.id !== id));

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
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="font-cairo font-bold text-xl">{t.admin.dashboard}</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:text-accent transition-colors">
            <LogOut className="h-4 w-4" />
            {t.admin.logout}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: "services" as const, icon: Wrench, label: t.admin.manageServices },
            { key: "gallery" as const, icon: Image, label: t.admin.manageGallery },
            { key: "company" as const, icon: Building, label: t.admin.manageCompany },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                tab === item.key ? "bg-accent text-accent-foreground" : "bg-card text-foreground border border-border"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {tab === "services" && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-cairo font-semibold text-lg text-foreground">{t.admin.manageServices}</h2>
              <button
                onClick={() => setEditingService({ id: "", title: "", titleAr: "", description: "", descriptionAr: "", image: "" })}
                className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                {t.admin.add}
              </button>
            </div>
            {editingService && (
              <ServiceForm item={editingService} onSave={saveService} onCancel={() => setEditingService(null)} t={t} />
            )}
            <div className="space-y-3 mt-4">
              {services.map((s) => (
                <div key={s.id} className="flex items-center justify-between border border-border rounded p-3">
                  <div className="flex items-center gap-3">
                    <img src={s.image} alt="" className="h-12 w-12 rounded object-cover" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{lang === "ar" ? s.titleAr : s.title}</p>
                      <p className="text-xs text-muted-foreground">{lang === "ar" ? s.descriptionAr : s.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingService(s)} className="text-muted-foreground hover:text-accent"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => deleteService(s.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {tab === "gallery" && (
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-cairo font-semibold text-lg text-foreground">{t.admin.manageGallery}</h2>
              <button
                onClick={() => setEditingGallery({ id: "", image: "", description: "", descriptionAr: "" })}
                className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-2 rounded text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                {t.admin.add}
              </button>
            </div>
            {editingGallery && (
              <GalleryForm item={editingGallery} onSave={saveGalleryItem} onCancel={() => setEditingGallery(null)} t={t} />
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative group rounded overflow-hidden border border-border">
                  <img src={g.image} alt="" className="w-full aspect-square object-cover" />
                  <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => setEditingGallery(g)} className="bg-card p-2 rounded"><Pencil className="h-4 w-4 text-foreground" /></button>
                    <button onClick={() => deleteGalleryItem(g.id)} className="bg-card p-2 rounded"><Trash2 className="h-4 w-4 text-destructive" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Company Tab */}
        {tab === "company" && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="font-cairo font-semibold text-lg text-foreground mb-4">{t.admin.manageCompany}</h2>
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

  return (
    <div className="border border-border rounded p-4 space-y-3 bg-muted">
      <input placeholder="Title (EN)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="العنوان (AR)" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" dir="rtl" />
      <textarea placeholder="Description (EN)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" rows={2} />
      <textarea placeholder="الوصف (AR)" value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" rows={2} dir="rtl" />
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">{t.admin.image}</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Image className="h-4 w-4" />
          اختر صورة من جهازك
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {form.image && (
          <img src={form.image} alt="preview" className="h-24 w-24 object-cover rounded border border-border mt-1" />
        )}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="flex items-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
        <button onClick={onCancel} className="flex items-center gap-1 border border-border px-4 py-2 rounded text-sm text-foreground"><X className="h-4 w-4" />{t.admin.cancel}</button>
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

  return (
    <div className="border border-border rounded p-4 space-y-3 bg-muted">
      <div className="space-y-2">
        <label className="block text-sm text-muted-foreground">{t.admin.image}</label>
        <label className="flex items-center gap-2 cursor-pointer w-fit bg-background border border-input hover:border-accent px-4 py-2 rounded text-sm text-foreground transition-colors">
          <Image className="h-4 w-4" />
          اختر صورة من جهازك
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
        {form.image && (
          <img src={form.image} alt="preview" className="h-32 w-full object-cover rounded border border-border mt-1" />
        )}
      </div>
      <input placeholder="Description (EN)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" />
      <input placeholder="الوصف (AR)" value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm" dir="rtl" />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="flex items-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
        <button onClick={onCancel} className="flex items-center gap-1 border border-border px-4 py-2 rounded text-sm text-foreground"><X className="h-4 w-4" />{t.admin.cancel}</button>
      </div>
    </div>
  );
};

const CompanyForm = ({
  info,
  onSave,
  t,
}: {
  info: { phone: string; email: string; address: string; addressAr: string; facebook?: string };
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
      <div className="flex items-center gap-2">
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
          className="shrink-0 inline-flex items-center gap-1 rounded border border-border bg-card px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          title="Remove Facebook link"
        >
          <Trash2 className="h-4 w-4 text-destructive" />
          حذف
        </button>
      </div>
      <button onClick={() => onSave(form)} className="flex items-center gap-1 bg-accent text-accent-foreground px-4 py-2 rounded text-sm"><Save className="h-4 w-4" />{t.admin.save}</button>
    </div>
  );
};

export default AdminPage;
