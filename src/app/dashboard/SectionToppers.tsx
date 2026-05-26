import { Plus, Trash2, Upload, Loader2, Award } from "lucide-react";
import { SchoolData, Topper } from "@/lib/data";

interface Props {
  data: SchoolData;
  setData: (d: SchoolData) => void;
  upload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
  uploading: string | null;
}

export default function SectionToppers({ data, setData, upload, uploading }: Props) {
  const addTopper = (type: 'class10Toppers' | 'class12Toppers') => {
    const newTopper: Topper = {
      id: Date.now().toString(),
      name: "Student Name",
      percentage: "95",
      stream: "",
      photo: "https://placehold.co/150x200/e2e8f0/64748b?text=Photo"
    };
    setData({ ...data, [type]: [...(data[type] || []), newTopper] });
  };

  const removeTopper = (type: 'class10Toppers' | 'class12Toppers', id: string) => {
    setData({ ...data, [type]: data[type].filter((t: Topper) => t.id !== id) });
  };

  const updateTopper = (type: 'class10Toppers' | 'class12Toppers', id: string, field: keyof Topper, value: string) => {
    setData({
      ...data,
      [type]: data[type].map((t: Topper) => t.id === id ? { ...t, [field]: value } : t)
    });
  };

  const renderTopperList = (title: string, type: 'class10Toppers' | 'class12Toppers', showStream: boolean) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold text-slate-800 font-sans tracking-tight">{title}</h3>
        <button
          onClick={() => addTopper(type)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-md hover:bg-slate-200 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-[#1e3a8a]" />
          Add Topper
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data[type]?.map((topper: Topper) => (
          <div key={topper.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm group flex gap-4">
            {/* Passport Photo Upload Box */}
            <div className="flex flex-col gap-2 shrink-0 w-[90px]">
              <div className="relative w-full aspect-[3/4] bg-gray-50 rounded border border-gray-200 overflow-hidden shrink-0">
                <img src={topper.photo} alt={topper.name} className="w-full h-full object-cover" />
                <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  {uploading === `topper-${topper.id}` ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Upload className="w-4 h-4 text-white" />}
                  <input type="file" name={`topper-${topper.id}`} className="hidden" accept="image/*" onChange={(e) => upload(e, url => updateTopper(type, topper.id, "photo", url))} />
                </label>
              </div>
              <p className="text-[9px] leading-tight text-center text-gray-400">Passport Size<br/>Max 200KB</p>
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <input
                  type="text"
                  value={topper.name}
                  onChange={(e) => updateTopper(type, topper.id, "name", e.target.value)}
                  className="w-full text-sm font-bold text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-gray-400 outline-none px-1 py-0.5 transition-colors"
                  placeholder="Student Name"
                />
                <button
                  onClick={() => removeTopper(type, topper.id)}
                  className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors ml-2 shrink-0"
                  title="Remove Topper"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3 px-1">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <div className="relative flex items-center">
                  <input
                    type="number"
                    max="100"
                    min="0"
                    step="0.1"
                    value={topper.percentage}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (Number(val) > 100) val = "100";
                      updateTopper(type, topper.id, "percentage", val);
                    }}
                    className="w-14 text-sm font-bold text-gray-900 border-b border-gray-200 hover:border-gray-300 focus:border-gray-400 outline-none px-1 py-0.5"
                  />
                  <span className="text-sm font-bold text-gray-500 ml-1">%</span>
                </div>
              </div>

              {showStream && (
                <div className="px-1 mt-auto">
                  <input
                    type="text"
                    value={topper.stream || ""}
                    onChange={(e) => updateTopper(type, topper.id, "stream", e.target.value)}
                    className="w-full text-xs text-gray-600 border-b border-gray-200 hover:border-gray-300 focus:border-gray-400 outline-none px-1 py-0.5"
                    placeholder="Stream (e.g. Science, Commerce)"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
        {(!data[type] || data[type].length === 0) && (
          <div className="col-span-full py-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-lg">
            <Award className="w-6 h-6 mb-2 opacity-20" />
            <p className="text-xs">No toppers added yet</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-sm font-bold text-slate-800 font-sans tracking-tight">Academic Toppers</h2>
        <p className="text-xs text-slate-500 mt-0.5">Showcase your highest achieving students in board exams.</p>
      </div>

      {renderTopperList("Class 12 Board Toppers", "class12Toppers", true)}
      {renderTopperList("Class 10 Board Toppers", "class10Toppers", false)}
    </div>
  );
}
