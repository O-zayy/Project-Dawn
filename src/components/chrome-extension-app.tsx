import React, { useState, useEffect } from 'react';
import { FloatingSidebar } from './floating-sidebar';
import { OnboardingFlow } from './onboarding-flow';
import { OSSDiscovery } from './tools/oss-discovery';
import { MaintainerDashboard } from './tools/maintainer-dashboard';
import { MilestoneCelebrations } from './tools/milestone-celebrations';
import { CookieLickingDetector } from './tools/cookie-licking-detector';
import { MentorshipPlatform } from './tools/mentorship-platform';
import { ReactNativeViewer } from './tools/react-native-viewer';

export const ChromeExtensionApp: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const storedProfile = localStorage.getItem('oss-power-tools-profile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = (profile: any) => {
    setUserProfile(profile);
    localStorage.setItem('oss-power-tools-profile', JSON.stringify(profile));
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="oss-power-tools-extension">
      <FloatingSidebar
        selectedTool={selectedTool}
        onSelectTool={setSelectedTool}
        userProfile={userProfile}
      />
      
      {selectedTool === 'discovery' && <OSSDiscovery userProfile={userProfile} />}
      {selectedTool === 'dashboard' && <MaintainerDashboard userProfile={userProfile} />}
      {selectedTool === 'milestones' && <MilestoneCelebrations userProfile={userProfile} />}
      {selectedTool === 'cookie-licking' && <CookieLickingDetector userProfile={userProfile} />}
      {selectedTool === 'mentorship' && <MentorshipPlatform userProfile={userProfile} />}
      {selectedTool === 'react-native' && <ReactNativeViewer userProfile={userProfile} />}
    </div>
  );
};
