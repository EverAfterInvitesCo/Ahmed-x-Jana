import React, { useState, useEffect } from 'react';
import { X, Lock, CheckCircle2, Users, Download } from 'lucide-react';

interface AdminRSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RSVPRecord {
  id: string;
  name: string;
  attendance: string;
  guestsCount: string;
  message?: string;
  timestamp: string;
}

export const AdminRSVPModal: React.FC<AdminRSVPModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Load saved RSVPs from localStorage (where your RSVP form saves them)
      const saved = localStorage.getItem('wedding_rsvps');
      if (saved) {
        try {
          setRsvps(JSON.parse(saved));
        } catch {
          setRsvps([]);
        }
      }
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'AJ2027') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name,Attendance,Guests,Message,Date\n'];
    const rows = rsvps.map(r => `"${r.name}","${r.attendance}","${r.guestsCount}","${r.message || ''}","${r.timestamp}"\n`);
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ahmed-Jana-RSVPs.csv';
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#faf5ee] border border-[#8a6514]/30 rounded-2xl shadow-2xl p-6 md:p-8 text-[#2c1d0f] font-serif overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8a6514] hover:text-[#2c1d0f] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAuthenticated ? (
          /* Login View */
          <div className="flex flex-col items-center text-center my-auto py-8">
            <div className="w-12 h-12 rounded-full bg-[#8a6514]/10 flex items-center justify-center text-[#8a6514] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-royal mb-2">Couple's Private Portal</h3>
            <p className="text-sm text-[#543b22] mb-6">Enter your password to view guest RSVPs.</p>
            
            <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-3">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#8a6514]/30 text-center text-sm focus:outline-none focus:border-[#8a6514]"
                autoFocus
              />
              {error && <span className="text-xs text-red-600">Incorrect password. Try AJ2027</span>}
              <button
                type="submit"
                className="mt-2 py-2.5 rounded-xl bg-[#8a6514] text-white text-xs font-royal tracking-widest uppercase hover:bg-[#725210] transition-colors cursor-pointer shadow-md"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* RSVP Dashboard View */
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#8a6514]/20 mb-4">
              <div>
                <h3 className="text-xl font-royal">RSVP Responses</h3>
                <p className="text-xs text-[#543b22]">Total Confirmed Responses: {rsvps.length}</p>
              </div>
              {rsvps.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#8a6514] text-white rounded-lg text-xs font-royal tracking-wider hover:bg-[#725210] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-[#543b22]/70 text-sm">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No RSVPs submitted yet! Check back soon.
                </div>
              ) : (
                rsvps.map((rsvp) => (
                  <div key={rsvp.id} className="p-4 rounded-xl bg-white/80 border border-[#8a6514]/15 shadow-sm flex flex-col gap-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#2c1d0f]">{rsvp.name}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8a6514]/10 text-[#8a6514] font-royal tracking-wider">
                        {rsvp.attendance}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#543b22] mt-1">
                      <span>Guests: <strong>{rsvp.guestsCount}</strong></span>
                      <span>•</span>
                      <span>{new Date(rsvp.timestamp).toLocaleDateString()}</span>
                    </div>
                    {rsvp.message && (
                      <p className="text-xs italic text-[#543b22]/90 mt-2 bg-[#faf5ee] p-2 rounded-lg border border-[#8a6514]/10">
                        "{rsvp.message}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};