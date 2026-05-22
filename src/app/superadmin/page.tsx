"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, ExternalLink, RefreshCw, Key, Link as LinkIcon, Save, Copy, Check } from "lucide-react";

export default function SuperadminPage() {
  const [masterKey, setMasterKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'docs'
  
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newSchool, setNewSchool] = useState({ school_name: "", admin_email: "", admin_password: "" });
  const [adding, setAdding] = useState(false);

  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const magicLogin = (school: any) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("schoolId", school.id);
    localStorage.setItem("liveUrl", school.live_url || "/preview");
    window.open("/dashboard", "_blank");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterKey) {
      setIsAuthenticated(true);
      fetchSchools(masterKey);
    }
  };

  const fetchSchools = async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/schools", {
        headers: { Authorization: `Bearer ${key}` }
      });
      const data = await res.json();
      if (res.ok) setSchools(data.schools);
      else setError(data.error);
    } catch (err) {
      setError("Failed to fetch schools.");
    }
    setLoading(false);
  };

  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch("/api/admin/add-school", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${masterKey}`
        },
        body: JSON.stringify(newSchool)
      });
      if (res.ok) {
        setNewSchool({ school_name: "", admin_email: "", admin_password: "" });
        fetchSchools(masterKey);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add school");
      }
    } catch (err) {
      alert("Error adding school");
    }
    setAdding(false);
  };

  const saveLiveUrl = async (id: string) => {
    try {
      const res = await fetch("/api/admin/schools", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${masterKey}`
        },
        body: JSON.stringify({ id, live_url: tempUrl })
      });
      if (res.ok) {
        setSchools(schools.map(s => s.id === id ? { ...s, live_url: tempUrl } : s));
        setEditingUrl(null);
      }
    } catch (err) {
      alert("Failed to update URL");
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-sm w-full space-y-6">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2"><Key className="w-5 h-5 text-gray-400" /> Superadmin Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Enter master key to manage client schools.</p>
          </div>
          <input 
            suppressHydrationWarning
            type="password" 
            value={masterKey}
            onChange={(e) => setMasterKey(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500"
            placeholder="Master Key"
            required
          />
          <button className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-800">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schools Manager</h1>
            <div className="flex gap-4 mt-3">
              <button 
                onClick={() => setActiveTab("dashboard")} 
                className={`text-sm font-medium pb-1 border-b-2 ${activeTab === "dashboard" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab("docs")} 
                className={`text-sm font-medium pb-1 border-b-2 ${activeTab === "docs" ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              >
                API Docs
              </button>
            </div>
          </div>
          {activeTab === "dashboard" && (
            <button onClick={() => fetchSchools(masterKey)} className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5 text-sm font-medium">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
            </button>
          )}
        </div>

        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* School List Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500 tracking-wider">
                  <tr>
                    <th className="px-6 py-4">School Name / Contact</th>
                    <th className="px-6 py-4">Credentials</th>
                    <th className="px-6 py-4 w-64">Live Website URL</th>
                    <th className="px-6 py-4 text-right">API Endpoint (UUID)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schools.map(school => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{school.school_name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">📞 {school.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">{school.admin_email}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{school.admin_password}</div>
                      </td>
                      <td className="px-6 py-4">
                        {editingUrl === school.id ? (
                          <div className="flex items-center gap-2">
                            <input 
                              autoFocus
                              value={tempUrl} 
                              onChange={(e) => setTempUrl(e.target.value)}
                              className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs outline-none text-slate-800" 
                            />
                            <button onClick={() => saveLiveUrl(school.id)} className="text-green-600 hover:text-green-700"><Save className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between group">
                            <a href={school.live_url} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1.5 truncate max-w-[200px]">
                              {school.live_url}
                            </a>
                            <button onClick={() => { setEditingUrl(school.id); setTempUrl(school.live_url); }} className="text-gray-400 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => copyToClipboard(`https://cmsgridaan.vercel.app/api/school-data?schoolId=${school.id}`, school.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                            title="Copy API Endpoint"
                          >
                            {copiedId === school.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                            {school.id.substring(0, 8)}...
                          </button>
                          <button
                            onClick={() => magicLogin(school)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 transition-colors"
                            title="Login as this School"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Login
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {schools.length === 0 && !loading && (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No schools registered yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Add School Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 max-w-2xl">
              <h2 className="font-bold text-gray-900 flex items-center gap-2"><Plus className="w-4 h-4" /> Register New School</h2>
              <form onSubmit={handleAddSchool} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="School Name (e.g. Springfield High)" value={newSchool.school_name} onChange={e => setNewSchool({...newSchool, school_name: e.target.value})} className="col-span-2 px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
                  <input required type="email" placeholder="Admin Email" value={newSchool.admin_email} onChange={e => setNewSchool({...newSchool, admin_email: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
                  <input required type="text" placeholder="Admin Password" value={newSchool.admin_password} onChange={e => setNewSchool({...newSchool, admin_password: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
                </div>
                <button disabled={adding} type="submit" className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-800 disabled:opacity-50">
                  {adding ? "Registering..." : "Add School"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">API Documentation</h2>
            
            <div className="space-y-6 text-sm text-gray-800 font-mono">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Endpoint:</p>
                <code className="bg-gray-100 px-2 py-1 rounded border border-gray-200">GET https://cmsgridaan.vercel.app/api/school-data?schoolId=UUID</code>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">Available JSON Keys:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-gray-600">
                  <li><span className="text-blue-600">schoolName</span> (string)</li>
                  <li><span className="text-blue-600">shortName</span> (string)</li>
                  <li><span className="text-blue-600">tagline</span> (string)</li>
                  <li><span className="text-blue-600">headerLogo</span> (string - URL)</li>
                  <li><span className="text-blue-600">footerLogo</span> (string - URL)</li>
                  <li><span className="text-blue-600">themeColor</span> (string - Hex)</li>
                  <li><span className="text-blue-600">phone</span> (string)</li>
                  <li><span className="text-blue-600">email</span> (string)</li>
                  <li><span className="text-blue-600">address</span> (string)</li>
                  <li><span className="text-blue-600">facebookLink</span> (string)</li>
                  <li><span className="text-blue-600">instagramLink</span> (string)</li>
                  <li><span className="text-blue-600">youtubeLink</span> (string)</li>
                  <li><span className="text-blue-600">twitterLink</span> (string)</li>
                  <li><span className="text-blue-600">banners</span> (Array: id, image, title, subtitle, buttonText, buttonLink)</li>
                  <li><span className="text-blue-600">aboutUsText</span> (string)</li>
                  <li><span className="text-blue-600">aboutUsImage</span> (string - URL)</li>
                  <li><span className="text-blue-600">visionText</span> (string)</li>
                  <li><span className="text-blue-600">missionText</span> (string)</li>
                  <li><span className="text-blue-600">notices</span> (Array: id, text, date, type)</li>
                  <li><span className="text-blue-600">facilities</span> (Array: id, title, description, image, linkText, linkUrl)</li>
                  <li><span className="text-blue-600">chairpersonName</span> (string)</li>
                  <li><span className="text-blue-600">chairpersonMessage</span> (string)</li>
                  <li><span className="text-blue-600">chairpersonPhoto</span> (string - URL)</li>
                  <li><span className="text-blue-600">principalName</span> (string)</li>
                  <li><span className="text-blue-600">principalMessage</span> (string)</li>
                  <li><span className="text-blue-600">principalPhoto</span> (string - URL)</li>
                  <li><span className="text-blue-600">principalQualification</span> (string)</li>
                  <li><span className="text-blue-600">academicSections</span> (Array: id, name, details)</li>
                  <li><span className="text-blue-600">subjectsOffered</span> (Array: id, name)</li>
                  <li><span className="text-blue-600">feeStructureDocument</span> (string - URL)</li>
                  <li><span className="text-blue-600">facultyMembers</span> (Array: id, name, designation, department, image, qualification, experience, bio)</li>
                  <li><span className="text-blue-600">upcomingEvents</span> (Array: id, title, date, description)</li>
                  <li><span className="text-blue-600">achievements</span> (Array: id, title, year, description, image)</li>
                  <li><span className="text-blue-600">jobOpenings</span> (Array: id, title, type, location, experience, description, applyLink)</li>
                  <li><span className="text-blue-600">class12Toppers</span> (Array: id, name, percentage, stream, photo)</li>
                  <li><span className="text-blue-600">class10Toppers</span> (Array: id, name, percentage, stream, photo)</li>
                  <li><span className="text-blue-600">photoAlbums</span> (Array: id, title, coverImage, images [id, url, caption])</li>
                  <li><span className="text-blue-600">testimonials</span> (Array: id, name, role, message, photo)</li>
                  <li><span className="text-blue-600">footerAboutText</span> (string)</li>
                  <li><span className="text-blue-600">campusTimings</span> (Array: day, time)</li>
                  <li><span className="text-blue-600">officeTimings</span> (Array: day, time)</li>
                  <li><span className="text-blue-600">customPages</span> (Array: id, title, content, showInMenu, menuGroup, image)</li>
                  <li><span className="text-blue-600">disclosureTables</span> (Array: title, rows [field, detail])</li>
                </ul>
              </div>
              
              <div>
                <p className="font-semibold text-gray-900 mt-4 mb-2">Example Usage:</p>
                <pre className="bg-gray-100 p-4 rounded-md border border-gray-200 overflow-x-auto text-xs">
{`fetch('https://cmsgridaan.vercel.app/api/school-data?schoolId=UUID')
  .then(response => response.json())
  .then(data => {
    document.getElementById('school-phone').innerText = data.phone;
    
    // Loop through banners
    data.banners.forEach(banner => {
      console.log(banner.image, banner.title);
    });
  });`}
                </pre>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
