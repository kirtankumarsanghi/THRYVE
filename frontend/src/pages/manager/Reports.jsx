import { useState } from "react";
import { Download } from "lucide-react";
import { exportAchievementCSV, exportAchievementXLSX, downloadCSV } from "../../api/adminApi";

export default function Reports() {
  const [format, setFormat] = useState("csv");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (format === 'csv') {
        const blob = await exportAchievementCSV();
        downloadCSV(blob, `achievement_report_${Date.now()}.csv`);
      } else {
        const blob = await exportAchievementXLSX();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `achievement_report_${Date.now()}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (e) {
      alert(e?.response?.data?.detail || 'Export failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Reports & Export</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
        <label className="text-sm text-gray-300">Select Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full bg-[#060D1F] border border-white/10 rounded-lg text-white p-3">
          <option value="csv">CSV</option>
          <option value="xlsx">Excel (.xlsx)</option>
        </select>

        <button onClick={handleGenerate} disabled={loading} className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg">
          <Download size={18} /> {loading ? 'Generating...' : 'Download Achievement Report'}
        </button>
      </div>
    </div>
  );
}
