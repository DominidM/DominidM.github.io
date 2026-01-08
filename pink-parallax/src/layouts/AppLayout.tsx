import { useEffect, useReducer, useState } from 'react';
import Spotlight from '../components/global/Spotlight';
import MacToolbar from '../components/global/MacToolbar';
import MacTerminal from '../components/global/MacTerminal';
import MobileDock from '../components/global/MobileDock';
import DesktopDock from '../components/global/DesktopDock';
import ResumeViewer from '../components/global/ResumeViewer';
import ShortcutsOverlay from '../components/global/ShortcutsOverlay';
import MissionControl from '../components/global/MissionControl';
import ContactWidget from '../components/global/ContactWidget';
import WelcomeTour from '../components/global/WelcomeTour';

interface AppLayoutProps {
  initialBg: string;
  backgroundMap: Record<string, string>;
}

type TutorialStep = {
  title:  string;
  content: string;
  action?: () => void;
  buttonText?: string;
};

export default function Desktop({ initialBg, backgroundMap }: AppLayoutProps) {
  const [currentBg, setCurrentBg] = useState<string>(initialBg);
  type App = 'terminal' | 'notes' | 'github' | 'resume' | 'spotify';
  type State = { windows: Record<App, boolean> };
  type Action = { type: 'OPEN' | 'CLOSE' | 'TOGGLE'; app: App } | { type: 'CLOSE_ALL' };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'OPEN':
        return { windows: { ...state.windows, [action. app]: true } };
      case 'CLOSE':
        return { windows: { ...state.windows, [action.app]: false } };
      case 'TOGGLE':
        return { windows: { ...state.windows, [action. app]: !state.windows[action.app] } };
      case 'CLOSE_ALL': 
        return { windows: { terminal:  false, notes: false, github:  false, resume: false, spotify:  false } };
      default: 
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    windows: { terminal: false, notes: false, github: false, resume: false, spotify: false },
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isMissionControlOpen, setIsMissionControlOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

  const activeApps = state.windows;

  useEffect(() => {
    const lastBg = localStorage.getItem('lastBackground');
    const hasCompletedTutorial = localStorage.getItem('hasCompletedTutorial') === 'true';

    if (lastBg === initialBg) {
      const bgKeys = Object.keys(backgroundMap);
      const availableBgs = bgKeys.filter((bg) => bg !== lastBg);
      const newBg =
        availableBgs[Math.floor(Math.random() * availableBgs.length)];
      setCurrentBg(newBg);
    }

    if (!hasCompletedTutorial) {
      setShowTutorial(true);
    }

    localStorage.setItem('lastBackground', currentBg);
  }, [initialBg, backgroundMap]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform. toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (cmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsSpotlightOpen(true);
      } else if (e.key === '?' || (e.key === '/' && e.shiftKey) || (cmdOrCtrl && (e.key === 'h' || e.key === 'H'))) {
        e.preventDefault();
        setShowShortcuts((s) => !s);
      } else if ((cmdOrCtrl && e.key === 'ArrowUp') || e.key === 'F3' || (cmdOrCtrl && (e.key === 'm' || e.key === 'M'))) {
        e.preventDefault();
        setIsMissionControlOpen((m) => !m);
      } else if (cmdOrCtrl && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        setIsContactOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const resetTutorial = () => {
    setShowTutorial(true);
    localStorage.setItem('hasCompletedTutorial', 'false');
  };


  const closeAllWindows = () => dispatch({ type: 'CLOSE_ALL' });
  const shuffleBackground = () => {
    const bgKeys = Object.keys(backgroundMap);
    const availableBgs = bgKeys.filter((bg) => bg !== currentBg);
    const newBg = availableBgs[Math.floor(Math.random() * availableBgs.length)];
    setCurrentBg(newBg);
    localStorage.setItem('lastBackground', newBg);
  };

  const openProjectById = (id: string) => {
    setSelectedProjectId(id);
    handleAppOpen('github');
  };

  const handleAppOpen = (app: App) => dispatch({ type: 'OPEN', app });
  const handleAppClose = (app: App) => dispatch({ type: 'CLOSE', app });

  return (
    <div className='relative w-screen h-screen overflow-hidden flex flex-col'>
      {/* Background */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${backgroundMap[currentBg]})` }}
      />

      {/* Toolbar */}
      <div className='relative z-10'>
        <MacToolbar 
          onShowTutorial={resetTutorial}
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          onOpenMissionControl={() => setIsMissionControlOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
          onToggleShortcuts={() => setShowShortcuts((s) => !s)}
          onCloseAllWindows={closeAllWindows}
          onShuffleBackground={shuffleBackground}
          onOpenAdmin={() => { window.location.href = '/admin'; }}
        />
      </div>

      {/* Main content area - con flex-1 para que ocupe el espacio disponible */}
      <div className='relative z-0 flex-1 flex items-center justify-center overflow-hidden'>
        {/* Aquí va el contenido principal */}
      </div>

      {/* Dock móvil - FUERA del área de scroll */}
      <div className='relative z-20'>
        <MobileDock
          onNotesClick={() => handleAppOpen('notes')}
          onResumeClick={() => handleAppOpen('resume')}
          onTerminalClick={() => handleAppOpen('terminal')}
        />
      </div>

      {/* Desktop Dock */}
      <DesktopDock
        onTerminalClick={() => handleAppOpen('terminal')}
        onNotesClick={() => handleAppOpen('notes')}
        onGitHubClick={() => handleAppOpen('github')}
        onContactClick={() => setIsContactOpen(true)}
        activeApps={activeApps}
      />

      {/* Apps/Windows */}

      <ResumeViewer 
        isOpen={state.windows. resume} 
        onClose={() => handleAppClose('resume')} 
      />
      <MacTerminal 
        isOpen={state.windows.terminal} 
        onClose={() => handleAppClose('terminal')} 
      />

      {/* Overlays */}
      <Spotlight
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        actions={{
          openTerminal: () => handleAppOpen('terminal'),
          openNotes: () => handleAppOpen('notes'),
          openContact: () => setIsContactOpen(true),
          openNotesSection: (section) => {
            handleAppOpen('notes');
          },
          openGitHub: () => handleAppOpen('github'),
          openResume: () => handleAppOpen('resume'),
          showTutorial: resetTutorial,
          closeAllWindows,
          shuffleBackground,
          openProjectById,
        }}
      />
      <WelcomeTour
        open={showTutorial}
        onClose={() => { 
          setShowTutorial(false); 
          localStorage.setItem('hasCompletedTutorial', 'true'); 
        }}
        actions={{
          openSpotlight: () => setIsSpotlightOpen(true),
          openMissionControl:  () => setIsMissionControlOpen(true),
          openNotes: () => handleAppOpen('notes'),
          openGitHub:  () => handleAppOpen('github'),
          openContact: () => setIsContactOpen(true),
          closeAll: closeAllWindows,
        }}
      />
      <ShortcutsOverlay open={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <ContactWidget open={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MissionControl
        isOpen={isMissionControlOpen}
        onClose={() => setIsMissionControlOpen(false)}
        activeApps={activeApps}
        onAppClick={(app) => handleAppOpen(app)}
        onAppClose={(app) => handleAppClose(app)}
      />
    </div>
  );
}