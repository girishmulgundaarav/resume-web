import { Heart } from 'lucide-react';
import { Editable } from './Editable';

export const ResumePage2 = ({ data, updateData }) => {
  const { personal, interests, experience, languages } = data;

  const updatePersonal = (field, val) => {
    updateData('personal', { ...personal, [field]: val });
  };

  const updateInterest = (index, val) => {
    const newInterests = [...interests];
    newInterests[index] = val;
    updateData('interests', newInterests);
  };

  const updateLanguage = (index, val) => {
    const newLang = [...(languages || [])];
    newLang[index] = { ...newLang[index], name: val };
    updateData('languages', newLang);
  };

  const updateExperience = (expIndex, projIndex, bulletIndex, val) => {
    const newExp = JSON.parse(JSON.stringify(experience));
    if (bulletIndex !== undefined) {
      newExp[expIndex].projects[projIndex].bullets[bulletIndex] = val;
    } else if (projIndex !== undefined) {
      newExp[expIndex].projects[projIndex].name = val;
    } else {
      newExp[expIndex][projIndex] = val;
    }
    updateData('experience', newExp);
  };



  return (
    <div className="resume-page bg-white text-slate-800 flex flex-col font-sans relative shadow-2xl overflow-hidden mt-8 print:mt-0 print:shadow-none print:border-none">
      
      {/* 1. Yellow Header Banner */}
      <div className="yellow-banner bg-[#F2D022] min-h-[2.5rem] h-auto md:h-10 py-2 md:py-0 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-[11px] md:text-[12px] font-bold tracking-widest text-slate-900 border-b border-[#D8BA1E] gap-1 md:gap-0 text-center md:text-left">
        <span className="uppercase text-center md:text-left">{personal.title}</span>
        <span>PROFESSIONAL EXPERIENCE / CONTINUED</span>
      </div>

      {/* 2. Main Content Split Grid */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 main-split-grid">
        
        {/* Left Sidebar (33% width) */}
        <div className="w-full md:w-[33%] border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between p-5 sidebar-column">
          
          <div className="space-y-6">
            




            {/* Interests Section */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Interests
              </h3>
              <div className="space-y-1.5 text-[13.5px]">
                {interests.map((interest, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-700 font-medium">
                    <Heart className="w-3.5 h-3.5 text-[#F2D022] fill-[#F2D022] fill-opacity-20 flex-shrink-0" />
                    <Editable 
                      value={interest} 
                      onChange={(val) => updateInterest(index, val)}
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="space-y-2">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                Languages
              </h3>
              <div className="space-y-2.5">
                {(languages || []).map((lang, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-[13.5px] font-medium leading-none">
                      <Editable 
                        value={lang.name} 
                        onChange={(val) => updateLanguage(index, val)}
                        className="text-slate-800"
                      />
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#F2D022] h-full rounded-full" 
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Content Area (67% width) */}
        <div className="w-full md:w-[67%] flex flex-col justify-between min-h-0 bg-slate-50 main-column">
          
          <div className="p-6 pb-3 space-y-3">
            
            {/* Experience List Continued */}
            <div className="space-y-4">
              
              {/* DXC Technology (Continued) */}
              {experience[0] && (
                <div className="space-y-1.5">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-2 text-[13.5px] leading-tight">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-900 uppercase">DXC TECHNOLOGY (Continued)</span>
                      <span className="text-slate-400">|</span>
                      <span className="font-semibold text-slate-700">{experience[0].role}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      <span>{experience[0].dates}</span>
                    </div>
                  </div>

                  {experience[0].projects.slice(1).map((proj, projIdx) => {
                    const actualProjIdx = projIdx + 1; // index 1 in global project list
                    return (
                      <div key={actualProjIdx} className="pl-3 border-l-2 border-slate-200 space-y-0.5">
                        {proj.name && (
                          <Editable 
                            value={proj.name} 
                            onChange={(val) => updateExperience(0, actualProjIdx, undefined, val)}
                            className="text-[13.5px] font-bold text-slate-800 block leading-tight"
                          />
                        )}
                        <ul className="list-disc pl-4 text-[12.5px] leading-relaxed text-slate-600">
                          {proj.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx}>
                              <Editable 
                                value={bullet} 
                                onChange={(val) => updateExperience(0, actualProjIdx, bulletIdx, val)}
                                multiline
                                className="w-full text-left"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Other Experiences */}
              {experience.slice(1, 5).map((exp, sliceIdx) => {
                const expIdx = sliceIdx + 1; // Maps to global indices 1, 2, 3, 4
                const borderClass = "border-t border-slate-200 pt-3";
                
                return (
                  <div key={expIdx} className={`space-y-1.5 ${borderClass}`}>
                    <div className="flex flex-wrap justify-between items-baseline gap-x-2 text-[13.5px] leading-tight">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Editable 
                          value={exp.company} 
                          onChange={(val) => updateExperience(expIdx, 'company', val)}
                          className="font-bold text-slate-900 uppercase"
                        />
                        <span className="text-slate-400">|</span>
                        <Editable 
                          value={exp.role} 
                          onChange={(val) => updateExperience(expIdx, 'role', val)}
                          className="font-semibold text-slate-700"
                        />
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        <Editable 
                          value={exp.dates} 
                          onChange={(val) => updateExperience(expIdx, 'dates', val)}
                        />
                      </div>
                    </div>

                    {exp.projects.map((proj, projIdx) => (
                      <div key={projIdx} className="pl-3 border-l-2 border-slate-200 space-y-0.5">
                        {proj.name && (
                          <Editable 
                            value={proj.name} 
                            onChange={(val) => updateExperience(expIdx, projIdx, undefined, val)}
                            className="text-[13.5px] font-bold text-slate-800 block leading-tight"
                          />
                        )}
                        <ul className="list-disc pl-4 text-[12.5px] leading-relaxed text-slate-600">
                          {proj.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx}>
                              <Editable 
                                value={bullet} 
                                onChange={(val) => updateExperience(expIdx, projIdx, bulletIdx, val)}
                                multiline
                                className="w-full text-left"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}

            </div>



          </div>

          {/* Footer Bar matching the template */}
          <div className="px-8 py-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 bg-white">
            <span>Prepared for professional submission</span>
            <div className="flex items-center gap-1 font-bold text-slate-800 tracking-wider">
              <span>LINKEDIN:</span>
              <Editable 
                value={personal.website} 
                onChange={(val) => updatePersonal('website', val)}
                className="hover:text-amber-600"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
