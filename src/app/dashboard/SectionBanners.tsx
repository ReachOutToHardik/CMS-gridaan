import { SchoolData } from "@/lib/data";
import { Loader2, Upload, Plus, Trash2 } from "lucide-react";
import { F, ImageGuidelines } from "./SectionIdentity";

type Props = { data: SchoolData; setData: (d: SchoolData) => void; upload: (e: any, cb: (url: string) => void) => void; uploading: string | null; };

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">{children}</div>
);

const ImgUpload = ({ src, name, uploading, onUpload, ratio = "aspect-[21/7]" }: any) => (
  <div className={`relative ${ratio} bg-gray-100 rounded-md overflow-hidden group border border-gray-200`}>
    <img src={src} className="w-full h-full object-cover" />
    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-medium gap-1.5 transition-opacity">
      {uploading === name ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
      {uploading === name ? "Uploading..." : "Change Image"}
      <input name={name} type="file" className="hidden" accept="image/*" onChange={onUpload} />
    </label>
  </div>
);

const SectionHeader = ({ title, onAdd, addLabel }: { title: string; onAdd?: () => void; addLabel?: string }) => (
  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
    {onAdd && <button onClick={onAdd} className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 px-2.5 py-1 rounded hover:bg-gray-50 transition-all"><Plus className="w-3 h-3" />{addLabel || "Add"}</button>}
  </div>
);

export function SectionBanners({ data, setData, upload, uploading }: Props) {
  const add = () => setData({ ...data, banners: [...data.banners, { id: Date.now().toString(), image: "https://placehold.co/1920x600/1e3a5f/white?text=Banner", title: "Welcome to " + data.schoolName, subtitle: "", buttonText: "Know More", buttonLink: "about" }] });
  return (
    <div className="space-y-5">
      <ImageGuidelines items={[
        { type: "Home Banner / Slider", size: "2 MB max", resolution: "1920 × 600 px", format: "JPG / WEBP" },
      ]} />
      <p className="text-sm text-gray-500">These are the large sliding images shown at the top of your home page.</p>
      {data.banners.map((b, i) => (
        <Card key={b.id}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500">Banner {i + 1}</p>
            <button onClick={() => setData({ ...data, banners: data.banners.filter(x => x.id !== b.id) })} className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1"><Trash2 className="w-3 h-3" /> Remove</button>
          </div>
          <ImgUpload src={b.image} name={`b-${i}`} uploading={uploading} onUpload={(e: any) => upload(e, (url: string) => { const n = [...data.banners]; n[i].image = url; setData({ ...data, banners: n }); })} />
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><F label="Main Heading" value={b.title} onChange={(e: any) => { const n = [...data.banners]; n[i].title = e.target.value; setData({ ...data, banners: n }); }} placeholder="e.g. Welcome to Modern Public School" /></div>
            <div className="col-span-2"><F label="Sub-heading (optional)" value={b.subtitle} onChange={(e: any) => { const n = [...data.banners]; n[i].subtitle = e.target.value; setData({ ...data, banners: n }); }} /></div>
            <F label="Button Text" value={b.buttonText} onChange={(e: any) => { const n = [...data.banners]; n[i].buttonText = e.target.value; setData({ ...data, banners: n }); }} placeholder="e.g. Know More" />
            <F label="Button Goes To" value={b.buttonLink} onChange={(e: any) => { const n = [...data.banners]; n[i].buttonLink = e.target.value; setData({ ...data, banners: n }); }} placeholder="e.g. about / gallery" />
          </div>
        </Card>
      ))}
      <button onClick={add} className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-600 justify-center transition-colors">
        <Plus className="w-4 h-4" /> Add New Banner
      </button>
    </div>
  );
}

export function SectionPages({ data, setData, upload, uploading }: Props) {
  const add = () => setData({ ...data, customPages: [...(data.customPages || []), { id: Date.now().toString(), title: "New Page", content: "", showInMenu: true, menuGroup: "Other", image: "" }] });
  return (
    <div className="space-y-5">
      <ImageGuidelines items={[
        { type: "Page Cover Image", size: "1 MB max", resolution: "1200 × 500 px", format: "JPG / WEBP" },
      ]} />
      <p className="text-sm text-gray-500">Create pages like "Rules & Regulations" or "Admission Form". Toggle the checkbox to show them in the website menu.</p>
      {(data.customPages || []).map((p, i) => (
        <Card key={p.id}>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={p.showInMenu} onChange={e => { const n = [...data.customPages!]; n[i].showInMenu = e.target.checked; setData({ ...data, customPages: n }); }} className="w-4 h-4 rounded" />
              <span className="text-xs font-medium text-gray-600">Show in top menu</span>
            </label>
            <button onClick={() => setData({ ...data, customPages: data.customPages!.filter(x => x.id !== p.id) })} className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
          </div>
          {/* Cover Image */}
          <div className="relative aspect-[21/6] bg-gray-100 rounded-md overflow-hidden group border border-gray-200">
            <img src={p.image || "https://placehold.co/1200x400/f1f5f9/94a3b8?text=No+Cover+Image"} className="w-full h-full object-cover" />
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-xs font-medium gap-1.5 transition-opacity">
              {uploading === `pg-${i}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading === `pg-${i}` ? "Uploading..." : "Upload Cover Image"}
              <input name={`pg-${i}`} type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={e => upload(e, url => { const n = [...data.customPages!]; n[i].image = url; setData({ ...data, customPages: n }); })} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Page Title" value={p.title} onChange={(e: any) => { const n = [...data.customPages!]; n[i].title = e.target.value; setData({ ...data, customPages: n }); }} placeholder="e.g. Rules & Regulations" />
            <F label="Menu Group" value={p.menuGroup} onChange={(e: any) => { const n = [...data.customPages!]; n[i].menuGroup = e.target.value; setData({ ...data, customPages: n }); }} placeholder="e.g. About Us, Academics" />
          </div>
          <F label="Page Content" value={p.content} onChange={(e: any) => { const n = [...data.customPages!]; n[i].content = e.target.value; setData({ ...data, customPages: n }); }} multi placeholder="Write the content for this page..." />
        </Card>
      ))}
      <button onClick={add} className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-600 justify-center transition-colors">
        <Plus className="w-4 h-4" /> Create New Page
      </button>
    </div>
  );
}

export function SectionGallery({ data, setData, upload, uploading }: Props) {
  return (
    <div className="space-y-5">
      <ImageGuidelines items={[
        { type: "Gallery / Album Photo", size: "2 MB max", resolution: "1200 × 900 px recommended", format: "JPG / WEBP" },
      ]} />
      <p className="text-sm text-gray-500">Create separate albums for different occasions — Sports Day, Annual Function, Campus Photos, etc.</p>
      {(data.photoAlbums || []).map((album, ai) => (
        <Card key={album.id}>
          <div className="flex items-center justify-between">
            <input className="text-sm font-semibold bg-transparent outline-none border-b border-gray-200 pb-0.5 w-1/2 focus:border-gray-400" value={album.title}
              onChange={e => { const n = [...data.photoAlbums]; n[ai].title = e.target.value; setData({ ...data, photoAlbums: n }); }} />
            <div className="flex gap-3">
              <button onClick={() => { const n = [...data.photoAlbums]; n[ai].images.push({ id: Date.now().toString(), url: "https://placehold.co/600x400", caption: "" }); setData({ ...data, photoAlbums: n }); }} className="flex items-center gap-1 text-xs font-medium text-gray-600 border border-gray-200 px-2.5 py-1 rounded hover:bg-gray-50"><Plus className="w-3 h-3" />Add Photo</button>
              <button onClick={() => setData({ ...data, photoAlbums: data.photoAlbums.filter(x => x.id !== album.id) })} className="text-red-400 hover:text-red-600 text-xs flex items-center gap-1"><Trash2 className="w-3 h-3" />Delete Album</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {album.images.map((img, ii) => (
              <div key={img.id} className="space-y-1.5">
                <div className="relative aspect-video bg-gray-100 rounded-md overflow-hidden group border border-gray-200">
                  <img src={img.url} className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer text-white text-[10px] font-medium gap-1 transition-opacity">
                    {uploading === `img-${ai}-${ii}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                    <input name={`img-${ai}-${ii}`} type="file" className="hidden" accept="image/*" onChange={e => upload(e, url => { const n = [...data.photoAlbums]; n[ai].images[ii].url = url; setData({ ...data, photoAlbums: n }); })} />
                  </label>
                </div>
                <div className="flex gap-1">
                  <input className="flex-1 text-[11px] px-2 py-1 border border-gray-200 rounded bg-white outline-none" value={img.caption} placeholder="Caption"
                    onChange={e => { const n = [...data.photoAlbums]; n[ai].images[ii].caption = e.target.value; setData({ ...data, photoAlbums: n }); }} />
                  <button onClick={() => { const n = [...data.photoAlbums]; n[ai].images = n[ai].images.filter(x => x.id !== img.id); setData({ ...data, photoAlbums: n }); }} className="text-red-400 hover:text-red-500 p-1"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      <button onClick={() => setData({ ...data, photoAlbums: [...(data.photoAlbums || []), { id: Date.now().toString(), title: "New Album", images: [] }] })}
        className="flex items-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-400 hover:border-gray-300 hover:text-gray-600 justify-center transition-colors">
        <Plus className="w-4 h-4" /> Create New Album
      </button>
    </div>
  );
}
