import { MapPin, Phone, Mail, Globe, Award, CheckCircle2 } from 'lucide-react';
import { Editable } from './Editable';

export const ResumePage1 = ({ data, updateData }) => {
  const { personal, summary, education, experience, awards, leadership } = data;

  const updatePersonal = (field, val) => {
    updateData('personal', { ...personal, [field]: val });
  };

  const updateEducation = (index, field, val) => {
    const newEdu = [...education];
    newEdu[index] = { ...newEdu[index], [field]: val };
    updateData('education', newEdu);
  };

  const updateCertification = (index, val) => {
    const newCerts = [...(data.certifications || [])];
    newCerts[index] = { ...newCerts[index], name: val };
    updateData('certifications', newCerts);
  };

  const updateAward = (index, field, val) => {
    const newAwards = [...(awards || [])];
    newAwards[index] = { ...newAwards[index], [field]: val };
    updateData('awards', newAwards);
  };

  const updateLeadership = (index, val) => {
    const newLead = [...(leadership || [])];
    newLead[index] = val;
    updateData('leadership', newLead);
  };

  const updateTechnicalSkill = (index, field, val) => {
    const newTech = [...data.technicalSkills];
    newTech[index] = { ...newTech[index], [field]: val };
    updateData('technicalSkills', newTech);
  };

  const updateExperience = (expIndex, projIndex, bulletIndex, val) => {
    const newExp = JSON.parse(JSON.stringify(experience));
    if (bulletIndex !== undefined) {
      newExp[expIndex].projects[projIndex].bullets[bulletIndex] = val;
    } else if (projIndex !== undefined) {
      newExp[expIndex].projects[projIndex].name = val;
    } else {
      // Direct field update (like company, role, etc)
      // expIndex can be index, projIndex is string (field)
      newExp[expIndex][projIndex] = val;
    }
    updateData('experience', newExp);
  };

  return (
    <div className="resume-page bg-white text-slate-800 flex flex-col font-sans relative shadow-2xl overflow-hidden print:shadow-none print:border-none">
      
      {/* 1. Yellow Header Banner */}
      <div className="bg-[#F2D022] h-10 px-8 flex items-center justify-between text-[13px] font-bold tracking-widest text-slate-900 border-b border-[#D8BA1E]">
        <Editable 
          value={personal.title} 
          onChange={(val) => updatePersonal('title', val)}
          className="uppercase"
        />
        <span>CURRICULUM VITAE / RESUME</span>
      </div>

      {/* 2. Main Content Split Grid */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 main-split-grid">
        
        {/* Left Sidebar (33% width) */}
        <div className="w-full md:w-[33%] border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between p-5 sidebar-column">
          
          <div className="space-y-5">
            {/* Contact Details with Yellow Circles */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F2D022] flex items-center justify-center flex-shrink-0 text-slate-950 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold block text-slate-900">Address</span>
                  <Editable 
                    value={personal.address} 
                    onChange={(val) => updatePersonal('address', val)}
                    className="text-slate-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F2D022] flex items-center justify-center flex-shrink-0 text-slate-950 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold block text-slate-900">Mobile</span>
                  <Editable 
                    value={personal.mobile} 
                    onChange={(val) => updatePersonal('mobile', val)}
                    className="text-slate-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F2D022] flex items-center justify-center flex-shrink-0 text-slate-950 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold block text-slate-900">Email</span>
                  <Editable 
                    value={personal.email} 
                    onChange={(val) => updatePersonal('email', val)}
                    className="text-slate-600 break-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F2D022] flex items-center justify-center flex-shrink-0 text-slate-950 shadow-sm">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="text-[13.5px] leading-tight">
                  <span className="font-semibold block text-slate-900">Website</span>
                  <Editable 
                    value={personal.website} 
                    onChange={(val) => updatePersonal('website', val)}
                    className="text-slate-600 break-all"
                  />
                </div>
              </div>
            </div>

            {/* Photo / Avatar */}
            <div className="relative group overflow-hidden border-t border-slate-200 pt-5 flex justify-center">
              <div className="w-32 md:w-[52%] aspect-square rounded-full border-4 border-[#F2D022] overflow-hidden relative shadow-md">
                <img 
                  src={personal.avatar} 
                  alt="Profile Photo" 
                  className="w-full h-full object-cover object-top rounded-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300";
                  }}
                />
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-2.5">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#F2D022]" />
                Certifications
              </h3>
              <div className="space-y-2.5 text-[12.5px]">
                {(data.certifications || []).map((cert, index) => (
                  <div key={index} className="flex items-start gap-2.5 leading-snug text-slate-700">
                    {cert.logo && (
                      <img 
                        src={cert.logo} 
                        alt={`${cert.name} Logo`} 
                        className="w-6 h-6 object-contain flex-shrink-0 mt-0.5"
                      />
                    )}
                    <Editable 
                      value={cert.name} 
                      onChange={(val) => updateCertification(index, val)}
                      className="flex-1 text-left font-medium"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div className="space-y-2.5">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#F2D022]" />
                Awards
              </h3>
              <div className="space-y-2.5">
                {(awards || []).map((award, index) => (
                  <div key={index} className="text-[12.5px] leading-snug space-y-0.5">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <span className="text-[#F2D022] font-bold mt-0.5">•</span>
                      <div className="flex-1">
                        <Editable 
                          value={award.title} 
                          onChange={(val) => updateAward(index, 'title', val)}
                          className="font-bold text-slate-900 block"
                        />
                        <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] text-slate-500 font-medium">
                          <Editable 
                            value={award.org} 
                            onChange={(val) => updateAward(index, 'org', val)}
                          />
                          <span>•</span>
                          <Editable 
                            value={award.year} 
                            onChange={(val) => updateAward(index, 'year', val)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-2.5">
              <h3 className="text-[14px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                Education
              </h3>
              {education.map((edu, index) => (
                <div key={index} className="text-[12.5px] leading-relaxed space-y-0.5">
                  <Editable 
                    value={edu.school} 
                    onChange={(val) => updateEducation(index, 'school', val)}
                    className="font-bold text-slate-900 block"
                  />
                  <Editable 
                    value={edu.dates} 
                    onChange={(val) => updateEducation(index, 'dates', val)}
                    className="text-slate-500 text-[11px] block"
                  />
                  <Editable 
                    value={edu.degree} 
                    onChange={(val) => updateEducation(index, 'degree', val)}
                    className="text-slate-600 block italic text-[12.5px]"
                  />
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Right Content Area (67% width) */}
        <div className="w-full md:w-[67%] flex flex-col min-h-0 main-column">
          
          {/* Top section: Name, Summary and Technical Skills */}
          <div className="p-5 pb-2.5 space-y-2.5">
            <div>
              <h2 className="text-[38px] font-extrabold tracking-tight text-slate-900 uppercase leading-none">
                <Editable 
                  value={personal.name} 
                  onChange={(val) => updatePersonal('name', val)}
                />
              </h2>
              <div className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600 border-l-2 border-[#F2D022] pl-3">
                <Editable 
                  value={summary} 
                  onChange={(val) => updateData('summary', val)}
                  multiline
                />
              </div>
            </div>

            {/* Technical Skills Section */}
            <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-slate-900 border-b border-[#F2D022] pb-0.5">
                Technical Skills
              </h3>
              <div className="space-y-1 text-[12.5px] leading-normal text-slate-600">
                {data.technicalSkills && data.technicalSkills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <span className="font-bold text-slate-800 flex-shrink-0">
                      <Editable 
                        value={skill.label} 
                        onChange={(val) => updateTechnicalSkill(index, 'label', val)}
                      />:
                    </span>
                    <Editable 
                      value={skill.value} 
                      onChange={(val) => updateTechnicalSkill(index, 'value', val)}
                      className="text-slate-600 flex-1 text-left"
                      multiline
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership & QA Strategy Section */}
            <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-slate-900 border-b border-[#F2D022] pb-0.5">
                Leadership & QA Strategy
              </h3>
              <ul className="list-none space-y-1 text-[12.5px] leading-relaxed text-slate-600">
                {(leadership || []).map((leadItem, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F2D022] flex-shrink-0 mt-0.5" />
                    <Editable 
                      value={leadItem} 
                      onChange={(val) => updateLeadership(index, val)}
                      multiline
                      className="flex-1 text-left"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section: Professional Experience with Grey background */}
          <div className="flex-1 bg-slate-50 p-5 pt-3.5 border-t border-slate-200 space-y-2.5 overflow-hidden">
            <h3 className="text-[15px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Professional Experience
            </h3>
            
            {/* Experience List - DXC Technology Only on Page 1 */}
            <div className="space-y-3">
              
              {/* DXC Technology */}
              {experience.slice(0, 1).map((exp, idx) => {
                const expIdx = idx; // index 0 in global experience list
                return (
                  <div key={expIdx} className="space-y-1.5">
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

                    {exp.projects.slice(0, 1).map((proj, projIdx) => (
                      <div key={projIdx} className="pl-3 border-l-2 border-slate-200 space-y-0.5">
                        <Editable 
                          value={proj.name} 
                          onChange={(val) => updateExperience(expIdx, projIdx, undefined, val)}
                          className="text-[13.5px] font-bold text-slate-800 block leading-tight"
                        />
                        <ul className="list-disc pl-4 space-y-0.5 text-[12.5px] leading-relaxed text-slate-600">
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

        </div>

      </div>

    </div>
  );
};
