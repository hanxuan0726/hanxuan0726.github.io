/** All public profile content lives here. Replace bracketed placeholders before publishing. */
export interface ResourceLink { label: string; url: string | null; placeholder?: string }
export interface Project {
  id: string; title: string; category: string; status: string;
  description: string; tags: string[]; image: string; imageAlt: string;
  imageIsPlaceholder: boolean; links: ResourceLink[];
}
export interface Publication {
  title: string; authors: string[]; venue: string; year: number;
  links: ResourceLink[];
}
export const site = {
  name: 'Hanxuan Zhou',
  chineseName: '周瀚轩',
  role: "Master's Student",
  university: 'East China Normal University',
  universityShort: 'ECNU',
  // Replace with the confirmed official English name when available.
  school: '滴水湖国际软件学院',
  location: 'Shanghai, China',
  email: '51295902169@stu.ecnu.edu.cn',
  githubUsername: 'hanxuan0726',
  portrait: '/images/portrait-placeholder.svg',
  portraitAlt: 'Portrait placeholder for Hanxuan Zhou; personal photo not yet provided.',
  portraitIsPlaceholder: true,
  cv: null as string | null, // e.g. '/files/hanxuan-zhou-cv.pdf' after adding the real PDF
  lastUpdated: '2026-10-31', // Deliberately explicit: change when updating public content.
  title: 'Hanxuan Zhou | Embodied AI & Robot Learning',
  description: "Hanxuan Zhou (周瀚轩), a master's student at East China Normal University, interested in Embodied AI, Vision-Language-Action Models, World Models, and Robot Learning.",
  introduction: 'I am interested in how embodied agents perceive, reason, and act in the physical world, with a focus on learning useful behavior from multimodal observations.',
  about: [
    "I am a master's student at East China Normal University in Shanghai, China. My research interests lie at the intersection of embodied intelligence and robot learning.",
    'I am particularly interested in vision-language-action models and world models: how visual observations and language can inform actions, and how predictive models might support planning. Through hands-on robotics projects, I am exploring the path from data collection and policy training to deployment on real hardware.',
  ],
  interests: [
    { title: 'Embodied AI', subtitle: 'Intelligence through interaction', description: 'Connecting perception, reasoning, and action in agents that interact with the physical world.' },
    { title: 'Vision-Language-Action Models', subtitle: 'From understanding to action', description: 'Learning to connect visual observations and language instructions with grounded robot behavior.' },
    { title: 'World Models', subtitle: 'Learning to anticipate', description: 'Exploring predictive representations of environments to support planning and decision-making.' },
    { title: 'Robot Learning', subtitle: 'From demonstrations to deployment', description: 'Studying imitation learning and the practical challenges of moving learned policies onto real robots.' },
  ],
  projects: [
    {
      id: 'so101-act', title: 'SO-101 Robotic Manipulation with ACT',
      category: 'Real-world manipulation', status: 'Implemented',
      description: 'A real-robot manipulation project using LeRobot, SO-101, and Action Chunking Transformer (ACT). The workflow covers demonstration collection, policy training, and deployment on the physical robot, demonstrating centrifuge tube pick-and-place.',
      tags: ['LeRobot', 'SO-101', 'ACT', 'Imitation Learning'],
      image: '/images/so101-placeholder.svg',
      imageAlt: 'Project image placeholder: schematic of a robot arm and centrifuge tubes, not an actual experiment photo.',
      imageIsPlaceholder: true,
      links: [ { label: 'GitHub', url: null, placeholder: '[PROJECT_REPOSITORY_URL]' }, { label: 'Demo', url: null, placeholder: '[PROJECT_DEMO_URL]' } ],
    },
    {
      id: 'secure-control', title: 'Secure Remote Robotic Control',
      category: 'Robotics infrastructure', status: 'In Progress',
      description: 'Exploring secure communication for distributed robotic control, including image transmission, remote model inference, control-command integrity protection, and authentication.',
      tags: ['Remote Inference', 'Secure Communication', 'Authentication'],
      image: '/images/remote-control-placeholder.svg',
      imageAlt: 'Project image placeholder: schematic connecting a robot, secure communication channel, and remote model.',
      imageIsPlaceholder: true,
      links: [ { label: 'GitHub', url: null, placeholder: '[PROJECT_REPOSITORY_URL]' }, { label: 'Demo', url: null, placeholder: '[PROJECT_DEMO_URL]' } ],
    },
  ] satisfies Project[],
  education: [
    { institution: 'East China Normal University', degree: "Master's Student", school: '滴水湖国际软件学院', start: null as string | null, end: null as string | null, location: 'Shanghai, China' },
  ], // Set dates as YYYY-MM; use 'Present' for a current end date.
  publications: [] as Publication[], // No invented publications. Section appears only when this array is nonempty.
};
