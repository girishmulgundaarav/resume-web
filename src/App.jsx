import { useState, useEffect } from 'react';
import { initialResumeData } from './data/initialData';
import { ControlPanel } from './components/ControlPanel';
import { ResumePage1 } from './components/ResumePage1';
import { ResumePage2 } from './components/ResumePage2';

function App() {
  const isEditable = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('edit') === 'true';

  // Load data from localStorage or fallback to initial template data
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('girish_resume_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.personal && (parsed.personal.avatar === "/avatar.png" || parsed.personal.avatar === "/profile.jpeg" || !parsed.personal.avatar)) {
          parsed.personal.avatar = "/profile.jpg";
        }
        if (parsed.personal && (parsed.personal.address === "San Jose, California, USA" || !parsed.personal.address)) {
          parsed.personal.address = "2692/A, Sai Surya, Banashankari 6th stage, 4th Block, Bangalore - 560062";
        }
        if (parsed.personal && (parsed.personal.mobile === "+1 (408) 555-0192" || !parsed.personal.mobile)) {
          parsed.personal.mobile = "+91 9945519940";
        }
        if (parsed.personal && (parsed.personal.email === "girish.mulgund@example.com" || !parsed.personal.email)) {
          parsed.personal.email = "girish.mulgund@gmail.com";
        }
        if (parsed.personal && (parsed.personal.website === "linkedin.com/in/girishmulgund" || !parsed.personal.website)) {
          parsed.personal.website = "linkedin.com/in/girish-mulgund";
        }
        if (parsed.experience) {
          parsed.experience = parsed.experience.filter(exp => exp.company !== "PIXEL INFOTEK PVT LTD");
        }
        if (!parsed.technicalSkills) {
          parsed.technicalSkills = initialResumeData.technicalSkills;
        }
        if (!parsed.certifications || !parsed.certifications[0]?.logo) {
          parsed.certifications = initialResumeData.certifications;
        }
        if (parsed.education && parsed.education[0] && parsed.education[0].school === "Visvesvaraya Technological University") {
          parsed.education[0].school = "UBDT College of Engineering";
          parsed.education[0].degree = "Bachelor of Engineering (Industrial Production)";
        }
        return parsed;
      } catch (e) {
        console.error("Error parsing saved resume data, resetting.", e);
      }
    }
    return initialResumeData;
  });

  // Dark mode state for the screen preview backdrop
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('girish_resume_theme');
    return savedTheme === 'dark';
  });

  // Zoom state for the screen preview
  const [zoom, setZoom] = useState(() => {
    const saved = localStorage.getItem('girish_resume_zoom');
    return saved ? parseFloat(saved) : 1.0;
  });

  // Persist zoom level
  useEffect(() => {
    localStorage.setItem('girish_resume_zoom', zoom.toString());
  }, [zoom]);

  // Persist resume data when changed
  useEffect(() => {
    localStorage.setItem('girish_resume_data', JSON.stringify(resumeData));
  }, [resumeData]);

  // Persist dark mode theme and toggle body class
  useEffect(() => {
    localStorage.setItem('girish_resume_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Update specific top-level field of resume data
  const updateData = (key, value) => {
    setResumeData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset to original document defaults
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all edits to original template values?")) {
      setResumeData(initialResumeData);
      localStorage.removeItem('girish_resume_data');
    }
  };

  // Upload custom headshot photo
  const handlePhotoUpload = (dataUrl) => {
    updateData('personal', {
      ...resumeData.personal,
      avatar: dataUrl
    });
  };

  // Trigger browser print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-800'}`}>

      {/* Control panel header - hidden in print */}
      <ControlPanel
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onPrint={handlePrint}
        onReset={handleReset}
        onPhotoUpload={handlePhotoUpload}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      {/* Screen Preview Information Alert - hidden in print */}
      {isEditable && (
        <div className="no-print max-w-7xl w-full mx-auto px-4 mt-6">
          <div className={`p-4 rounded-xl border text-sm flex items-start gap-3 shadow-sm ${darkMode
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200 text-slate-600'
            }`}>
            <div className="bg-amber-400 bg-opacity-25 text-amber-400 p-1 rounded-lg text-xs font-bold mt-0.5">TIP</div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">How to export your Resume as PDF:</p>
              <p className="mt-1">
                Click the <strong className="text-amber-400">Print / Save PDF</strong> button above.
                In the print dialog, select <strong className="text-amber-400">Save as PDF</strong> as the destination.
                Set Margins to <strong className="text-amber-400">None</strong>, check <strong className="text-amber-400">Background graphics</strong>, and uncheck headers/footers for a perfect result.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Centered Scrollable Document Area */}
      <div className="flex-1 py-4 md:py-8 px-2 md:px-4 flex flex-col items-center justify-start overflow-x-auto overflow-y-auto print:p-0 print:overflow-visible">
        <div 
          className="flex flex-col items-center print:block print:w-[210mm] origin-top zoom-container"
          style={{ zoom: zoom }}
        >

          {/* Page 1 */}
          <ResumePage1
            data={resumeData}
            updateData={updateData}
          />

          {/* Page 2 */}
          <ResumePage2
            data={resumeData}
            updateData={updateData}
          />

        </div>
      </div>

    </div>
  );
}

export default App;
