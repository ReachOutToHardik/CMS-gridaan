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
import SectionToppers from "./SectionToppers";
import SectionCareers from "./SectionCareers";

const NAV_GROUPS = [
  {
    group: "Website",
    items: [
      { id: "identity", label: "School Identity" },
      { id: "banners", label: "Home Banners" },
      { id: "pages", label: "Pages & Menu" },
      { id: "toppers", label: "Academic Toppers" },
    ]
  },
  {
    group: "Content",
    items: [
      { id: "content", label: "About & Notices" },
      { id: "leadership", label: "Principal & Chairman" },
      { id: "academics", label: "Academics" },
      { id: "faculty", label: "Staff Members" },
      { id: "careers", label: "Careers & Jobs" },
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
  toppers:    { title: "Academic Toppers",         subtitle: "Manage your highest achieving students." },
  content:    { title: "About & Notices",          subtitle: "About us text, vision, mission, stats and notice board." },
  leadership: { title: "Principal & Chairman",     subtitle: "Desk messages and photos of school leadership." },
  academics:  { title: "Academics",               subtitle: "Academic sections and subjects offered." },
  faculty:    { title: "Staff Members",            subtitle: "All teachers and non-teaching staff." },
  careers:    { title: "Careers & Jobs",           subtitle: "Manage job postings to hire talent." },
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

    const storedLiveUrl = localStorage.getItem("liveUrl") || "/preview";
    if (storedLiveUrl.startsWith("/preview")) {
      setLiveUrl(`${storedLiveUrl}?schoolId=${schoolId}`);
    } else {
      setLiveUrl(storedLiveUrl);
    }

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

  // Max sizes: logos/staff photos = 500 KB, banners/gallery = 2 MB, passport = 200 KB
  const LIMITS: Record<string, number> = {
    headerLogo: 500, footerLogo: 500, principalPhoto: 500, chairpersonPhoto: 500,
  };
  const DEFAULT_LIMIT_KB = 2048; // 2 MB for banners and gallery images

  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => {
    const file = e.target.files?.[0]; if (!file) return;
    const name = e.target.name;
    const isDoc = name.startsWith("doc-");
    const isTopper = name.startsWith("topper-");
    const limitKB = isDoc ? 5120 : isTopper ? 200 : (LIMITS[name] ?? DEFAULT_LIMIT_KB);
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
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <aside className="w-56 bg-[#f7f6f2] border-r border-slate-200 flex flex-col sticky top-0 h-screen shrink-0 shadow-xs">
        {/* Logo Area */}
        <div className="px-5 py-5.5 border-b border-slate-200/60 flex flex-col text-center items-center justify-center">
          <p className="text-lg font-black text-slate-800 tracking-tight leading-none uppercase">Gridaan CMS</p>
          <p className="text-[9px] text-[#0f766e] font-extrabold mt-1.5 uppercase tracking-widest">ADMIN PANEL</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 custom-sidebar-scrollbar space-y-3">
          {NAV_GROUPS.map(group => {
            // Sleek card styling for each group to prevent them from looking merged
            let boxClass = "bg-slate-50 border border-slate-100";
            let borderClass = "border-l-slate-400";
            let textClass = "text-slate-700";
            if (group.group === "Website") { boxClass = "bg-amber-50/50 border border-amber-200/40"; borderClass = "border-l-amber-500"; textClass = "text-amber-900"; }
            if (group.group === "Content") { boxClass = "bg-emerald-50/50 border border-emerald-200/40"; borderClass = "border-l-emerald-500"; textClass = "text-emerald-900"; }
            if (group.group === "Media") { boxClass = "bg-violet-50/50 border border-violet-200/40"; borderClass = "border-l-violet-500"; textClass = "text-violet-900"; }
            if (group.group === "Admin") { boxClass = "bg-sky-50/50 border border-sky-200/40"; borderClass = "border-l-sky-500"; textClass = "text-sky-900"; }

            return (
              <div key={group.group} className={cn("p-2.5 rounded-lg space-y-2.5 shadow-3xs", boxClass)}>
                <div className="px-1 flex items-center">
                  <span className={cn(
                    "border-l-2 pl-2 text-[10px] font-extrabold uppercase tracking-wider leading-none",
                    borderClass,
                    textClass
                  )}>
                    {group.group}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      className={cn(
                        "w-full text-left py-2 px-2.5 rounded-md text-sm transition-all flex items-center font-semibold cursor-pointer",
                        active === item.id
                          ? "bg-[#0f766e] text-white shadow-xs font-bold"
                          : "text-slate-650 hover:bg-[#0f766e]/5 hover:text-[#0f766e]"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <Link
            href={liveUrl}
            target="_blank"
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-bold text-[#0f766e] bg-[#0f766e]/5 hover:bg-[#0f766e]/10 border border-[#0f766e]/20 rounded-md transition-all justify-center"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0f766e]" />
            View Website
          </Link>
          <button
            onClick={() => { localStorage.removeItem("isLoggedIn"); router.push("/login"); }}
            className="flex items-center gap-2 w-full px-3 py-1.5 text-xs font-semibold text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-md transition-all justify-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">

        <header className="bg-[#fdfdfb] border-b border-slate-200/60 px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-3xs">
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">{current.title}</h1>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">{current.subtitle}</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all shadow-xs cursor-pointer",
              saved
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-[#0f766e] text-white hover:bg-[#0d605a] disabled:opacity-50"
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

        <main className="flex-1 overflow-y-auto px-8 py-8 bg-[#fdfdfb]/40">
          <div className="max-w-3xl">
            {active === "identity"   && <SectionIdentity   {...props} />}
            {active === "banners"    && <SectionBanners    {...props} />}
            {active === "pages"      && <SectionPages      {...props} />}
            {active === "toppers"    && <SectionToppers    {...props} />}
            {active === "gallery"    && <SectionGallery    {...props} />}
            {active === "content"    && <SectionContent    {...props} />}
            {active === "leadership" && <SectionLeadership {...props} />}
            {active === "academics"  && <SectionAcademics  {...props} />}
            {active === "faculty"    && <SectionFaculty    {...props} />}
            {active === "careers"    && <SectionCareers    {...props} />}
            {active === "activities" && <SectionActivities {...props} />}
            {active === "settings"   && <SectionSettings   {...props} />}
            {active === "disclosure" && <SectionDisclosure {...props} />}
          </div>
        </main>
      </div>
    </div>
  );
}
