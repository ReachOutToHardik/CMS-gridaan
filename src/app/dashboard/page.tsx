"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { initialData, SchoolData } from "@/lib/data";
import { Save, Loader2, ExternalLink, CheckCircle2, LogOut, Monitor } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { SectionIdentity } from "./SectionIdentity";
import { SectionBanners, SectionPages, SectionGallery } from "./SectionBanners";
import { SectionContent, SectionLeadership } from "./SectionContent";
import { SectionAcademics, SectionFaculty, SectionActivities, SectionSettings } from "./SectionAcademics";
import { SectionDisclosure } from "./SectionDisclosure";

const NAV_GROUPS = [
  {
    group: "Website",
    items: [
      { id: "identity", label: "School Identity" },
      { id: "banners", label: "Home Banners" },
      { id: "pages", label: "Pages & Menu" },
    ]
  },
  {
    group: "Content",
    items: [
      { id: "content", label: "About & Notices" },
      { id: "leadership", label: "Principal & Chairman" },
      { id: "academics", label: "Academics" },
      { id: "faculty", label: "Staff Members" },
      { id: "activities", label: "Activities & Events" },
    ]
  },
  {
    group: "Media",
    items: [
      { id: "gallery", label: "Photo Albums" },
    ]
  },
  {
    group: "Admin",
    items: [
      { id: "settings", label: "Settings & Contact" },
      { id: "disclosure", label: "Mandatory Disclosure" },
    ]
  },
];

const SECTION_TITLES: Record<string, { title: string; subtitle: string }> = {
  identity:   { title: "School Identity",         subtitle: "School name, logo, theme color and basic info." },
  banners:    { title: "Home Page Banners",        subtitle: "The large images that rotate on your home page." },
  pages:      { title: "Pages & Menu",             subtitle: "Create pages and choose which ones show in the top menu." },
  content:    { title: "About & Notices",          subtitle: "About us text, vision, mission, stats and notice board." },
  leadership: { title: "Principal & Chairman",     subtitle: "Desk messages and photos of school leadership." },
  academics:  { title: "Academics",               subtitle: "Academic sections and subjects offered." },
  faculty:    { title: "Staff Members",            subtitle: "All teachers and non-teaching staff." },
  activities: { title: "Activities & Events",      subtitle: "Co-curricular activities and upcoming school events." },
  gallery:    { title: "Photo Albums",             subtitle: "Create albums for different events and occasions." },
  settings:   { title: "Settings & Contact",       subtitle: "Contact details, social media, CBSE info and office timings." },
  disclosure: { title: "Mandatory Public Disclosure", subtitle: "Public information required by educational boards." },
};

export default function Dashboard() {
  const [data, setData] = useState<SchoolData>(initialData);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const [active, setActive] = useState("identity");
  const router = useRouter();

  const [liveUrl, setLiveUrl] = useState("/preview");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.push("/login");
      return;
    }
    const schoolId = localStorage.getItem("schoolId");
    if (!schoolId) {
      router.push("/login");
      return;
    }

    setLiveUrl(localStorage.getItem("liveUrl") || "/preview");

    fetch(`/api/school-data?schoolId=${schoolId}`)
      .then(r => r.json())
      .then(d => { if (d && !d.error) setData({ ...initialData, ...d }); setLoading(false); })
      .catch(() => setLoading(false));
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    const schoolId = localStorage.getItem("schoolId");
    const r = await fetch(`/api/school-data?schoolId=${schoolId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (r.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    setSaving(false);
  };

  // Max sizes: logos/staff photos = 500 KB, banners/gallery = 2 MB
  const LIMITS: Record<string, number> = {
    headerLogo: 500, footerLogo: 500, principalPhoto: 500, chairpersonPhoto: 500,
  };
  const DEFAULT_LIMIT_KB = 2048; // 2 MB for banners and gallery images

  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    const name = e.target.name;
    const isDoc = name.startsWith("doc-");
    const limitKB = isDoc ? 5120 : (LIMITS[name] ?? DEFAULT_LIMIT_KB);
    const limitBytes = limitKB * 1024;

    // Validate type
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      setUploadError("Only images (JPG, PNG, WEBP) and PDF documents are allowed.");
      e.target.value = "";
      return;
    }
    // Validate size
    if (file.size > limitBytes) {
      const limitLabel = limitKB >= 1024 ? `${limitKB / 1024} MB` : `${limitKB} KB`;
      setUploadError(`File too large. Max allowed is ${limitLabel}. Your file is ${(file.size / 1024).toFixed(0)} KB. Please compress it before uploading.`);
      e.target.value = "";
      return;
    }

    setUploadError(null);
    setUploading(name);
    const path = `school-assets/${Math.random().toString(36).slice(2)}.${file.name.split(".").pop()}`;
    const { error } = await supabase.storage.from("school-images").upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("school-images").getPublicUrl(path);
      cb(publicUrl);
    } else {
      setUploadError("Upload failed. Please try again.");
    }
    setUploading(null);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-3">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    </div>
  );

  const props = { data, setData, upload, uploading };
  const current = SECTION_TITLES[active];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen shrink-0">
        {/* Logo Area */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gray-900 rounded flex items-center justify-center">
              <Monitor className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-none">School CMS</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {NAV_GROUPS.map(group => (
            <div key={group.group} className="mb-4">
              <p className="px-3 mb-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest">{group.group}</p>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded text-xs transition-all mb-0.5",
                    active === item.id
                      ? "bg-gray-900 text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-2 py-3 border-t border-gray-100 space-y-1.5">
          <Link
            href={liveUrl}
            target="_blank"
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Website
          </Link>
          <button
            onClick={() => { localStorage.removeItem("isLoggedIn"); router.push("/login"); }}
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-gray-400 hover:bg-red-50 hover:text-red-500 rounded transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">

        <header className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{current.title}</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">{current.subtitle}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded text-xs font-semibold transition-all",
              saved
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
            )}
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saving ? "Saving..." : saved ? "Changes Saved" : "Save Changes"}
          </button>
        </header>

        {uploadError && (
          <div className="mx-8 mt-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs font-medium">
            <span className="shrink-0 mt-0.5">⚠</span>
            <span className="flex-1">{uploadError}</span>
            <button onClick={() => setUploadError(null)} className="shrink-0 text-red-400 hover:text-red-600 font-bold">✕</button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-3xl">
            {active === "identity"   && <SectionIdentity   {...props} />}
            {active === "banners"    && <SectionBanners    {...props} />}
            {active === "pages"      && <SectionPages      {...props} />}
            {active === "gallery"    && <SectionGallery    {...props} />}
            {active === "content"    && <SectionContent    {...props} />}
            {active === "leadership" && <SectionLeadership {...props} />}
            {active === "academics"  && <SectionAcademics  {...props} />}
            {active === "faculty"    && <SectionFaculty    {...props} />}
            {active === "activities" && <SectionActivities {...props} />}
            {active === "settings"   && <SectionSettings   {...props} />}
            {active === "disclosure" && <SectionDisclosure {...props} />}
          </div>
        </main>
      </div>
    </div>
  );
}
