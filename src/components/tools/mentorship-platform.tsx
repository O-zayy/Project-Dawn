import React from 'react';
import { Users, Search } from 'lucide-react';

export const MentorshipPlatform: React.FC<{ userProfile: any }> = ({ userProfile }) => {
  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[900px] max-h-[600px] overflow-hidden z-[9999]">
      <div className="bg-primary/10 border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Mentorship Platform
        </h3>
      </div>
      
      <div className="flex">
        <div className="w-64 border-r border-border p-4 space-y-4 bg-muted/30">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Search</label>
            <input
              type="text"
              placeholder="Search mentors..."
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Languages</label>
            <div className="space-y-2">
              {userProfile?.languages?.slice(0, 3).map((lang: string) => (
                <label key={lang} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  {lang}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '536px' }}>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    M{i}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Mentor {i}</div>
                    <div className="text-xs text-muted-foreground">Expert Developer</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Experienced in web development and open source contributions.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">React</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">TypeScript</span>
                </div>
                <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium text-sm">
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
