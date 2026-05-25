import { useRef } from 'react';
import { Printer, Moon, Sun, Upload, RotateCcw, Sparkles, ZoomIn, ZoomOut } from 'lucide-react';

export const ControlPanel = ({ 
  darkMode, 
  setDarkMode, 
  onPrint, 
  onReset, 
  onPhotoUpload,
  zoom = 1.0,
  onZoomChange
}) => {
  const fileInputRef = useRef(null);

  // Enable builder controls only if ?edit=true is appended to the URL query parameters
  const isEditable = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        onPhotoUpload(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 px-4 py-3 shadow-md backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand/Title */}
        <div className="flex items-center gap-2">
          <div className="bg-amber-400 text-slate-900 p-1.5 rounded-lg font-bold flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight flex items-center gap-2">
              {isEditable ? "Interactive Resume Builder" : "Girish Mulgund Portfolio"}
              <span className="bg-amber-400 text-slate-900 text-xs px-2 py-0.5 rounded-full font-semibold">
                QA Automation Lead
              </span>
            </h1>
            <p className="text-slate-400 text-xs">
              {isEditable 
                ? "Click any text block below to edit inline. Changes auto-save." 
                : "AI & Cloud Certified Senior QA Automation Lead"
              }
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Photo Upload - Only visible in edit mode */}
          {isEditable && (
            <>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all font-medium active:scale-95"
                title="Upload custom headshot image"
              >
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload Photo</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95"
            title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-slate-200">
            <button 
              onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
              disabled={zoom <= 0.5}
              className="p-1 rounded hover:bg-slate-700 active:scale-95 transition-all text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span 
              onClick={() => onZoomChange(1.0)}
              className="text-xs font-mono font-semibold w-12 text-center cursor-pointer hover:text-amber-400 select-none text-slate-300"
              title="Reset to 100%"
            >
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
              disabled={zoom >= 1.5}
              className="p-1 rounded hover:bg-slate-700 active:scale-95 transition-all text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Reset - Only visible in edit mode */}
          {isEditable && (
            <button 
              onClick={onReset}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm bg-slate-800 hover:bg-red-950 hover:text-red-200 hover:border-red-800 text-slate-200 border border-slate-700 transition-all font-medium active:scale-95"
              title="Reset data to original template defaults"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Reset</span>
            </button>
          )}

          {/* Print / Save PDF */}
          <button 
            onClick={onPrint}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm bg-amber-400 hover:bg-amber-300 text-slate-900 transition-all font-semibold shadow-lg shadow-amber-400/20 active:scale-95"
            title="Print Resume or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>

        </div>

      </div>
    </div>
  );
};
