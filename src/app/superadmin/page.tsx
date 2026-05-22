"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, ExternalLink, RefreshCw, Key, Link as LinkIcon, Save, Copy, Check } from "lucide-react";

export default function SuperadminPage() {
  const [masterKey, setMasterKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newSchool, setNewSchool] = useState({ slug: "", admin_email: "", admin_password: "" });
  const [adding, setAdding] = useState(false);

  const [editingUrl, setEditingUrl] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
        setNewSchool({ slug: "", admin_email: "", admin_password: "" });
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
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schools Manager</h1>
            <p className="text-sm text-gray-500 mt-1">Manage credentials, API endpoints, and live websites.</p>
          </div>
          <button onClick={() => fetchSchools(masterKey)} className="text-gray-500 hover:text-gray-900 flex items-center gap-1.5 text-sm font-medium">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
          </button>
        </div>

        {/* School List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-500 tracking-wider">
              <tr>
                <th className="px-6 py-4">Slug / Contact</th>
                <th className="px-6 py-4">Credentials</th>
                <th className="px-6 py-4 w-64">Live Website URL</th>
                <th className="px-6 py-4 text-right">API Endpoint (UUID)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schools.map(school => (
                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{school.slug}</div>
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
                    <button 
                      onClick={() => copyToClipboard(`https://cmsgridaan.vercel.app/api/school-data?schoolId=${school.id}`, school.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                    >
                      {copiedId === school.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {school.id.substring(0, 8)}...
                    </button>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && !loading && (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No schools registered yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add School Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 flex items-center gap-2"><Plus className="w-4 h-4" /> Register New School</h2>
            <form onSubmit={handleAddSchool} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="School Slug (e.g. springfield)" value={newSchool.slug} onChange={e => setNewSchool({...newSchool, slug: e.target.value})} className="col-span-2 px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
                <input required type="email" placeholder="Admin Email" value={newSchool.admin_email} onChange={e => setNewSchool({...newSchool, admin_email: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
                <input required type="text" placeholder="Admin Password" value={newSchool.admin_password} onChange={e => setNewSchool({...newSchool, admin_password: e.target.value})} className="px-3 py-2 border rounded-md text-sm outline-none focus:border-gray-400 text-slate-800 placeholder-gray-500" />
              </div>
              <button disabled={adding} type="submit" className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-800 disabled:opacity-50">
                {adding ? "Registering..." : "Add School"}
              </button>
            </form>
          </div>

          {/* API Documentation */}
          <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 p-6 space-y-4 text-gray-300">
            <h2 className="font-bold text-white flex items-center gap-2"><Key className="w-4 h-4" /> Developer API Guide</h2>
            <p className="text-sm leading-relaxed">
              To render a school's data on their actual website, use the standard Javascript <code className="bg-gray-800 text-white px-1 py-0.5 rounded">fetch()</code> API to call their specific endpoint.
            </p>
            <div className="bg-black/50 p-3 rounded-md border border-gray-800">
              <code className="text-xs text-green-400 font-mono block">
                const res = await fetch("https://cmsgridaan.vercel.app/api/school-data?schoolId=YOUR_UUID");<br/>
                const data = await res.json();<br/><br/>
                // Accessing data:<br/>
                console.log(data.schoolName);<br/>
                console.log(data.phone);<br/>
                console.log(data.banners[0].image);
              </code>
            </div>
            <p className="text-xs text-gray-500 mt-2">UUIDs are strictly private. Do not expose them in public GitHub repositories. They should be stored in environment variables on the client's host.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
