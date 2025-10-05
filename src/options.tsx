import React from 'react';
import { createRoot } from 'react-dom/client';

const Options: React.FC = () => {
  return <div>Options Page</div>;
};

// Simple script for options.html
function resetProfile() {
  if (confirm('Are you sure you want to reset your profile? You will need to complete onboarding again.')) {
    localStorage.removeItem('oss-power-tools-profile');
    alert('Profile reset successfully. Please refresh any GitHub pages.');
  }
}

// Make function available globally
(window as any).resetProfile = resetProfile;
