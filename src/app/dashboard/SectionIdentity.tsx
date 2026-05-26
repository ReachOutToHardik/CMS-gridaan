import { SchoolData } from "@/lib/data";
import { Loader2, Upload, Info } from "lucide-react";

type Props = { data: SchoolData; setData: (d: SchoolData) => void; upload: (e: any, cb: (url: string) => void) => void; uploading: string | null; };

export const F = ({ label, value, onChange, multi = false, placeholder = "" }: any) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
    {multi
      ? <textarea className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] h-24 resize-none transition-all text-slate-800 placeholder-slate-400" value={value ?? ""} onChange={onChange} placeholder={placeholder} />
      : <input className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-all text-slate-800 placeholder-slate-400" value={value ?? ""} onChange={onChange} placeholder={placeholder} />}
  </div>
);

export const UploadBox = ({ src, name, uploading, onUpload, dark = false, label = "" }: any) => (
  <div className="space-y-1.5">
    {label && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>}
    <div className={`relative rounded-md overflow-hidden border border-slate-200 group ${dark ? "bg-slate-900" : "bg-slate-50"}`} style={{ aspectRatio: "3/1" }}>
      <img src={src} className="w-full h-full object-contain p-2" />
      <label className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-semibold gap-1.5 transition-all">
        {uploading === name ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Upload className="w-3.5 h-3.5" />}
        {uploading === name ? "Uploading..." : "Change Image"}
        <input name={name} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={onUpload} />
      </label>
    </div>
  </div>
);

// Reusable guidelines info box
export const ImageGuidelines = ({ items }: { items: { type: string; size: string; resolution: string; format: string }[] }) => (
  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 shadow-2xs">
    <div className="flex items-center gap-2 text-slate-800">
      <Info className="w-3.5 h-3.5 shrink-0 text-blue-500" />
      <p className="text-xs font-bold uppercase tracking-wider">Image Upload Guidelines</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] text-slate-600">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-1.5 pr-4 font-bold text-slate-400 uppercase tracking-wider">Image Type</th>
            <th className="text-left py-1.5 pr-4 font-bold text-slate-400 uppercase tracking-wider">Max File Size</th>
            <th className="text-left py-1.5 pr-4 font-bold text-slate-400 uppercase tracking-wider">Recommended Size</th>
            <th className="text-left py-1.5 font-bold text-slate-400 uppercase tracking-wider">Format</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="py-1.5 pr-4 font-semibold text-slate-700">{item.type}</td>
              <td className="py-1.5 pr-4 text-slate-600">{item.size}</td>
              <td className="py-1.5 pr-4 text-slate-600">{item.resolution}</td>
              <td className="py-1.5 text-slate-600">{item.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
      Tip: Please compress images before uploading to keep the website fast. Max file size limits are enforced automatically.
    </p>
  </div>
);

export function SectionIdentity({ data, setData, upload, uploading }: Props) {
  const u = (key: keyof SchoolData) => (e: any) => setData({ ...data, [key]: e.target.value });
  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-5 shadow-xs">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-l-2 border-l-[#0f766e] pl-2.5 leading-none">Basic Information</h3>
        <div className="grid grid-cols-2 gap-5">
          <F label="School Name" value={data.schoolName} onChange={u("schoolName")} placeholder="e.g. Modern Public School" />
          <F label="Short Name / Abbreviation" value={data.shortName} onChange={u("shortName")} placeholder="e.g. MPS" />
          <div className="col-span-2"><F label="Tagline / Motto" value={data.tagline} onChange={u("tagline")} placeholder="e.g. Excellence in Education Since 1995" /></div>
          <F label="Established Year" value={data.establishedYear} onChange={u("establishedYear")} placeholder="e.g. 1995" />
          <F label="School Type" value={data.schoolType} onChange={u("schoolType")} placeholder="e.g. Co-educational" />
          <F label="Classes Offered" value={data.classes} onChange={u("classes")} placeholder="e.g. Nursery to Class XII" />
          <F label="Medium of Instruction" value={data.medium} onChange={u("medium")} placeholder="e.g. English Medium" />
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-5 shadow-xs">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-l-2 border-l-[#0f766e] pl-2.5 leading-none">Theme Colors</h3>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Color (Header / Footer background)</label>
            <div className="flex gap-3 items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <input type="color" value={data.primaryColor} onChange={u("primaryColor")} className="w-9 h-9 rounded cursor-pointer border border-slate-200" />
              <span className="text-sm font-mono text-slate-700">{data.primaryColor}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Accent Color (Buttons, highlights)</label>
            <div className="flex gap-3 items-center p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <input type="color" value={data.accentColor} onChange={u("accentColor")} className="w-9 h-9 rounded cursor-pointer border border-slate-200" />
              <span className="text-sm font-mono text-slate-700">{data.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-xl p-6 space-y-5 shadow-xs">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-l-2 border-l-[#0f766e] pl-2.5 leading-none">Logos</h3>
        <ImageGuidelines items={[
          { type: "Header Logo", size: "500 KB max", resolution: "400 × 120 px", format: "PNG (transparent bg)" },
          { type: "Footer Logo", size: "500 KB max", resolution: "400 × 120 px", format: "PNG (transparent bg)" },
        ]} />
        <div className="grid grid-cols-2 gap-5">
          <UploadBox label="Header Logo (shown in top menu)" src={data.headerLogo} name="headerLogo" uploading={uploading} onUpload={(e: any) => upload(e, (url: string) => setData({ ...data, headerLogo: url }))} />
          <UploadBox label="Footer Logo (shown in footer)" src={data.footerLogo} name="footerLogo" uploading={uploading} onUpload={(e: any) => upload(e, (url: string) => setData({ ...data, footerLogo: url }))} dark />
        </div>
      </div>
    </div>
  );
}
