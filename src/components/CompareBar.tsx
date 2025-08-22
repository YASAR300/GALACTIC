import React, { useMemo, useState } from 'react';
import { X, ArrowLeftRight } from 'lucide-react';
import permits from '../utils/permits';
import { useCompare } from '../context/CompareContext';

export default function CompareBar() {
  const { selected, remove, clear } = useCompare();
  const [open, setOpen] = useState(false);

  const selectedPermits = useMemo(() => permits.filter(p => selected.includes(p.id)), [selected]);

  if (selected.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40">
      <div className="container-page">
        <div className="glass-card p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeftRight size={18} className="text-brand-600 dark:text-cyan-400" />
            <span className="font-space-mono text-sm">Compare</span>
            <div className="flex -space-x-2">
              {selectedPermits.map(p => (
                <div key={p.id} className="glass-surface px-2 py-1 text-xs">
                  {p.name}
                  <button onClick={() => remove(p.id)} className="ml-2 text-red-500">×</button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setOpen(true)} className="px-3 py-1 rounded-lg bg-brand-600 text-white text-sm">Open</button>
            <button onClick={clear} className="px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-sm">Clear</button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="glass-card max-w-5xl w-full mx-4 p-4 relative">
            <button className="absolute top-2 right-2 p-2" onClick={() => setOpen(false)}>
              <X />
            </button>
            <h3 className="text-lg font-orbitron mb-4">Permit Comparison</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2 pr-4">Field</th>
                    {selectedPermits.map(p => (
                      <th key={p.id} className="py-2 px-4">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'difficulty', label: 'Difficulty' },
                    { key: 'rejectionRate', label: 'Rejection Rate' },
                    { key: 'processingTime', label: 'Processing Time' },
                    { key: 'cost', label: 'Cost' },
                  ].map(row => (
                    <tr key={row.key} className="border-t border-white/10">
                      <td className="py-3 pr-4 font-medium text-gray-600 dark:text-gray-400">{row.label}</td>
                      {selectedPermits.map(p => (
                        <td key={p.id + String(row.key)} className="py-3 px-4 align-top">
                          {(p as any)[row.key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 