import { SchoolData } from "@/lib/data";
import { Loader2, Upload, Info } from "lucide-react";

type Props = { data: SchoolData; setData: (d: SchoolData) => void; upload: (e: any, cb: (url: string) => void) => void; uploading: string | null; };

export const F = ({ label, value, onChange, multi = false, placeholder = "" }: any) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-gray-500">{label}</label>
    {multi
      ? <textarea className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400 h-24 resize-none transition-colors" value={value ?? ""} onChange={onChange} placeholder={placeholder} />
      : <input className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400 transition-colors" value={value ?? ""} onChange={onChange} placeholder={placeholder} />}
  </div>
);

export const UploadBox = ({ src, name, uploading, onUpload, dark = false, label = "" }: any) => (
  <div className="space-y-1.5">
    {label && <p className="text-xs font-medium text-gray-500">{label}</p>}
    <div className={`relative rounded-md overflow-hidden border border-gray-200 group ${dark ? "bg-gray-800" : "bg-gray-50"}`} style={{ aspectRatio: "3/1" }}>
      <img src={src} className="w-full h-full object-contain p-2" />
      <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-medium gap-1.5 transition-opacity">
        {uploading === name ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
        {uploading === name ? "Uploading..." : "Change Image"}
        <input name={name} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={onUpload} />
      </label>
    </div>
  </div>
);

// Reusable guidelines info box
export const ImageGuidelines = ({ items }: { items: { type: string; size: string; resolution: string; format: string }[] }) => (
  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 space-y-3">
    <div className="flex items-center gap-2 text-blue-700">
      <Info className="w-3.5 h-3.5 shrink-0" />
      <p className="text-xs font-semibold">Image Upload Guidelines</p>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] text-blue-900">
        <thead>
          <tr className="border-b border-blue-200">
            <th className="text-left py-1.5 pr-4 font-semibold text-blue-600">Image Type</th>
            <th className="text-left py-1.5 pr-4 font-semibold text-blue-600">Max File Size</th>
            <th className="text-left py-1.5 pr-4 font-semibold text-blue-600">Recommended Size</th>
            <th className="text-left py-1.5 font-semibold text-blue-600">Format</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-blue-100">
          {items.map((item, i) => (
            <tr key={i}>
              <td className="py-1.5 pr-4 font-medium">{item.type}</td>
              <td className="py-1.5 pr-4">{item.size}</td>
              <td className="py-1.5 pr-4">{item.resolution}</td>
              <td className="py-1.5">{item.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-[10px] text-blue-600">
      Tip: Please compress images before uploading to keep the website fast. Max file size limits are enforced automatically.
    </p>
  </div>
);

export function SectionIdentity({ data, setData, upload, uploading }: Props) {
  const u = (key: keyof SchoolData) => (e: any) => setData({ ...data, [key]: e.target.value });
  return (
    <div className="space-y-5">
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">Basic Information</h3>
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

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">Theme Colors</h3>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">Primary Color (Header / Footer background)</label>
            <div className="flex gap-3 items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <input type="color" value={data.primaryColor} onChange={u("primaryColor")} className="w-9 h-9 rounded cursor-pointer border border-gray-200" />
              <span className="text-sm font-mono text-gray-700">{data.primaryColor}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">Accent Color (Buttons, highlights)</label>
            <div className="flex gap-3 items-center p-3 bg-gray-50 border border-gray-200 rounded-md">
              <input type="color" value={data.accentColor} onChange={u("accentColor")} className="w-9 h-9 rounded cursor-pointer border border-gray-200" />
              <span className="text-sm font-mono text-gray-700">{data.accentColor}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">Logos</h3>
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
