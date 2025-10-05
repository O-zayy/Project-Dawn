import React, { useState, useCallback, useEffect } from 'react';
import { Briefcase, Search, BarChart, Award, AlertTriangle, Users, Code, X, User } from 'lucide-react';
import { UserProfileViewer } from './user-profile-viewer';

interface FloatingSidebarProps {
  selectedTool: string | null;
  onSelectTool: (tool: string | null) => void;
  userProfile: any;
}

const tools = [
  { id: 'discovery', icon: Search, label: 'OSS Discovery', tooltip: 'Find open source projects' },
  { id: 'dashboard', icon: BarChart, label: 'Maintainer Dashboard', tooltip: 'Track your contributions' },
  { id: 'milestones', icon: Award, label: 'Milestone Celebrations', tooltip: 'Celebrate achievements' },
  { id: 'cookie-licking', icon: AlertTriangle, label: 'Cookie Licking Detector', tooltip: 'Detect stale issues' },
  { id: 'mentorship', icon: Users, label: 'Mentorship Platform', tooltip: 'Connect with mentors' },
  { id: 'react-native', icon: Code, label: 'React Native Viewer', tooltip: 'Open in Expo Snack' },
];

export const FloatingSidebar: React.FC<FloatingSidebarProps> = ({ selectedTool, onSelectTool, userProfile }) => {
  const [position, setPosition] = useState({ 
    top: window.innerHeight - 600, 
    left: window.innerWidth - 420 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showProfile, setShowProfile] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true);
      // Store the offset between mouse position and sidebar top-left corner
      setDragOffset({
        x: e.clientX - position.left,
        y: e.clientY - position.top
      });
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        
        // Calculate new position: mouse position minus the initial offset
        const newLeft = e.clientX - dragOffset.x;
        const newTop = e.clientY - dragOffset.y;

        // Constrain to viewport with padding
        const sidebarWidth = 400; // approximate sidebar width
        const sidebarHeight = 80; // minimum visible height
        
        const maxLeft = window.innerWidth - sidebarWidth;
        const maxTop = window.innerHeight - sidebarHeight;
        
        const constrainedLeft = Math.max(10, Math.min(newLeft, maxLeft));
        const constrainedTop = Math.max(10, Math.min(newTop, maxTop));

        setPosition({ top: constrainedTop, left: constrainedLeft });
      }
    },
    [isDragging, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Add cursor style to body
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="fixed bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-[10000]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '400px',
        maxHeight: '600px',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Drag Handle */}
      <div className="drag-handle flex items-center justify-between bg-muted/50 border-b border-border px-3 py-2 cursor-grab hover:bg-muted active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-muted-foreground/40 rounded-full" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-card-foreground">OSS Power Tools</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile);
              if (!showProfile) onSelectTool(null);
            }}
            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
            title="View Profile"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectTool(null);
              setShowProfile(false);
            }}
            className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="overflow-y-auto" style={{ maxHeight: '550px' }}>
        {showProfile ? (
          <UserProfileViewer userProfile={userProfile} onClose={() => setShowProfile(false)} />
        ) : (
          <div className="p-4 space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <button
                  key={tool.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTool(isSelected ? null : tool.id);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-md border transition-all ${
                    isSelected
                      ? 'bg-primary/10 border-primary text-primary shadow-sm'
                      : 'bg-card border-border text-card-foreground hover:bg-muted hover:border-muted-foreground/20'
                  }`}
                  title={tool.tooltip}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">{tool.label}</div>
                    <div className={`text-xs ${isSelected ? 'text-primary/70' : 'text-muted-foreground'}`}>
                      {tool.tooltip}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
