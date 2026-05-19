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

export function SectionAcademics({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <Card title="Academic Sections">
        <p className="text-xs text-gray-400">Add sections like Pre-Primary, Primary, Middle School, Senior Secondary.</p>
        {(data.academicSections || []).map((s, i) => (
          <div key={s.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 space-y-3">
            <div className="grid grid-cols-3 gap-4 items-start">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-gray-500">Image</p>
                <div className="relative aspect-video bg-gray-200 rounded-md overflow-hidden group border border-gray-200">
                  <img src={s.image || "https://placehold.co/400x250"} className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] gap-1 transition-opacity">
                    {uploading === `sec-${i}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                    <input name={`sec-${i}`} type="file" className="hidden" accept="image/*" onChange={e => upload(e, url => { const n = [...data.academicSections]; n[i].image = url; setData({ ...data, academicSections: n }); })} />
                  </label>
                </div>
              </div>
              <div className="col-span-2 space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="flex-1"><F label="Section Name" value={s.title} onChange={(e: any) => { const n = [...data.academicSections]; n[i].title = e.target.value; setData({ ...data, academicSections: n }); }} /></div>
                  <button onClick={() => setData({ ...data, academicSections: data.academicSections.filter(x => x.id !== s.id) })} className="text-red-400 hover:text-red-500 p-1 mt-6"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <F label="Description" value={s.description} onChange={(e: any) => { const n = [...data.academicSections]; n[i].description = e.target.value; setData({ ...data, academicSections: n }); }} multi />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setData({ ...data, academicSections: [...(data.academicSections || []), { id: Date.now().toString(), title: "New Section", description: "", image: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Section
        </button>
      </Card>

      <Card title="Subjects Offered (by grade)">
        {(data.subjects || []).map((sub, i) => (
          <div key={sub.id} className="flex gap-3 items-end">
            <div className="w-1/3"><F label="Grade / Class" value={sub.grade} onChange={(e: any) => { const n = [...data.subjects]; n[i].grade = e.target.value; setData({ ...data, subjects: n }); }} placeholder="e.g. Class XI Science" /></div>
            <div className="flex-1"><F label="Subjects (comma separated)" value={sub.list} onChange={(e: any) => { const n = [...data.subjects]; n[i].list = e.target.value; setData({ ...data, subjects: n }); }} /></div>
            <button onClick={() => setData({ ...data, subjects: data.subjects.filter(x => x.id !== sub.id) })} className="text-red-400 hover:text-red-500 p-1 mb-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button onClick={() => setData({ ...data, subjects: [...(data.subjects || []), { id: Date.now().toString(), grade: "", list: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Grade
        </button>
      </Card>
    </div>
  );
}

export function SectionFaculty({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <ImageGuidelines items={[
        { type: "Staff / Teacher Photo", size: "500 KB max", resolution: "300 × 300 px (square)", format: "JPG / PNG" },
      ]} />
      <p className="text-sm text-gray-500">Add all teachers and staff. They will appear on the Staff page of your website.</p>
      {data.faculty.map((f, i) => (
        <div key={f.id} className="bg-white border border-gray-200 rounded-lg p-5 flex gap-5 relative">
          <div className="shrink-0">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden group border border-gray-200 bg-gray-100">
              <img src={f.image} className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] gap-1 transition-opacity">
                {uploading === `fac-${i}` ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <input name={`fac-${i}`} type="file" className="hidden" accept="image/*" onChange={e => upload(e, url => { const n = [...data.faculty]; n[i].image = url; setData({ ...data, faculty: n }); })} />
              </label>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <F label="Full Name" value={f.name} onChange={(e: any) => { const n = [...data.faculty]; n[i].name = e.target.value; setData({ ...data, faculty: n }); }} />
              <F label="Designation" value={f.designation} onChange={(e: any) => { const n = [...data.faculty]; n[i].designation = e.target.value; setData({ ...data, faculty: n }); }} placeholder="e.g. Senior Teacher" />
              <F label="Department / Subject" value={f.department} onChange={(e: any) => { const n = [...data.faculty]; n[i].department = e.target.value; setData({ ...data, faculty: n }); }} />
              <F label="Qualification" value={f.qualification} onChange={(e: any) => { const n = [...data.faculty]; n[i].qualification = e.target.value; setData({ ...data, faculty: n }); }} placeholder="e.g. M.Sc, B.Ed" />
              <F label="Experience" value={f.experience} onChange={(e: any) => { const n = [...data.faculty]; n[i].experience = e.target.value; setData({ ...data, faculty: n }); }} placeholder="e.g. 10 Years" />
            </div>
            <F label="Short Bio" value={f.bio} onChange={(e: any) => { const n = [...data.faculty]; n[i].bio = e.target.value; setData({ ...data, faculty: n }); }} multi />
          </div>
          <button onClick={() => setData({ ...data, faculty: data.faculty.filter(x => x.id !== f.id) })} className="absolute top-4 right-4 text-red-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={() => setData({ ...data, faculty: [...data.faculty, { id: Date.now().toString(), name: "", designation: "Teacher", department: "", image: "https://placehold.co/200x200/f1f5f9/94a3b8?text=Photo", qualification: "", experience: "", bio: "" }] })}
        className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-600 justify-center transition-colors">
        <Plus className="w-4 h-4" /> Add Staff Member
      </button>
    </div>
  );
}

export function SectionActivities({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <Card title="Co-curricular Activities">
        {(data.activities || []).map((act, i) => (
          <div key={act.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 flex gap-4 items-start">
            <div className="shrink-0">
              <div className="relative w-20 h-20 bg-gray-200 rounded-md overflow-hidden group border border-gray-200">
                <img src={act.image || "https://placehold.co/200x200"} className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] transition-opacity">
                  {uploading === `act-${i}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                  <input name={`act-${i}`} type="file" className="hidden" accept="image/*" onChange={e => upload(e, url => { const n = [...data.activities]; n[i].image = url; setData({ ...data, activities: n }); })} />
                </label>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <F label="Activity Name" value={act.name} onChange={(e: any) => { const n = [...data.activities]; n[i].name = e.target.value; setData({ ...data, activities: n }); }} />
              <F label="Description" value={act.description} onChange={(e: any) => { const n = [...data.activities]; n[i].description = e.target.value; setData({ ...data, activities: n }); }} multi />
            </div>
            <button onClick={() => setData({ ...data, activities: data.activities.filter(x => x.id !== act.id) })} className="text-red-400 hover:text-red-500 p-1 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button onClick={() => setData({ ...data, activities: [...(data.activities || []), { id: Date.now().toString(), name: "", description: "", image: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Activity
        </button>
      </Card>

      <Card title="Upcoming Events">
        {(data.upcomingEvents || []).map((ev, i) => (
          <div key={ev.id} className="p-3 bg-gray-50 rounded-md border border-gray-100 space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2"><F label="Event Name" value={ev.title} onChange={(e: any) => { const n = [...data.upcomingEvents]; n[i].title = e.target.value; setData({ ...data, upcomingEvents: n }); }} /></div>
              <div className="flex gap-2 items-end">
                <div className="flex-1"><F label="Date" value={ev.date} onChange={(e: any) => { const n = [...data.upcomingEvents]; n[i].date = e.target.value; setData({ ...data, upcomingEvents: n }); }} /></div>
                <button onClick={() => setData({ ...data, upcomingEvents: data.upcomingEvents.filter(x => x.id !== ev.id) })} className="text-red-400 hover:text-red-500 p-1 mb-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <F label="Description" value={ev.description} onChange={(e: any) => { const n = [...data.upcomingEvents]; n[i].description = e.target.value; setData({ ...data, upcomingEvents: n }); }} multi />
          </div>
        ))}
        <button onClick={() => setData({ ...data, upcomingEvents: [...(data.upcomingEvents || []), { id: Date.now().toString(), title: "", date: "", description: "", image: "" }] })}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50">
          <Plus className="w-3 h-3" /> Add Event
        </button>
      </Card>
    </div>
  );
}

export function SectionSettings({ data, setData }: Props) {
  const u = (key: keyof SchoolData) => (e: any) => setData({ ...data, [key]: e.target.value });
  return (
    <div className="space-y-5">
      <Card title="Contact Details">
        <div className="grid grid-cols-2 gap-5">
          <F label="Main Email" value={data.email} onChange={u("email")} />
          <F label="Secondary Email (optional)" value={data.email2} onChange={u("email2")} />
          <F label="Main Phone Number" value={data.phone} onChange={u("phone")} />
          <F label="Secondary Phone (optional)" value={data.phone2} onChange={u("phone2")} />
          <F label="WhatsApp Number" value={data.whatsapp} onChange={u("whatsapp")} />
          <div />
          <F label="City" value={data.city} onChange={u("city")} />
          <F label="State" value={data.state} onChange={u("state")} />
          <F label="Pincode" value={data.pincode} onChange={u("pincode")} />
        </div>
        <F label="Full Address" value={data.address} onChange={u("address")} multi />
        <F label="Google Maps Embed URL" value={data.googleMapLink} onChange={u("googleMapLink")} placeholder="Paste the src= value from Google Maps > Share > Embed a map" />
      </Card>

      <Card title="Social Media Links">
        <div className="grid grid-cols-2 gap-5">
          <F label="Facebook Page URL" value={data.facebookLink} onChange={u("facebookLink")} placeholder="https://facebook.com/yourschool" />
          <F label="Instagram Profile URL" value={data.instagramLink} onChange={u("instagramLink")} placeholder="https://instagram.com/yourschool" />
          <F label="YouTube Channel URL" value={data.youtubeLink} onChange={u("youtubeLink")} />
          <F label="Twitter / X URL" value={data.twitterLink} onChange={u("twitterLink")} />
        </div>
      </Card>

      <Card title="Official School Information">
        <div className="grid grid-cols-2 gap-5">
          <F label="Affiliation Board" value={data.affiliationBoard} onChange={u("affiliationBoard")} placeholder="e.g. CBSE / ICSE / State Board" />
          <F label="Affiliation Number" value={data.affiliationNumber} onChange={u("affiliationNumber")} />
          <F label="School Code" value={data.schoolCode} onChange={u("schoolCode")} />
          <F label="Mandatory Public Disclosure PDF Link" value={data.mandatoryDisclosureLink} onChange={u("mandatoryDisclosureLink")} placeholder="https://..." />
        </div>
      </Card>

      <Card title="Admissions">
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white rounded-lg">
          <div>
            <p className="font-semibold text-sm">{data.admissionsOpen ? "Admissions are currently OPEN" : "Admissions are currently CLOSED"}</p>
            <p className="text-xs text-gray-400 mt-0.5">Click to toggle the status on your website</p>
          </div>
          <button onClick={() => setData({ ...data, admissionsOpen: !data.admissionsOpen })}
            className={`px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${data.admissionsOpen ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"}`}>
            {data.admissionsOpen ? "Close Admissions" : "Open Admissions"}
          </button>
        </div>
        <F label="Admissions Notice (shown on website)" value={data.admissionsText} onChange={u("admissionsText")} placeholder="e.g. Admissions open for 2025-26. Limited seats available." />
      </Card>

      <Card title="Footer Text">
        <F label="Short description shown in website footer" value={data.footerAboutText} onChange={u("footerAboutText")} multi />
      </Card>
    </div>
  );
}
