import React from 'react';
import { User, Mail, Code, Award, GitBranch, Edit, Trash2 } from 'lucide-react';

interface UserProfileViewerProps {
  userProfile: any;
  onClose: () => void;
}

export const UserProfileViewer: React.FC<UserProfileViewerProps> = ({ userProfile, onClose }) => {
  const handleReset = () => {
    if (confirm('Are you sure you want to reset your profile? This will restart the onboarding process.')) {
      localStorage.removeItem('oss-power-tools-profile');
      window.location.reload();
    }
  };

  const handleEdit = () => {
    localStorage.removeItem('oss-power-tools-profile');
    window.location.reload();
  };

  if (!userProfile) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No profile data available
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Your Profile
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-card-foreground transition-colors"
            title="Edit Profile"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
            title="Reset Profile"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Role & Experience */}
      <div className="space-y-3">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Role</div>
          <div className="text-base font-medium text-card-foreground capitalize">
            {userProfile.role} • {userProfile.experienceLevel}
          </div>
        </div>

        {/* Languages */}
        {userProfile.languages && userProfile.languages.length > 0 && (
          <div>
            <div className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
              <Code className="w-4 h-4 text-primary" />
              Programming Languages
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.languages.map((lang: string) => (
                <span
                  key={lang}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Specialties */}
        {userProfile.specialties && userProfile.specialties.length > 0 && (
          <div>
            <div className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.specialties.map((specialty: string) => (
                <span
                  key={specialty}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs border border-border"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contribution Types */}
        {userProfile.contributionTypes && userProfile.contributionTypes.length > 0 && (
          <div>
            <div className="text-sm font-medium text-card-foreground mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-primary" />
              Preferred Contributions
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.contributionTypes.map((type: string) => (
                <span
                  key={type}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-xs border border-border"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Token Status */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">GitHub Token</div>
          <div className="text-base font-medium text-card-foreground">
            {userProfile.githubToken ? '✓ Configured' : '⚠ Not configured'}
          </div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground pt-4 border-t border-border">
        Profile created: {new Date(userProfile.completedAt).toLocaleDateString()}
      </div>
    </div>
  );
};
