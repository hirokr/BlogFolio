import { BrickWallShield, Github, Linkedin } from 'lucide-react';
import { IconType } from '../../types/lucide.types';

export type SocialLink = {
  name: string;
  url: string;
  icon: IconType;
};

export type ExperienceDataProps = {
  company: string;
  position: string;
  description: string;
};

export type skillSetProps = {
  icon: IconType;
  skill: string;
  description: string;
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

export const experienceData: ExperienceDataProps[] = [
  {
    company: 'Google',
    position: 'Interaction Designer',
    description:
      'I currently am the lead designer on the interaction design team for Google Play.',
  },
  {
    company: 'Google',
    position: 'Interaction Designer',
    description:
      'I currently am the lead designer on the interaction design team for Google Play.',
  },
  {
    company: 'Google',
    position: 'Interaction Designer',
    description:
      'I currently am the lead designer on the interaction design team for Google Play.',
  },
];

export const skillSetData: skillSetProps[] = [
  {
    icon: BrickWallShield,
    skill: 'UI/UX Design',
    description:
      'Crafting intuitive and engaging user experiences through thoughtful design principles.',
  },
  {
    icon: BrickWallShield,
    skill: 'UI/UX Design',
    description:
      'Crafting intuitive and engaging user experiences through thoughtful design principles.',
  },
  {
    icon: BrickWallShield,
    skill: 'UI/UX Design',
    description:
      'Crafting intuitive and engaging user experiences through thoughtful design principles.',
  },
  {
    icon: BrickWallShield,
    skill: 'UI/UX Design',
    description:
      'Crafting intuitive and engaging user experiences through thoughtful design principles.',
  },
];
  