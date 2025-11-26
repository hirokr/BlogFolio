import { Github, Linkedin } from 'lucide-react';
import { IconType } from '../../types/lucide.types';

export type SocialLink = {
  name: string;
  url: string;
  icon: IconType;
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: '#', icon: Github },
  { name: 'LinkedIn', url: '#', icon: Linkedin },
];

export const pages: { name: string; url: string }[] = [
  { name: 'Home', url: '#' },
  { name: 'About', url: '#' },
  { name: 'Projects', url: '#' },
  { name: 'Contact', url: '#' },
];
