"use client";
import { useState, useEffect } from "react";
import { initialData, SchoolData } from "@/lib/data";
import { Mail, MapPin, Phone, ArrowLeft, Loader2, Calendar, ExternalLink, FileText, ArrowRight, Trophy, BookOpen, Users, Award, CheckCircle, Clock, ChevronLeft, ChevronRight, Bell, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export default function PreviewPage() {
  const [data, setData] = useState<SchoolData>(initialData);
  const [loading, setIsLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [tab, setTab] = useState("home");
  const [showTicker, setShowTicker] = useState(true);

  useEffect(() => {
    fetch("/api/school-data")
      .then(r => r.json())
      .then(d => {
        if (d && !d.error) setData({ ...initialData, ...d });
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!data.banners || data.banners.length <= 1 || tab !== "home") return;
    const t = setInterval(() => setSlide(p => (p + 1) % data.banners.length), 6000);
    return () => clearInterval(t);
  }, [data.banners, tab]);

  const go = (t: string) => {
    setTab(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-light">
        <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
      </div>
    );
  }

  const currentBanner = data.banners?.[slide] || {
    image: "",
    title: data.schoolName,
    subtitle: data.tagline,
    buttonText: "",
    buttonLink: "",
  };

  const navLinks = [
    { label: "Home", tab: "home" },
    { label: "About Us", tab: "about" },
    { label: "Academics", tab: "academics" },
    { label: "Faculty", tab: "faculty" },
    { label: "Gallery", tab: "gallery" },
    { label: "Activities", tab: "activities" },
    { label: "CBSE Disclosure", tab: "disclosure" },
    ...(data.customPages || [])
      .filter(p => p.showInMenu && p.title !== "Rules & Regulations" && p.title.toLowerCase() !== "rules and regulations")
      .map(p => ({ label: p.title, tab: `page-${p.id}` })),
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-gold selection:text-brand-blue">
      {/* Institutional Top Affiliation & Contact Bar */}
      <div className="bg-brand-blue text-white py-2 px-6 border-b border-white/10 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs tracking-wider gap-2">
          <div className="flex flex-wrap items-center gap-4 text-slate-200 font-semibold">
            <span>AFFILIATED TO {data.affiliationBoard?.toUpperCase()}</span>
            <span className="text-brand-gold">•</span>
            <span>AFFILIATION NO: <span className="font-bold text-white">{data.affiliationNumber}</span></span>
            <span className="text-brand-gold">•</span>
            <span>SCHOOL CODE: <span className="font-bold text-white">{data.schoolCode}</span></span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>{data.phone}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>{data.email}</span>
            </div>
            <button onClick={() => go("disclosure")} className="text-brand-gold hover:underline font-black uppercase tracking-widest">
              Mandatory Disclosure
            </button>
            <button
              onClick={() => setShowTicker(!showTicker)}
              className="bg-white/15 px-3 py-1 rounded text-brand-gold hover:bg-brand-red hover:text-white transition-all flex items-center gap-1.5 font-bold uppercase tracking-widest"
              title={showTicker ? "Hide Marquee Announcement Bar" : "Show Marquee Announcement Bar"}
            >
              <Bell className="w-3.5 h-3.5 shrink-0" />
              <span>{showTicker ? "Hide Ticker" : "Show Ticker"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation (Santsar Style) */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-brand-gold shadow-md transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <button onClick={() => go("home")} className="flex items-center gap-4 text-left group">
            {data.headerLogo ? (
              <img src={data.headerLogo} className="h-14 md:h-16 object-contain group-hover:scale-105 transition-transform duration-300" alt="School Crest" />
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-brand-blue flex items-center justify-center text-brand-gold font-serif font-bold text-2xl shadow-inner">
                  {data.schoolName?.charAt(0) || "S"}
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-brand-blue font-serif uppercase tracking-tight leading-none group-hover:text-brand-red transition-colors">
                    {data.schoolName}
                  </div>
                  <div className="text-[10px] md:text-xs text-brand-red font-black uppercase tracking-[0.25em] mt-1 leading-none">
                    {data.tagline || "Excellence in Learning"}
                  </div>
                </div>
              </>
            )}
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-black uppercase tracking-wider text-brand-blue">
            {navLinks.map(l => {
              const active = tab === l.tab;
              return (
                <button
                  key={l.tab}
                  onClick={() => go(l.tab)}
                  className={cn(
                    "py-2 relative transition-colors hover:text-brand-red font-bold tracking-widest",
                    active ? "text-brand-red font-black" : "text-brand-blue"
                  )}
                >
                  {l.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-red rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => go("about")}
              className="bg-brand-red text-white px-6 py-3 text-xs font-black uppercase tracking-widest shadow-lg hover:bg-brand-blue transition-all border-b-2 border-black/20"
            >
              Apply Online
            </button>
          </div>
        </div>
      </header>

      {/* Marquee Ticker (Santsar Style Announcement Bar) */}
      {showTicker && data.notices && data.notices.length > 0 && (
        <div className="bg-brand-red flex items-center h-12 border-b-2 border-brand-gold text-white overflow-hidden shadow-sm">
          <div className="shrink-0 bg-brand-blue h-full px-6 md:px-8 flex items-center gap-2 relative z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)] border-r border-brand-gold">
            <span className="text-xs font-black uppercase tracking-widest text-brand-gold italic">LATEST UPDATES:</span>
          </div>
          <div className="whitespace-nowrap flex items-center gap-16 text-xs font-bold uppercase tracking-wider animate-marquee overflow-hidden w-full">
            <div className="flex gap-16 min-w-full">
              {[...data.notices, ...data.notices].map((n, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span className="text-brand-gold font-black">[{n.date}]</span>
                  <span className="text-white font-semibold">{n.text}</span>
                  <span className="text-white/40">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="min-h-[70vh]">
        {/* HOME SECTION */}
        {tab === "home" && (
          <>
            {/* Hero Banner Section */}
            <section className="relative h-[65vh] md:h-[75vh] overflow-hidden bg-[#09111f]">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              <img
                key={currentBanner.image}
                src={currentBanner.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800"}
                className="absolute inset-0 w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
                alt="Campus View"
              />

              <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center">
                <div className="max-w-3xl text-white space-y-6">
                  <div className="inline-block bg-brand-red px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-white shadow-lg border-l-4 border-brand-gold animate-in fade-in slide-in-from-left duration-500">
                    {data.schoolCode ? `SCHOOL CODE: ${data.schoolCode}` : "BUILDING GLOBAL LEADERS"}
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif leading-none uppercase tracking-tight text-white shadow-sm animate-in fade-in slide-in-from-bottom duration-700">
                    {currentBanner.title || data.schoolName}
                  </h1>

                  <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl leading-relaxed animate-in fade-in duration-1000">
                    {currentBanner.subtitle || data.tagline || "Empowering minds, building character, and achieving academic excellence."}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4 animate-in fade-in slide-in-from-bottom duration-1000">
                    <button
                      onClick={() => go(currentBanner.buttonLink || "about")}
                      className="bg-brand-gold text-brand-blue px-8 py-4 text-xs font-black uppercase tracking-widest shadow-xl hover:bg-white transition-all border-b-4 border-brand-blue"
                    >
                      {currentBanner.buttonText || "Discover Our Legacy"}
                    </button>
                    <button
                      onClick={() => go("academics")}
                      className="border-2 border-white text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-brand-blue transition-all backdrop-blur-sm"
                    >
                      Explore Academics
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Indicator Dots */}
              {data.banners && data.banners.length > 1 && (
                <div className="absolute bottom-8 right-12 z-30 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                  {data.banners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSlide(idx)}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300",
                        slide === idx ? "w-8 bg-brand-gold" : "w-2.5 bg-white/50 hover:bg-white"
                      )}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Quick Access Card Grid (Fee Online, Academic Calendar, CBSE, Student ERP) */}
            <section className="bg-gray-50 py-12 md:py-16 border-b border-gray-200 shadow-inner">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Online Fee Portal", desc: "Secure Online Payment Gateway", icon: <FileText size={24} />, color: "text-blue-700", bg: "bg-blue-100", tab: "about" },
                    { label: "Academic Calendar", desc: "Session 2026-27 Schedule", icon: <Calendar size={24} />, color: "text-red-700", bg: "bg-red-100", tab: "activities" },
                    { label: "CBSE Mandatory Info", desc: "Public Disclosure & Affiliation", icon: <Award size={24} />, color: "text-emerald-700", bg: "bg-emerald-100", tab: "disclosure" },
                    { label: "Student & ERP Login", desc: "Portal & Examination Results", icon: <Users size={24} />, color: "text-amber-600", bg: "bg-amber-100", tab: "academics" }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => go(item.tab)}
                      className="bg-white group relative flex items-center gap-5 overflow-hidden rounded-xl p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-brand-gold text-left"
                    >
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform group-hover:scale-110 shadow-inner`}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-blue group-hover:text-brand-red transition-colors">{item.label}</h3>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">{item.desc}</p>
                      </div>
                      <div className="absolute right-4 opacity-10 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-brand-blue">
                        <ArrowRight size={18} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Santsar Style Split Overview & Notice Board Section */}
            <section className="py-20 md:py-28 bg-white">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-start">
                {/* Left 2 Columns: Legacy & Principal */}
                <div className="lg:col-span-2 space-y-12">
                  <div className="space-y-4">
                    <span className="text-xs font-black text-brand-red uppercase tracking-[0.3em] block border-l-4 border-brand-red pl-3">
                      Institutional Overview
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-blue font-serif leading-tight">
                      A Legacy of <span className="text-brand-red italic font-serif">Global Leadership</span>
                    </h2>
                    <p className="text-slate-700 leading-relaxed text-base font-normal">
                      {data.aboutUsText || `Established in ${data.establishedYear || "1995"}, ${data.schoolName} stands as a beacon of high-quality holistic education. We combine rigorous academic preparation with robust cultural values to prepare youth for impactful leadership.`}
                    </p>
                  </div>

                  {/* Two Feature Cards */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm border-t-4 border-t-brand-blue space-y-3">
                      <h4 className="text-xl font-bold text-brand-blue font-serif">Academic Framework</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Our curriculum challenges and empowers students with CBSE board-ready proficiency and intellectual curiosity.
                      </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200 shadow-sm border-t-4 border-t-brand-red space-y-3">
                      <h4 className="text-xl font-bold text-brand-blue font-serif">Character Building</h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        Beyond classrooms, we instill core values of empathy, discipline, and profound respect for Indian cultural heritage.
                      </p>
                    </div>
                  </div>

                  {/* Message From The Principal Card */}
                  <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-md border-l-[8px] border-l-brand-blue flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    {data.principalPhoto ? (
                      <img src={data.principalPhoto} className="w-32 h-32 md:w-36 md:h-36 rounded-xl object-cover shadow border-2 border-white shrink-0" alt="Principal" />
                    ) : (
                      <div className="w-32 h-32 rounded-xl bg-brand-blue text-brand-gold flex items-center justify-center font-serif text-4xl shadow shrink-0">
                        {data.principalName?.charAt(0) || "P"}
                      </div>
                    )}
                    <div className="space-y-3 flex-1">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-brand-blue font-serif">Message From The Principal</h3>
                        <span className="text-xs font-black text-brand-red uppercase tracking-wider block">
                          {data.principalName || "Principal"} ({data.principalQualification || "M.A., B.Ed."})
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 italic leading-relaxed font-serif">
                        "{data.principalMessage || 'Education is not merely the filling of a pail, but the lighting of a fire. We are committed to fostering global citizens equipped with traditional values.'}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right 1 Column: Notice Board Card & Quick Links */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col">
                    <div className="bg-brand-blue text-white p-5 flex items-center justify-between border-b-2 border-brand-gold shadow-sm">
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-5 h-5 text-brand-gold" />
                        <h3 className="font-serif font-bold text-lg tracking-wide uppercase text-brand-gold">Notice Board</h3>
                      </div>
                      <button
                        onClick={() => setShowTicker(!showTicker)}
                        className="text-[10px] bg-brand-red hover:bg-red-700 text-white px-2.5 py-1 rounded font-black tracking-wider uppercase shadow transition-colors inline-flex items-center gap-1"
                        title="Toggle Marquee Ticker"
                      >
                        {showTicker ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        <span>{showTicker ? "Mute" : "Unmute"}</span>
                      </button>
                    </div>
                    <div className="p-6 divide-y divide-gray-100 max-h-[400px] overflow-y-auto space-y-4">
                      {data.notices && data.notices.length > 0 ? (
                        data.notices.map((n) => (
                          <div key={n.id} className="pt-4 first:pt-0 flex items-start gap-3.5 group cursor-pointer hover:bg-gray-50/50 p-2 rounded transition-colors">
                            <span className="px-2.5 py-1 bg-brand-red text-white font-black text-[10px] rounded uppercase shrink-0 mt-0.5 shadow-sm">
                              {n.date}
                            </span>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-slate-900 leading-snug group-hover:text-brand-blue font-serif transition-colors">
                                {n.text}
                              </p>
                              <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
                                Category: {n.type}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-8">No notices available at the moment.</p>
                      )}
                    </div>
                    <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                      <button onClick={() => go("disclosure")} className="text-xs font-black uppercase tracking-widest text-brand-blue hover:text-brand-red transition-colors inline-flex items-center gap-1 font-sans">
                        <span>View All Circulars</span> <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Links Menu */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 border-t-4 border-brand-gold">
                    <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue border-b pb-3 border-gray-100 font-sans">
                      Explore Institutional Info
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Mandatory Public Disclosure", tab: "disclosure" },
                        { label: "Admission Criteria & Eligibility", tab: "about" },
                        { label: "Fee Structure & Secure Portal", tab: "about" },
                        { label: "Academic & Holiday Calendar", tab: "activities" }
                      ].map((lnk, idx) => (
                        <button
                          key={idx}
                          onClick={() => go(lnk.tab)}
                          className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-brand-blue hover:text-white transition-all text-left text-xs font-bold text-slate-700 group shadow-sm border border-gray-100 font-sans"
                        >
                          <span className="group-hover:text-brand-gold transition-colors">{lnk.label}</span>
                          <ChevronRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Santsar Style Life at SPS Gallery Section */}
            <section className="py-20 md:py-28 bg-gray-50 border-t border-b border-gray-200 shadow-inner">
              <div className="max-w-7xl mx-auto px-6 space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-red block border-l-4 border-brand-red pl-3 font-sans">
                      Vibrant Campus Experience
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-brand-blue tracking-tight leading-tight">
                      Life at <span className="text-brand-red font-serif italic font-bold">{data.shortName || "ZPS"}</span> Gallery
                    </h2>
                  </div>
                  <button onClick={() => go("gallery")} className="px-8 py-4 bg-brand-blue text-brand-gold border-b-4 border-brand-gold rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-brand-red hover:text-white hover:border-brand-blue transition-all duration-300 self-start md:self-auto font-sans">
                    Explore Full Gallery
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {(data.photoAlbums && data.photoAlbums[0] ? data.photoAlbums[0].images.slice(0, 3) : [
                    { id: "1", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800", caption: "Independence Day Celebration" },
                    { id: "2", url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800", caption: "Annual Sports Meet & Athletics" },
                    { id: "3", url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800", caption: "Science & Innovation Exhibition" }
                  ]).map((img, idx) => (
                    <div key={idx} onClick={() => go("gallery")} className="group relative h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                      <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8">
                        <div className="space-y-2 text-white">
                          <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-blue px-3 py-1 rounded shadow border border-brand-gold font-sans">
                            Campus Album
                          </span>
                          <p className="text-xl font-bold font-serif leading-snug drop-shadow-md group-hover:text-brand-gold transition-colors">{img.caption}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Highlights Bar */}
            {data.highlights && data.highlights.length > 0 && (
              <section className="py-16 bg-brand-blue text-white border-y-4 border-brand-gold relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                  {data.highlights.map(h => (
                    <div key={h.id} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur shadow-lg group hover:border-brand-gold transition-all duration-300">
                      <div className="text-3xl text-brand-gold mb-3 flex justify-center group-hover:scale-125 transition-transform">{h.icon || <Trophy className="w-8 h-8" />}</div>
                      <div className="text-4xl md:text-5xl font-black font-serif tracking-tight text-white mb-2">{h.value}</div>
                      <div className="text-xs text-brand-gold font-black uppercase tracking-widest font-sans">{h.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Santsar Style Testimonials (What Parents Say About Us) */}
            <section className="py-20 md:py-28 bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 items-center">
                <div className="space-y-6">
                  <span className="text-xs font-black text-brand-red uppercase tracking-[0.3em] block border-l-4 border-brand-red pl-3 font-sans">
                    Trusted by Community
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-brand-blue leading-tight font-serif">
                    What <span className="text-brand-red italic font-serif font-bold">Parents</span> Say About Us
                  </h2>
                  <p className="text-xs font-sans text-slate-600 leading-relaxed font-normal">
                    Discover the experiences of our parent community who have partnered with us in their children's educational journey and character building.
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button className="w-12 h-12 rounded-full border-2 border-brand-blue flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-md group">
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-brand-blue flex items-center justify-center text-brand-gold hover:bg-brand-red hover:text-white transition-all shadow-md border border-brand-gold group">
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                  {(data.testimonials && data.testimonials.length > 0 ? data.testimonials : [
                    { id: "1", name: "Dr. Santosh Tripathi", role: "Parent of Aarav, Class X", message: "Gridaan School has provided an exceptional foundation for my son. The teachers are highly supportive and emphasize discipline and academic excellence.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
                    { id: "2", name: "Priya Singh", role: "Alumnus (Batch of 2022)", message: "The values and confidence I gained at Gridaan helped me succeed at top universities. The balance between studies and sports is perfect.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200" }
                  ]).map((test) => (
                    <div key={test.id} className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-lg space-y-6 flex flex-col justify-between border-t-8 border-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      <div className="space-y-4">
                        <div className="flex gap-1.5 text-amber-500">
                          {"★★★★★".split("").map((star, i) => <span key={i} className="text-xl" title="5 Star Review">{star}</span>)}
                        </div>
                        <p className="text-xs text-slate-700 italic leading-relaxed font-serif">
                          "{test.message}"
                        </p>
                      </div>
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                        {test.photo ? (
                          <img src={test.photo} alt={test.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-blue shadow" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-brand-blue text-brand-gold font-serif text-xl flex items-center justify-center shadow border border-brand-gold">
                            {test.name.charAt(0)}
                          </div>
                        )}
                        <div className="space-y-0.5">
                          <h4 className="text-base font-bold font-serif text-brand-blue">{test.name}</h4>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-sans">{test.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ABOUT SECTION */}
        {tab === "about" && (
          <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-6 space-y-20 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Institutional Identity</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">About {data.schoolName}</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 text-slate-700 font-medium text-lg leading-relaxed">
                <p>{data.aboutUsText}</p>
                <div className="p-6 bg-brand-blue text-white rounded-2xl border-l-8 border-brand-gold space-y-2 shadow-lg">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold">Our Educational Motto</h4>
                  <p className="text-base italic font-serif">"{data.tagline || 'Excellence in Learning'}"</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-gold">
                  <img src={data.aboutUsImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800"} className="w-full h-full object-cover" alt="Campus Life" />
                </div>
              </div>
            </div>

            {/* Vision and Mission */}
            <div className="grid md:grid-cols-2 gap-8 pt-12 border-t border-gray-200">
              <div className="p-10 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm space-y-4 border-t-8 border-t-brand-blue">
                <BookOpen className="w-10 h-10 text-brand-blue" />
                <h3 className="text-2xl font-bold text-brand-blue font-serif">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed text-sm">"{data.visionText || 'To be an institution of global distinction that nurtures intellectual growth, ethical leadership, and dedicated citizenship.'}"</p>
              </div>

              <div className="p-10 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm space-y-4 border-t-8 border-t-brand-red">
                <Trophy className="w-10 h-10 text-brand-red" />
                <h3 className="text-2xl font-bold text-brand-blue font-serif">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed text-sm">"{data.missionText || 'To provide a stimulating learning environment where students discover their talents, develop critical thinking, and uphold Indian cultural traditions.'}"</p>
              </div>
            </div>

            {/* Core Values */}
            {data.coreValues && data.coreValues.length > 0 && (
              <div className="space-y-10 pt-12">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-brand-blue font-serif">Core Institutional Values</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.coreValues.map(v => (
                    <div key={v.id} className="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm text-center space-y-3 hover:border-brand-gold transition-colors">
                      <div className="w-14 h-14 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto text-2xl">
                        {v.icon}
                      </div>
                      <h4 className="font-bold text-brand-blue font-serif text-lg">{v.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* ACADEMICS SECTION */}
        {tab === "academics" && (
          <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-6 space-y-20 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Academic Architecture</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">Academics & Curriculum</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {data.academicSections?.map(s => (
                <div key={s.id} className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 shadow-md group flex flex-col justify-between">
                  {s.image && (
                    <div className="aspect-video overflow-hidden border-b border-gray-200">
                      <img src={s.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={s.title} />
                    </div>
                  )}
                  <div className="p-8 space-y-4 flex-1">
                    <h3 className="text-2xl font-bold text-brand-blue font-serif">{s.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">{s.description}</p>
                  </div>
                  <div className="px-8 py-4 bg-brand-blue text-brand-gold text-xs font-black uppercase tracking-widest flex items-center justify-between">
                    <span>CBSE ALIGNED STREAM</span>
                    <CheckCircle className="w-4 h-4 text-brand-gold" />
                  </div>
                </div>
              ))}
            </div>

            {data.subjects && data.subjects.length > 0 && (
              <div className="p-10 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm space-y-8">
                <h3 className="text-3xl font-bold text-brand-blue font-serif text-center">Curriculum Subjects Offered</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.subjects.map(sub => (
                    <div key={sub.id} className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm border-l-4 border-l-brand-blue">
                      <p className="font-bold text-brand-red uppercase tracking-wider text-xs mb-2">{sub.grade}</p>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">{sub.list}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* FACULTY SECTION */}
        {tab === "faculty" && (
          <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-6 space-y-16 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Our Intellectual Capital</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">Eminent Faculty & Staff</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.faculty?.map(f => (
                <div key={f.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-8 items-center sm:items-start hover:shadow-lg transition-shadow border-t-4 border-t-brand-blue">
                  <img src={f.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400"} className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover shrink-0 shadow border-2 border-white" alt={f.name} />
                  <div className="space-y-2.5 text-center sm:text-left flex-1">
                    <h4 className="text-2xl font-bold text-brand-blue font-serif">{f.name}</h4>
                    <p className="text-xs font-black text-brand-red uppercase tracking-widest">{f.designation} · {f.department}</p>
                    {f.qualification && (
                      <div className="pt-1">
                        <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded text-[11px] font-bold text-slate-700">
                          {f.qualification}
                        </span>
                      </div>
                    )}
                    {f.experience && <p className="text-xs font-semibold text-slate-500 pt-1">Professional Experience: {f.experience}</p>}
                    {f.bio && <p className="text-xs text-slate-600 italic pt-2 border-t border-gray-200">"{f.bio}"</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALLERY SECTION */}
        {tab === "gallery" && (
          <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-6 space-y-20 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Visual Chronicles</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">Campus & Event Gallery</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            {data.photoAlbums && data.photoAlbums.length > 0 ? (
              data.photoAlbums.map(album => (
                <div key={album.id} className="space-y-8 p-10 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm">
                  <div className="border-b-2 border-brand-gold pb-4 flex justify-between items-center">
                    <h3 className="text-3xl font-bold text-brand-blue font-serif">{album.title}</h3>
                    <span className="text-xs font-black uppercase tracking-widest text-brand-red">{album.images.length} Photos</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {album.images.map(img => (
                      <div key={img.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200 space-y-3 group">
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-gray-100">
                          <img src={img.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={img.caption || "Gallery"} />
                        </div>
                        {img.caption && <p className="text-xs font-bold text-slate-700 px-2 text-center pb-1 font-serif">{img.caption}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-slate-400 font-semibold italic">
                No photo albums uploaded yet.
              </div>
            )}
          </section>
        )}

        {/* ACTIVITIES SECTION */}
        {tab === "activities" && (
          <section className="py-20 md:py-28 bg-white max-w-7xl mx-auto px-6 space-y-20 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Beyond Academics</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">Activities & Campus Life</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            {data.activities && data.activities.length > 0 && (
              <div className="space-y-10">
                <h3 className="text-3xl font-bold text-brand-blue font-serif border-l-6 border-l-brand-red pl-4">Co-curricular Excellence</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {data.activities.map(a => (
                    <div key={a.id} className="p-8 bg-gray-50 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:shadow-md transition-shadow">
                      {a.image ? (
                        <img src={a.image} className="w-24 h-24 rounded-2xl object-cover shrink-0 shadow border border-white" alt={a.name} />
                      ) : (
                        <div className="w-24 h-24 rounded-2xl bg-brand-blue text-brand-gold flex items-center justify-center font-bold text-3xl shadow shrink-0 font-serif">
                          {a.name.charAt(0)}
                        </div>
                      )}
                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <h4 className="text-2xl font-bold text-brand-blue font-serif">{a.name}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{a.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.upcomingEvents && data.upcomingEvents.length > 0 && (
              <div className="p-10 bg-brand-blue text-white rounded-3xl space-y-10 border-4 border-brand-gold shadow-xl">
                <div className="flex items-center gap-3 border-b border-white/20 pb-4">
                  <Clock className="w-8 h-8 text-brand-gold" />
                  <h3 className="text-3xl font-bold font-serif text-white">Upcoming Institutional Events</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {data.upcomingEvents.map(ev => (
                    <div key={ev.id} className="p-8 bg-white/10 rounded-2xl border border-white/15 backdrop-blur flex gap-6 items-center shadow-sm">
                      <div className="shrink-0 text-center p-4 bg-brand-gold text-brand-blue rounded-xl min-w-[72px] shadow-inner border border-white/40">
                        <p className="text-[10px] font-black uppercase tracking-wider">{ev.date?.slice(5, 7)}/{ev.date?.slice(0, 4)}</p>
                        <p className="text-3xl font-black font-serif leading-tight">{ev.date?.slice(8, 10)}</p>
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-bold text-xl text-white font-serif">{ev.title}</h4>
                        <p className="text-xs text-slate-200 leading-relaxed font-normal">{ev.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CUSTOM PAGES */}
        {tab.startsWith("page-") && (() => {
          const page = data.customPages?.find(p => p.id === tab.replace("page-", ""));
          return page ? (
            <section className="py-20 md:py-28 bg-white max-w-4xl mx-auto px-6 space-y-12 animate-in fade-in duration-500">
              <div className="space-y-4 border-b-4 border-brand-gold pb-8">
                <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">Institutional Portal</span>
                <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">{page.title}</h2>
              </div>
              <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, "<br/>") }} />
            </section>
          ) : null;
        })()}

        {/* CBSE MANDATORY PUBLIC DISCLOSURE SECTION */}
        {tab === "disclosure" && (
          <section className="py-20 md:py-28 bg-white max-w-6xl mx-auto px-6 space-y-16 animate-in fade-in duration-500">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-xs font-black text-brand-red uppercase tracking-[0.4em] block">CBSE Statutory Compliance</span>
              <h2 className="text-4xl md:text-6xl font-bold text-brand-blue font-serif">Mandatory Public Disclosure</h2>
              <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full" />
            </div>

            <div className="space-y-12">
              {(data.disclosureData || []).map((t, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden border-t-8 border-t-brand-blue">
                  <div className="bg-brand-blue px-8 py-5 text-white flex justify-between items-center border-b border-brand-gold">
                    <h3 className="text-xl font-bold font-serif">{t.title}</h3>
                    <span className="text-xs text-brand-gold font-black uppercase tracking-widest">Section {idx + 1}</span>
                  </div>
                  <div className="p-8 overflow-x-auto bg-white">
                    <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b-2 border-gray-300 text-brand-blue font-black text-xs uppercase tracking-wider bg-gray-50">
                          <th className="py-4 px-6 w-3/5">Information / Prescribed Document</th>
                          <th className="py-4 px-6 w-2/5">Status & Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {t.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-brand-gold/5 transition-colors font-medium">
                            <td className="py-4 px-6 font-bold text-slate-900 border-r border-gray-100">{r.field}</td>
                            <td className="py-4 px-6 text-slate-700">
                              {r.link && r.link !== "#" && r.link !== "" ? (
                                <a
                                  href={r.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-red text-white text-xs font-black uppercase tracking-wider rounded shadow hover:bg-brand-blue transition-all"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-brand-gold" />
                                  <span>{r.detail || "View Official Record"}</span>
                                </a>
                              ) : (
                                <span className="font-semibold text-slate-800 leading-relaxed font-serif text-base">{r.detail || "Available on Campus"}</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* FOOTER (Premium Minimal Institutional Style) */}
      <footer className="bg-[#09111f] text-white pt-20 pb-12 border-t border-white/10 font-sans">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {data.footerLogo ? (
                <img src={data.footerLogo} className="h-14 object-contain" alt="Logo" />
              ) : (
                <span className="text-2xl font-bold font-serif text-brand-gold tracking-tight">{data.schoolName}</span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-normal leading-relaxed font-sans">
              {data.footerAboutText || `Empowering generations through academic rigor and value-based education. ${data.schoolName} is dedicated to building robust national character.`}
            </p>
            <div className="flex gap-3 pt-2">
              <a href={data.facebookLink || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow" title="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={data.instagramLink || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow" title="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href={data.youtubeLink || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow" title="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href={data.twitterLink || "#"} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-brand-red hover:text-white hover:border-brand-red transition-all shadow" title="Twitter / X">
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold font-sans">Institutional Links</h4>
            <div className="flex flex-col gap-2.5 text-xs font-medium text-slate-400 font-sans">
              {navLinks.map(l => (
                <button key={l.tab} onClick={() => go(l.tab)} className="text-left hover:text-white transition-colors inline-flex items-center gap-2 py-0.5">
                  <span className="text-brand-red text-[10px]">■</span> {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5 font-sans">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold font-sans">Contact Administration</h4>
            <div className="space-y-3 text-xs text-slate-400 leading-relaxed font-normal">
              <p className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>{data.address}, {data.city} - {data.pincode}</span>
              </p>
              <p className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <span>{data.phone}{data.phone2 && `, ${data.phone2}`}</span>
              </p>
              <p className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <span>{data.email}</span>
              </p>
              {data.whatsapp && (
                <p className="flex gap-3 items-center">
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-black text-[9px] uppercase tracking-wider">WhatsApp</span>
                  <span className="font-semibold text-slate-300">{data.whatsapp}</span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-5 font-sans">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold font-sans">Session & Admissions</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              {data.campusTimings?.map((t, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="font-normal text-slate-400">{t.day}</span>
                  <span className="text-brand-gold font-bold">{t.time}</span>
                </div>
              ))}
            </div>
            {data.admissionsOpen && (
              <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                  <p className="text-brand-gold text-[11px] font-black uppercase tracking-widest font-sans">Admissions Open</p>
                </div>
                <p className="text-slate-300 text-xs mt-1.5 font-normal leading-snug">{data.admissionsText || "Enrollments open for Academic Year 2026-27"}</p>
              </div>
            )}
          </div>
        </div>

        {data.googleMapLink && (
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <div className="rounded-2xl overflow-hidden h-64 relative border border-white/10 shadow-2xl bg-slate-900/50">
              <iframe src={data.googleMapLink} className="absolute inset-0 w-full h-full border-0" allowFullScreen loading="lazy" />
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider gap-4 text-center md:text-left font-sans">
          <p>© {new Date().getFullYear()} {data.schoolName}. All Rights Reserved.</p>
          <p className="text-slate-400">CBSE Affiliation No: <span className="text-brand-gold font-black">{data.affiliationNumber}</span> | School Code: <span className="text-brand-gold font-black">{data.schoolCode}</span></p>
        </div>
      </footer>
      <style jsx>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.animate-marquee{animation:marquee 30s linear infinite}`}</style>
    </div>
  );
}
