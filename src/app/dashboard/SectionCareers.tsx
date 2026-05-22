import { Plus, Trash2, Briefcase, MapPin, Clock } from "lucide-react";
import { SchoolData, JobOpening } from "@/lib/data";

interface Props {
  data: SchoolData;
  setData: (d: SchoolData) => void;
}

export default function SectionCareers({ data, setData }: Props) {
  const addJob = () => {
    const newJob: JobOpening = {
      id: Date.now().toString(),
      title: "New Position",
      type: "Full-time",
      location: "On-site",
      experience: "1-3 Years",
      description: "Briefly describe the responsibilities and requirements for this role.",
      applyLink: "mailto:careers@yourschool.edu"
    };
    setData({ ...data, jobOpenings: [...(data.jobOpenings || []), newJob] });
  };

  const removeJob = (id: string) => {
    setData({ ...data, jobOpenings: data.jobOpenings.filter(j => j.id !== id) });
  };

  const updateJob = (id: string, field: keyof JobOpening, value: string) => {
    setData({
      ...data,
      jobOpenings: data.jobOpenings.map(j => j.id === id ? { ...j, [field]: value } : j)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Careers & Job Openings</h2>
          <p className="text-xs text-gray-500 mt-0.5">Post available positions to attract talent to your school.</p>
        </div>
        <button
          onClick={addJob}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Job
        </button>
      </div>

      <div className="space-y-4">
        {data.jobOpenings?.map(job => (
          <div key={job.id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <input
                type="text"
                value={job.title}
                onChange={(e) => updateJob(job.id, "title", e.target.value)}
                className="flex-1 text-base font-bold text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-gray-400 outline-none px-1 py-0.5 transition-colors placeholder:text-gray-300"
                placeholder="Job Title (e.g. Mathematics Teacher)"
              />
              <button
                onClick={() => removeJob(job.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors shrink-0"
                title="Remove Job"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 px-1">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <Briefcase className="w-3 h-3 text-gray-500" />
                <select
                  value={job.type}
                  onChange={(e) => updateJob(job.id, "type", e.target.value as any)}
                  className="text-xs font-medium text-gray-700 bg-transparent outline-none cursor-pointer"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <select
                  value={job.location}
                  onChange={(e) => updateJob(job.id, "location", e.target.value as any)}
                  className="text-xs font-medium text-gray-700 bg-transparent outline-none cursor-pointer"
                >
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded px-2 py-1 flex-1 min-w-[120px]">
                <Clock className="w-3 h-3 text-gray-500" />
                <input
                  type="text"
                  value={job.experience}
                  onChange={(e) => updateJob(job.id, "experience", e.target.value)}
                  className="w-full text-xs font-medium text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
                  placeholder="Experience (e.g. 3-5 Years)"
                />
              </div>
            </div>

            <div className="px-1 space-y-2">
              <textarea
                value={job.description}
                onChange={(e) => updateJob(job.id, "description", e.target.value)}
                className="w-full text-sm text-gray-600 border border-gray-200 rounded p-2 outline-none hover:border-gray-300 focus:border-gray-400 min-h-[80px] resize-y"
                placeholder="Job description, responsibilities, and requirements..."
              />
            </div>

            <div className="px-1 pt-2 border-t border-gray-100 flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500">Apply Link:</span>
              <input
                type="text"
                value={job.applyLink}
                onChange={(e) => updateJob(job.id, "applyLink", e.target.value)}
                className="flex-1 text-sm text-blue-600 border-b border-transparent hover:border-blue-200 focus:border-blue-300 outline-none py-0.5"
                placeholder="mailto:careers@school.edu OR https://forms.google.com/..."
              />
            </div>
          </div>
        ))}

        {(!data.jobOpenings || data.jobOpenings.length === 0) && (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-white border border-dashed border-gray-200 rounded-lg">
            <Briefcase className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-sm">No job openings posted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
