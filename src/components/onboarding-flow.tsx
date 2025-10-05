import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: (profile: any) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    role: '',
    experienceLevel: '',
    languages: [] as string[],
    specialties: [] as string[],
    contributionTypes: [] as string[],
    githubToken: '',
  });

  const languages = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Go',
    'Rust', 'PHP', 'Swift', 'Kotlin', 'Dart', 'Scala', 'R', 'Shell', 'HTML/CSS'
  ];

  const specialties = [
    'Frontend Development', 'Backend Development', 'Full Stack', 'Mobile Development',
    'DevOps', 'Machine Learning', 'Data Science', 'Security', 'Cloud Architecture'
  ];

  const contributionTypes = [
    'Bug Fixes', 'New Features', 'Documentation', 'Testing', 'Code Review',
    'Design', 'Translation', 'Community Management'
  ];

  const handleComplete = () => {
    onComplete({
      ...profile,
      completedAt: new Date().toISOString(),
    });
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-[10001] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary/10 border-b border-border px-6 py-4">
          <h2 className="text-2xl font-bold text-card-foreground">Welcome to OSS Power Tools</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Let's personalize your experience (Step {currentStep} of 5)
          </p>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">What brings you here?</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setProfile({ ...profile, role: 'mentor' })}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    profile.role === 'mentor'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-2">🎓</div>
                  <div className="font-semibold text-card-foreground">I'm a Mentor</div>
                  <div className="text-sm text-muted-foreground mt-1">Help others contribute to OSS</div>
                </button>
                <button
                  onClick={() => setProfile({ ...profile, role: 'learning' })}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    profile.role === 'learning'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-2">🚀</div>
                  <div className="font-semibold text-card-foreground">I'm Learning</div>
                  <div className="text-sm text-muted-foreground mt-1">Start my OSS journey</div>
                </button>
              </div>

              {profile.role && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-card-foreground mb-3">Experience Level</h4>
                  <div className="flex gap-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setProfile({ ...profile, experienceLevel: level })}
                        className={`flex-1 py-2 px-3 rounded-md border transition-all text-sm ${
                          profile.experienceLevel === level
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Languages */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">
                Which programming languages do you know?
              </h3>
              <p className="text-sm text-muted-foreground">Select all that apply</p>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() =>
                      setProfile({ ...profile, languages: toggleArrayItem(profile.languages, lang) })
                    }
                    className={`py-2 px-3 rounded-md border transition-all text-sm ${
                      profile.languages.includes(lang)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-card-foreground hover:border-primary/50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Specialties */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">What are your specialties?</h3>
              <p className="text-sm text-muted-foreground">Select your areas of expertise</p>
              <div className="grid grid-cols-2 gap-3">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() =>
                      setProfile({ ...profile, specialties: toggleArrayItem(profile.specialties, specialty) })
                    }
                    className={`py-3 px-4 rounded-md border transition-all text-sm text-left ${
                      profile.specialties.includes(specialty)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-card-foreground hover:border-primary/50'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contribution Types */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">
                How would you like to contribute?
              </h3>
              <p className="text-sm text-muted-foreground">Select your preferred contribution types</p>
              <div className="grid grid-cols-2 gap-3">
                {contributionTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setProfile({
                        ...profile,
                        contributionTypes: toggleArrayItem(profile.contributionTypes, type),
                      })
                    }
                    className={`py-3 px-4 rounded-md border transition-all text-sm text-left ${
                      profile.contributionTypes.includes(type)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-card-foreground hover:border-primary/50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: GitHub Token */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-card-foreground">GitHub Personal Access Token</h3>
              <p className="text-sm text-muted-foreground">
                Optional: Provide a token for enhanced features and higher API rate limits
              </p>
              <div className="bg-muted/50 border border-border rounded-lg p-4 text-sm space-y-2">
                <div className="font-medium text-card-foreground">🔒 Your token is safe</div>
                <ul className="text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Stored locally in your browser</li>
                  <li>Never transmitted to external servers</li>
                  <li>Only used for GitHub API requests</li>
                </ul>
              </div>
              <input
                type="password"
                value={profile.githubToken}
                onChange={(e) => setProfile({ ...profile, githubToken: e.target.value })}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx (optional)"
                className="w-full px-4 py-2 bg-background border border-border rounded-md text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <a
                href="https://github.com/settings/tokens/new"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-block"
              >
                Create a new token on GitHub →
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/30">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-border text-card-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && !profile.role) ||
                (currentStep === 2 && profile.languages.length === 0)
              }
              className="flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Complete Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
