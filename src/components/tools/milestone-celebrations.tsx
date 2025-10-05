import React from 'react';
import { Award, Copy } from 'lucide-react';

export const MilestoneCelebrations: React.FC<{ userProfile: any }> = () => {
  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[700px] max-h-[600px] overflow-y-auto z-[9999] p-6">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-primary" />
        Milestone Celebrations
      </h3>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-all">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              U{i}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-card-foreground">
                User{i} merged their 10th PR in project-x!
              </div>
              <div className="text-xs text-muted-foreground">2 hours ago</div>
            </div>
            <button className="px-4 py-2 bg-muted hover:bg-muted/80 border border-border rounded-md text-sm font-medium text-card-foreground transition-all flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Generate Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
