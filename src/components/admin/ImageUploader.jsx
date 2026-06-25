'use client';
import { useRef, useState } from 'react';
import { LuUpload, LuLoader } from 'react-icons/lu';

export const ImageUploader = ({
  onUploaded,
  label = 'Dodaj slike',
  multiple = true,
  accept = 'image/webp,image/jpeg,image/png,image/avif',
}) => {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append('file', file);
        const res = await fetch('/api/admin/upload', { method: 'POST', body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Greška pri otpremanju.');
        await onUploaded(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-[3px] hover:bg-accent-hover disabled:opacity-60 transition-colors"
      >
        {busy ? <LuLoader className="w-4 h-4 animate-spin" /> : <LuUpload className="w-4 h-4" />}
        {busy ? 'Otpremanje…' : label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
