import { SchoolData, DisclosureTable } from "@/lib/data";
import { Plus, Trash2, Link as LinkIcon, FileText, Upload, Loader2 } from "lucide-react";
import { F, ImageGuidelines } from "./SectionIdentity";

type Props = {
  data: SchoolData;
  setData: (d: SchoolData) => void;
  upload: (e: any, cb: (url: string) => void) => void;
  uploading: string | null;
};

export function SectionDisclosure({ data, setData, upload, uploading }: Props) {
  const tables = data.disclosureData || [];

  const updateTable = (index: number, newTable: DisclosureTable) => {
    const updated = [...tables];
    updated[index] = newTable;
    setData({ ...data, disclosureData: updated });
  };

  return (
    <div className="space-y-6">
      <ImageGuidelines items={[
        { type: "Compliance Document (NOC / Affiliation / Fees)", size: "5 MB max", resolution: "Standard A4 PDF or legible scan", format: "PDF / JPG / PNG" },
      ]} />

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-700" />
          Mandatory Public Disclosure Management
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Manage the public disclosures required by educational boards (e.g., CBSE / State Boards). For document sections (B & C), you can enter external URLs or directly upload files. General information and statistics sections only require plain text values.
        </p>
      </div>

      {tables.map((table, tIndex) => {
        // Only Table B (index 1) and Table C (index 2) have downloadable compliance documents
        const hasDocs = tIndex === 1 || tIndex === 2;

        return (
          <div key={tIndex} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <input
                type="text"
                value={table.title}
                onChange={(e) => {
                  const t = { ...table, title: e.target.value };
                  updateTable(tIndex, t);
                }}
                className="text-sm font-bold text-gray-900 bg-transparent outline-none focus:border-b focus:border-gray-400 pb-0.5 w-2/3"
              />
              <button
                onClick={() => {
                  const newRows = [...table.rows, { field: "New Field Name", detail: "Details or Value" }];
                  updateTable(tIndex, { ...table, rows: newRows });
                }}
                className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-200 px-2.5 py-1 rounded hover:bg-gray-50 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Row
              </button>
            </div>

            <div className="space-y-3 overflow-x-auto">
              <div className={`grid grid-cols-12 gap-3 px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider ${hasDocs ? "min-w-[650px]" : "min-w-[500px]"}`}>
                <div className={hasDocs ? "col-span-3" : "col-span-5"}>Information / Field</div>
                <div className={hasDocs ? "col-span-3" : "col-span-6"}>Details / Value</div>
                {hasDocs && <div className="col-span-5">URL Link & Direct File Upload</div>}
                <div className="col-span-1 text-right">Remove</div>
              </div>

              {table.rows.map((row, rIndex) => {
                const inputName = `doc-${tIndex}-${rIndex}`;
                const isUploadingThis = uploading === inputName;
                return (
                  <div key={rIndex} className={`grid grid-cols-12 gap-3 items-center bg-gray-50 p-3 rounded-md border border-gray-100 ${hasDocs ? "min-w-[650px]" : "min-w-[500px]"}`}>
                    <div className={hasDocs ? "col-span-3" : "col-span-5"}>
                      <input
                        type="text"
                        value={row.field}
                        onChange={(e) => {
                          const newRows = [...table.rows];
                          newRows[rIndex] = { ...row, field: e.target.value };
                          updateTable(tIndex, { ...table, rows: newRows });
                        }}
                        placeholder="e.g. Name of the school"
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-xs font-medium text-gray-800 outline-none focus:border-gray-400"
                      />
                    </div>
                    <div className={hasDocs ? "col-span-3" : "col-span-6"}>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={row.detail}
                          onChange={(e) => {
                            const newRows = [...table.rows];
                            newRows[rIndex] = { ...row, detail: e.target.value };
                            updateTable(tIndex, { ...table, rows: newRows });
                          }}
                          placeholder="e.g. Zenith Public School or View Document"
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-xs text-gray-800 outline-none focus:border-gray-400"
                        />
                        {/* Specifically for Table E (Infrastructure) row with YouTube link */}
                        {!hasDocs && row.link !== undefined && (
                          <div className="flex items-center gap-1.5 pt-1.5 border-t border-gray-200/60 mt-2">
                            <LinkIcon className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider shrink-0">Video URL:</span>
                            <input
                              type="text"
                              value={row.link || ""}
                              onChange={(e) => {
                                const newRows = [...table.rows];
                                newRows[rIndex] = { ...row, link: e.target.value };
                                updateTable(tIndex, { ...table, rows: newRows });
                              }}
                              placeholder="https://youtube.com/..."
                              className="flex-1 px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs text-blue-600 font-mono outline-none focus:border-gray-400 placeholder:text-gray-300 placeholder:font-sans"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {hasDocs && (
                      <div className="col-span-5 flex items-center gap-1.5">
                        <LinkIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <input
                          type="text"
                          value={row.link || ""}
                          onChange={(e) => {
                            const newRows = [...table.rows];
                            newRows[rIndex] = { ...row, link: e.target.value };
                            updateTable(tIndex, { ...table, rows: newRows });
                          }}
                          placeholder="https://... or # for placeholder"
                          className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-xs text-blue-600 font-mono outline-none focus:border-gray-400 placeholder:text-gray-300 placeholder:font-sans"
                        />
                        <label className="shrink-0 flex items-center gap-1 px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded text-xs font-semibold cursor-pointer transition-colors shadow-sm">
                          {isUploadingThis ? <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" /> : <Upload className="w-3.5 h-3.5 shrink-0" />}
                          <span>{isUploadingThis ? "Uploading..." : "Upload"}</span>
                          <input
                            type="file"
                            name={inputName}
                            accept="application/pdf,image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => upload(e, (url: string) => {
                              const newRows = [...table.rows];
                              const curDetail = row.detail?.trim();
                              const nextDetail = !curDetail || curDetail === "View Document" || curDetail === "Download" ? "Download Document" : curDetail;
                              newRows[rIndex] = { ...row, link: url, detail: nextDetail };
                              updateTable(tIndex, { ...table, rows: newRows });
                            })}
                          />
                        </label>
                      </div>
                    )}

                    <div className="col-span-1 flex justify-end items-start pt-1">
                      <button
                        onClick={() => {
                          const newRows = table.rows.filter((_, i) => i !== rIndex);
                          updateTable(tIndex, { ...table, rows: newRows });
                        }}
                        className="text-red-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded transition-all"
                        title="Remove row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
