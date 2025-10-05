import React, { useState } from 'react';
import { Search, Filter, Star, GitFork, AlertCircle } from 'lucide-react';

export const OSSDiscovery: React.FC<{ userProfile: any }> = ({ userProfile }) => {
  const [filters, setFilters] = useState({
    language: userProfile?.languages?.[0] || '',
    minIssues: 5,
    lastCommit: 'week'
  });

  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[800px] max-h-[600px] overflow-hidden z-[9999]">
      <div className="bg-primary/10 border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          OSS Project Discovery
        </h3>
      </div>
      
      <div className="flex">
        {/* Filters Sidebar */}
        <div className="w-64 border-r border-border p-4 space-y-4 bg-muted/30">
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Language</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Languages</option>
              {userProfile?.languages?.map((lang: string) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-card-foreground mb-2 block">Min. Good First Issues</label>
            <input
              type="number"
              value={filters.minIssues}
              onChange={(e) => setFilters({ ...filters, minIssues: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium">
            Search Projects
          </button>
        </div>
        
        {/* Results */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ maxHeight: '536px' }}>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all">
                <h4 className="font-semibold text-card-foreground mb-2">example/project-{i}</h4>
                <p className="text-sm text-muted-foreground mb-3">A great open source project for contributors</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> 1.2k</span>
                  <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> 15 good first issues</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">JavaScript</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
