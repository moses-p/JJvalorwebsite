"use client";

import { useRef, useState } from "react";
import { uploadMedia } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";
import { Upload } from "lucide-react";

type ImageUploadFieldProps = {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function ImageUploadField({ label, value, onChange, folder = "content" }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const result = await uploadMedia(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/photo.jpg or upload"
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 disabled:opacity-60"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {value && (
        <img
          src={resolveImageUrl(value)}
          alt="Preview"
          className="mt-3 h-24 w-36 object-cover rounded-lg border border-slate-200"
        />
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
