import { SchoolData } from "@/lib/data";
import { Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { F, ImageGuidelines } from "./SectionIdentity";

type Props = { data: SchoolData; setData: (d: SchoolData) => void; upload: (e: any, cb: (url: string) => void) => void; uploading: string | null; };

const Card = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
    {title && <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3">{title}</h3>}
    {children}
  </div>
);

const SmallUpload = ({ src, name, uploading, onUpload, ratio = "aspect-video" }: any) => (
  <div className={`relative ${ratio} bg-gray-100 rounded-md overflow-hidden group border border-gray-200 shrink-0`}>
    <img src={src || "https://placehold.co/400x250/f1f5f9/94a3b8?text=No+Image"} className="w-full h-full object-cover" />
    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-medium gap-1 transition-opacity">
      {uploading === name ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
      {uploading === name ? "Uploading..." : "Upload"}
      <input name={name} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={onUpload} />
    </label>
  </div>
);

export function SectionContent({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <Card title="About Us">
        <F label="About Us Text" value={data.aboutUsText} onChange={(e: any) => setData({ ...data, aboutUsText: e.target.value })} multi placeholder="Write about your school history, achievements, environment..." />
        <div className="grid grid-cols-2 gap-5">
          <F label="Vision" value={data.visionText} onChange={(e: any) => setData({ ...data, visionText: e.target.value })} multi />
          <F label="Mission" value={data.missionText} onChange={(e: any) => setData({ ...data, missionText: e.target.value })} multi />
        </div>
      </Card>

      <Card title="Key Highlights (shown on home page as stats)">
        {(data.highlights || []).map((h, i) => (
          <div key={h.id} className="flex gap-3 items-center p-3 bg-gray-50 rounded-md border border-gray-100">
            <input className="w-8 text-xl bg-transparent outline-none text-center" value={h.icon} onChange={e => { const n = [...data.highlights]; n[i].icon = e.target.value; setData({ ...data, highlights: n }); }} />
            <input className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm font-semibold outline-none" value={h.value} placeholder="e.g. 2500+" onChange={e => { const n = [...data.highlights]; n[i].value = e.target.value; setData({ ...data, highlights: n }); }} />
            <input className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm outline-none" value={h.label} placeholder="e.g. Students Enrolled" onChange={e => { const n = [...data.highlights]; n[i].label = e.target.value; setData({ ...data, highlights: n }); }} />
            <button onClick={() => setData({ ...data, highlights: data.highlights.filter(x => x.id !== h.id) })} className="text-red-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button onClick={() => setData({ ...data, highlights: [...(data.highlights || []), { id: Date.now().toString(), label: "New Stat", value: "0+", icon: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Stat
        </button>
      </Card>

      <Card title="Notice Board">
        <p className="text-xs text-gray-400">These notices scroll at the bottom of every page on the website.</p>
        {(data.notices || []).map((n, i) => (
          <div key={n.id} className="flex gap-2 items-center">
            <input type="date" className="px-3 py-2 bg-white border border-gray-200 rounded-md text-xs outline-none" value={n.date} onChange={e => { const arr = [...data.notices]; arr[i].date = e.target.value; setData({ ...data, notices: arr }); }} />
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-xs outline-none" value={n.type} onChange={e => { const arr = [...data.notices]; arr[i].type = e.target.value as any; setData({ ...data, notices: arr }); }}>
              <option value="general">General</option><option value="exam">Exam</option><option value="holiday">Holiday</option><option value="event">Event</option><option value="urgent">Urgent</option>
            </select>
            <input className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm outline-none" value={n.text} placeholder="Notice text..." onChange={e => { const arr = [...data.notices]; arr[i].text = e.target.value; setData({ ...data, notices: arr }); }} />
            <button onClick={() => setData({ ...data, notices: data.notices.filter(x => x.id !== n.id) })} className="text-red-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button onClick={() => setData({ ...data, notices: [...(data.notices || []), { id: Date.now().toString(), text: "", date: new Date().toISOString().slice(0, 10), type: "general" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Notice
        </button>
      </Card>

      <Card title="Achievements">
        <ImageGuidelines items={[
          { type: "Achievement Image", size: "1 MB max", resolution: "800 × 500 px", format: "JPG / PNG" },
        ]} />
        {(data.achievements || []).map((a, i) => (
          <div key={a.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 space-y-3">
            <div className="flex gap-4">
              <SmallUpload
                src={a.image}
                name={`ach-${i}`}
                uploading={uploading}
                onUpload={(e: any) => upload(e, (url: string) => { const n = [...data.achievements!]; n[i].image = url; setData({ ...data, achievements: n }); })}
                ratio="aspect-video w-32"
              />
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-4 gap-3 items-end">
                  <div className="col-span-3"><F label="Award / Achievement" value={a.title} onChange={(e: any) => { const n = [...data.achievements!]; n[i].title = e.target.value; setData({ ...data, achievements: n }); }} /></div>
                  <F label="Year" value={a.year} onChange={(e: any) => { const n = [...data.achievements!]; n[i].year = e.target.value; setData({ ...data, achievements: n }); }} />
                </div>
                <F label="Brief Description" value={a.description} onChange={(e: any) => { const n = [...data.achievements!]; n[i].description = e.target.value; setData({ ...data, achievements: n }); }} />
              </div>
              <button onClick={() => setData({ ...data, achievements: data.achievements!.filter(x => x.id !== a.id) })} className="text-red-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        <button onClick={() => setData({ ...data, achievements: [...(data.achievements || []), { id: Date.now().toString(), title: "", year: new Date().getFullYear().toString(), description: "", image: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Achievement
        </button>
      </Card>

      <Card title="Parent & Alumni Testimonials">
        <ImageGuidelines items={[
          { type: "Person Photo (optional)", size: "500 KB max", resolution: "200 × 200 px (square)", format: "JPG / PNG" },
        ]} />
        {(data.testimonials || []).map((t, i) => (
          <div key={t.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 space-y-3">
            <div className="flex gap-4 items-start">
              <div className="space-y-1 shrink-0">
                <p className="text-[10px] font-medium text-gray-400">Photo</p>
                <SmallUpload
                  src={t.photo}
                  name={`test-${i}`}
                  uploading={uploading}
                  onUpload={(e: any) => upload(e, (url: string) => { const n = [...data.testimonials!]; n[i].photo = url; setData({ ...data, testimonials: n }); })}
                  ratio="w-16 h-16"
                />
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <F label="Person's Name" value={t.name} onChange={(e: any) => { const n = [...data.testimonials!]; n[i].name = e.target.value; setData({ ...data, testimonials: n }); }} />
                  <F label="Role (e.g. Parent of Rahul, Class X)" value={t.role} onChange={(e: any) => { const n = [...data.testimonials!]; n[i].role = e.target.value; setData({ ...data, testimonials: n }); }} />
                </div>
                <F label="Their Review" value={t.message} onChange={(e: any) => { const n = [...data.testimonials!]; n[i].message = e.target.value; setData({ ...data, testimonials: n }); }} multi />
              </div>
              <button onClick={() => setData({ ...data, testimonials: data.testimonials!.filter(x => x.id !== t.id) })} className="text-red-400 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        <button onClick={() => setData({ ...data, testimonials: [...(data.testimonials || []), { id: Date.now().toString(), name: "", role: "", message: "", photo: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Testimonial
        </button>
      </Card>
    </div>
  );
}

export function SectionLeadership({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <ImageGuidelines items={[
        { type: "Principal / Chairperson Photo", size: "500 KB max", resolution: "400 × 400 px (square)", format: "JPG / PNG" },
      ]} />
      <Card title="Principal">
        <div className="grid grid-cols-3 gap-5 items-start">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Photo</p>
            <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group border border-gray-200">
              <img src={data.principalPhoto} className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-medium gap-1 transition-opacity">
                {uploading === "principalPhoto" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />} Upload
                <input name="principalPhoto" type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={e => upload(e, url => setData({ ...data, principalPhoto: url }))} />
              </label>
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            <F label="Principal Name" value={data.principalName} onChange={(e: any) => setData({ ...data, principalName: e.target.value })} />
            <F label="Qualifications" value={data.principalQualification} onChange={(e: any) => setData({ ...data, principalQualification: e.target.value })} placeholder="e.g. M.A., M.Ed., Ph.D" />
            <F label="Message from Principal" value={data.principalMessage} onChange={(e: any) => setData({ ...data, principalMessage: e.target.value })} multi />
          </div>
        </div>
      </Card>

      <Card title="Chairperson / Director / Secretary">
        <div className="grid grid-cols-3 gap-5 items-start">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Photo</p>
            <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group border border-gray-200">
              <img src={data.chairpersonPhoto} className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-medium gap-1 transition-opacity">
                {uploading === "chairpersonPhoto" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />} Upload
                <input name="chairpersonPhoto" type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={e => upload(e, url => setData({ ...data, chairpersonPhoto: url }))} />
              </label>
            </div>
          </div>
          <div className="col-span-2 space-y-4">
            <F label="Name" value={data.chairpersonName} onChange={(e: any) => setData({ ...data, chairpersonName: e.target.value })} />
            <F label="Message" value={data.chairpersonMessage} onChange={(e: any) => setData({ ...data, chairpersonMessage: e.target.value })} multi />
          </div>
        </div>
      </Card>
    </div>
  );
}
