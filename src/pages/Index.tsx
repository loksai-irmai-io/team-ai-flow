
import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { DocumentSearch } from '@/components/document-search/DocumentSearch';
import { SampleGenerator } from '@/components/sample-generator/SampleGenerator';
import { MeetingAssistant } from '@/components/meeting-assistant/MeetingAssistant';
import { NFRStrategy } from '@/components/nfr-strategy/NFRStrategy';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // Handle navigation based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    // Set initial section based on URL hash or default to dashboard
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AppLayout>
      {activeSection === 'dashboard' && <Dashboard />}
      {activeSection === 'document-search' && <DocumentSearch />}
      {activeSection === 'sample-generator' && <SampleGenerator />}
      {activeSection === 'meeting-assistant' && <MeetingAssistant />}
      {activeSection === 'nfr-strategy' && <NFRStrategy />}
    </AppLayout>
  );
};

export default Index;
