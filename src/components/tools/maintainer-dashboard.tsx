import React from 'react';
import { BarChart, TrendingUp, GitPullRequest, MessageSquare } from 'lucide-react';

export const MaintainerDashboard: React.FC<{ userProfile: any }> = () => {
  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[800px] max-h-[600px] overflow-y-auto z-[9999] p-6">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-6">
        <BarChart className="w-5 h-5 text-primary" />
        Maintainer Dashboard
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="text-3xl font-bold text-primary mb-2">84</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" />
            PRs Reviewed
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="text-3xl font-bold text-primary mb-2">112</div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Issues Triaged
          </div>
        </div>
        
        <div className="border border-border rounded-lg p-4 bg-muted/30 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-card-foreground">Review Approval Rate</div>
            <div className="text-sm font-bold text-primary">75%</div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
