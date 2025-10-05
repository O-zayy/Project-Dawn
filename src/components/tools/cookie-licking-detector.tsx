import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const CookieLickingDetector: React.FC<{ userProfile: any }> = () => {
  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[700px] max-h-[600px] overflow-y-auto z-[9999] p-6">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Cookie Licking Detector
      </h3>
      
      <div className="space-y-4">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm font-medium text-card-foreground mb-1">
                ⚠️ This issue was claimed by @user 10 days ago with no linked PR.
              </div>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 rounded-md text-sm font-medium text-yellow-600 dark:text-yellow-400 transition-all">
                  Nudge User
                </button>
                <button className="px-4 py-1.5 bg-card hover:bg-muted border border-border rounded-md text-sm font-medium text-card-foreground transition-all">
                  Make Available
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          No other stale issues detected in this repository.
        </div>
      </div>
    </div>
  );
};
