import { useState } from 'react';
import { BsGithub, BsSpotify, BsLinkedin, BsFilePdf } from 'react-icons/bs';
import { IoIosMail, IoIosCall } from 'react-icons/io';
import { RiTerminalFill } from 'react-icons/ri';
import SpotifyPlayer from './SpotifyPlayer';
import ResumeViewer from './ResumeViewer';
import { userConfig } from '../../config';

interface MobileDockProps {
  onNotesClick: () => void;
  onResumeClick?: () => void; // opcional si quieres usar el visor interno
  onTerminalClick: () => void;
}

export default function MobileDock({
  onNotesClick,
  onTerminalClick,
}: MobileDockProps) {
  const [showSpotify, setShowSpotify] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const handleEmailClick = () => {
    window.location.href = `mailto:${userConfig.contact.email}`;
  };

  const handleSpotifyClick = () => {
    setShowSpotify(true);
  };

  const handleCloseSpotify = () => {
    setShowSpotify(false);
  };

  const handleResumeClick = () => {
    setShowResume(true);
  };

  const handleCloseResume = () => {
    setShowResume(false);
  };

  return (
    <>
      {/* Dock mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full flex flex-col items-center gap-3 py-4 bg-black/80 backdrop-blur-xl border-t border-white/10">

        {/* Fila superior */}
        <div className="flex justify-center gap-4">
          <DockButton
            as="a"
            href={userConfig.social.github}
            target="_blank"
            bg="bg-black"
          >
            <BsGithub size={32} />
          </DockButton>

          <DockButton onClick={handleResumeClick} bg="bg-gradient-to-t from-red-600 to-red-400">
            <BsFilePdf size={32} />
          </DockButton>

          <DockButton onClick={onTerminalClick} bg="bg-black">
            <RiTerminalFill size={32} />
          </DockButton>
        </div>

        {/* Fila inferior */}
        <div className="flex justify-center gap-4">
          <DockButton
            as="a"
            href={`tel:${userConfig.contact.phone}`}
            bg="bg-gradient-to-t from-green-600 to-green-400"
          >
            <IoIosCall size={32} />
          </DockButton>

          <DockButton
            onClick={handleEmailClick}
            bg="bg-gradient-to-t from-blue-600 to-blue-400"
          >
            <IoIosMail size={32} />
          </DockButton>

          <DockButton
            as="a"
            href={userConfig.social.linkedin}
            target="_blank"
            bg="bg-[#0a66c2]"
          >
            <BsLinkedin size={30} />
          </DockButton>

          {/* Spotify ahora abre la app interna */}
          <DockButton
            onClick={handleSpotifyClick}
            bg="bg-black"
          >
            <BsSpotify size={32} className="text-[#1ED760]" />
          </DockButton>
        </div>
      </div>

      {/* Ventanas internas reutilizadas */}
      <SpotifyPlayer isOpen={showSpotify} onClose={handleCloseSpotify} />
      <ResumeViewer isOpen={showResume} onClose={handleCloseResume} />
    </>
  );
}

/* Botón reutilizable */
function DockButton({
  children,
  onClick,
  as,
  href,
  target,
  bg,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  as?: 'a';
  href?: string;
  target?: string;
  bg: string;
}) {
  const className =
    `w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${bg} text-white active:scale-95 transition-transform`;

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
