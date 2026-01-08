/**
 * Application configuration (Spotify, Resume, etc.)
 */

import type { SpotifyConfig, ResumeConfig } from '../types';

export const spotify: SpotifyConfig = {
  playlistId: '5WsS94KKm5wDhgEpg8VcgM',
  playlistName: 'Coding-Time',
};

export const resume: ResumeConfig = {
  url: 'https://drive.google.com/file/d/1xoDhX6-UbPsFlW1ZbUAdIXchbysyy9ll/view?usp=sharing',
  localPath: '/resume.pdf',
};
