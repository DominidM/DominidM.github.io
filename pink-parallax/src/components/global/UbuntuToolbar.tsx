import { useState, useEffect, useRef } from 'react';
import { MdWifi } from 'react-icons/md';
import { FaLinux, FaGithub, FaLinkedin, FaEnvelope, FaWindowRestore } from 'react-icons/fa';
import {
  IoSearchSharp,
  IoBatteryHalfOutline,
  IoCellular,
  IoDocumentText,
  IoCodeSlash,
  IoMail,
  IoCall,
  IoHelpCircle,
} from 'react-icons/io5';
import { VscVscode } from 'react-icons/vsc';
import { userConfig } from '../../config/index';

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  submenu?: MenuItem[];
};

interface UbuntuToolbarProps {
  onShowTutorial?: () => void;
  onOpenSpotlight?: () => void;
  onOpenMissionControl?: () => void;
  onOpenContact?: () => void;
  onToggleShortcuts?: () => void;
  onCloseAllWindows?: () => void;
  onShuffleBackground?: () => void;
  onOpenAdmin?: () => void;
}

export default function UbuntuToolbar({
  onShowTutorial,
  onOpenSpotlight,
  onOpenMissionControl,
  onOpenContact,
  onToggleShortcuts,
  onCloseAllWindows,
  onShuffleBackground,
  onOpenAdmin,
}: UbuntuToolbarProps) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatUbuntuDate = (date: Date) => {
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${weekday} ${month} ${day}, ${hour}:${minute}`;
  };

  const formatMobileTime = (date: Date) => {
    let hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minute}`;
  };

  const handleVSCodeClick = () => {
    window.location.href = 'vscode:/';
  };

  const handleMenuClick = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleAction = (action?: () => void) => {
    if (action) {
      action();
      setActiveMenu(null);
    }
  };

  const menus: Record<string, MenuItem[]> = {
    File: [
      {
        label: 'Resume (PDF)',
        icon: <IoDocumentText size={16} />,
        action: () => window.open(userConfig.resume.url, '_blank'),
      },
      {
        label: 'Projects (GitHub)',
        icon: <IoCodeSlash size={16} />,
        action: () => window.open(userConfig.social.github, '_blank'),
      },
      {
        label: 'Admin Dashboard',
        icon: <FaWindowRestore size={16} />,
        action: () => onOpenAdmin ? onOpenAdmin() : (window.location.href = '/admin'),
      },
    ],
    View: [
      {
        label: 'Search…',
        icon: <IoSearchSharp size={16} />,
        action: () => onOpenSpotlight?.(),
      },
      {
        label: 'Workspaces',
        icon: <FaWindowRestore size={16} />,
        action: () => onOpenMissionControl?.(),
      },
      {
        label: 'Shortcuts',
        icon: <IoHelpCircle size={16} />,
        action: () => onToggleShortcuts?.(),
      },
      {
        label: 'Reset Tutorial',
        icon: <IoHelpCircle size={16} />,
        action: () => onShowTutorial?.(),
      },
    ],
    Window: [
      {
        label: 'Contact…',
        icon: <IoMail size={16} />,
        action: () => onOpenContact?.(),
      },
      {
        label: 'Close All Windows',
        icon: <IoDocumentText size={16} />,
        action: () => onCloseAllWindows?.(),
      },
      {
        label: 'Shuffle Background',
        icon: <IoDocumentText size={16} />,
        action: () => onShuffleBackground?.(),
      },
    ],
    Go: [
      {
        label: 'GitHub',
        icon: <FaGithub size={16} />,
        action: () => window.open(userConfig.social.github, '_blank'),
      },
      {
        label: 'LinkedIn',
        icon: <FaLinkedin size={16} />,
        action: () => window.open(userConfig.social.linkedin, '_blank'),
      },
      {
        label: 'Email',
        icon: <FaEnvelope size={16} />,
        action: () => window.open(`mailto:${userConfig.contact.email}`),
      },
    ],
    Edit: [
      {
        label: 'Copy Email',
        icon: <IoMail size={16} />,
        action: () => {
          navigator.clipboard.writeText(userConfig.contact.email);
          alert('Email copied to clipboard!');
        },
      },
      {
        label: 'Copy Phone',
        icon: <IoCall size={16} />,
        action: () => {
          navigator.clipboard.writeText(userConfig.contact.phone);
          alert('Phone number copied to clipboard!');
        },
      },
    ],
    Help: [
      {
        label: 'Keyboard Shortcuts',
        icon: <IoHelpCircle size={16} />,
        action: () => onToggleShortcuts?.(),
      },
    ],
  };

  const renderMenu = (menuItems: MenuItem[]) => (
    <div className="absolute top-full left-0 mt-1 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-1 min-w-[200px]" role="menu">
      {menuItems.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => handleAction(item.action)}
            role="menuitem"
            className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700/50 flex items-center gap-2"
          >
            {item.icon}
            {item.label}
          </button>
          {item.submenu && (
            <div className="absolute left-full top-0 ml-1 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl py-1 min-w-[200px]" role="menu">
              {item.submenu.map((subItem, subIndex) => (
                <button
                  key={subIndex}
                  onClick={() => handleAction(subItem.action)}
                  role="menuitem"
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700/50 flex items-center gap-2"
                >
                  {subItem.icon}
                  {subItem.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div className='sticky top-0 z-50 md:hidden bg-gray-900/95 text-white h-11 px-4 flex items-center justify-between text-sm font-medium border-b border-gray-700/50'>
        <span className='font-semibold text-gray-300'>{formatMobileTime(currentDateTime)}</span>
        <div className='flex items-center gap-2'>
          <IoCellular size={18} />
          <MdWifi size={18} />
          <IoBatteryHalfOutline size={20} />
        </div>
      </div>

      <div className='sticky top-0 z-50 hidden md:flex bg-gray-800/30 backdrop-blur-md text-white h-7 px-4 items-center justify-between text-sm border-b border-white/5' role="menubar" aria-label="Application menu bar">
        <div className='flex items-center space-x-4' ref={menuRef}>
          <FaLinux size={16} className="text-orange-400" />
          <div className="relative">
            <span 
              className='font-semibold hover:text-gray-300 transition-colors cursor-pointer'
              onMouseEnter={() => setShowSignature(true)}
              onMouseLeave={() => setShowSignature(false)}
            >
              {userConfig.name}
            </span>
            {showSignature && (
              <div className="absolute top-full left-0 mt-1 bg-white/98 backdrop-blur-sm rounded-lg p-4 shadow-xl z-[100]">
                  <img 
                    src="/src/assets/images/me.svg" 
                    alt="Signature" 
                    className="w-[100px] h-[100px]"
                  />
              </div>
            )}
          </div>
          {Object.entries(menus).map(([menu, items]) => (
            <div key={menu} className="relative">
              <button 
                className='cursor-pointer hover:text-gray-300 transition-colors text-gray-200'
                onClick={() => handleMenuClick(menu)}
                aria-haspopup="menu"
                aria-expanded={activeMenu === menu}
                aria-controls={`menu-${menu}`}
                role="menuitem"
              >
                {menu}
              </button>
              {activeMenu === menu && (
                <div id={`menu-${menu}`}>
                  {renderMenu(items)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center space-x-4'>
          <IoSearchSharp
            size={15}
            className='cursor-pointer hover:opacity-80 transition-opacity'
            onClick={() => onOpenSpotlight?.()}
            title='Search (Ctrl/Cmd+K)'
            role='button'
            aria-label='Open search'
          />
          <span className='cursor-default text-gray-300 text-xs'>
            {formatUbuntuDate(currentDateTime)}
          </span>
        </div>
      </div>
    </>
  );
}
