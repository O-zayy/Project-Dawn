import React from 'react';
import { Smartphone, ExternalLink } from 'lucide-react';

export const ReactNativeViewer: React.FC<{ userProfile: any }> = () => {
  return (
    <div className="fixed top-20 left-20 bg-card border border-border rounded-lg shadow-2xl w-[500px] p-6 z-[9999]">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-4">
        <Smartphone className="w-5 h-5 text-primary" />
        React Native Code Viewer
      </h3>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Open the current React Native file in Expo Snack for instant testing on mobile devices.
        </p>
        
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="text-sm font-medium text-card-foreground mb-2">Current File</div>
          <div className="text-xs text-muted-foreground font-mono">components/App.tsx</div>
        </div>
        
        <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all font-medium flex items-center justify-center gap-2">
          <ExternalLink className="w-4 h-4" />
          Open in Expo Snack
        </button>
        
        <div className="text-xs text-muted-foreground">
          This will open a new tab with your code pre-loaded in Expo Snack, where you can test it on iOS, Android, and web simulators.
        </div>
      </div>
    </div>
  );
};
