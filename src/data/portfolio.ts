export type Category = 'All Categories' | 'Full Album' | 'Mixing' | 'Production' | 'Underdub' | 'Mastering';

export interface PortfolioItem {
  id: number;
  category: Exclude<Category, 'All Categories'>;
  year: number;
  title: string;
  artist: string;
  description: string;
  audioUrl?: string;
  image: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    category: 'Full Album',
    year: 2024,
    title: 'Midnight Dreams',
    artist: 'Jay West',
    description: 'Full album production featuring 12 tracks of melodic trap and R&B fusion.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80'
  },
  {
    id: 2,
    category: 'Mixing',
    year: 2024,
    title: 'Summer Anthem',
    artist: 'Lisa Ray',
    description: 'Chart-topping pop single mixed and mastered to perfection.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=600&q=80'
  },
  {
    id: 3,
    category: 'Production',
    year: 2024,
    title: 'Neon Nights',
    artist: 'The Weekend Thieves',
    description: 'Dark hip hop production with atmospheric synths and heavy bass.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80'
  },
  {
    id: 4,
    category: 'Underdub',
    year: 2023,
    title: 'Street Chronicles',
    artist: 'MC Baron',
    description: 'Hard-hitting hip hop EP with custom production on all 6 tracks.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80'
  },
  {
    id: 5,
    category: 'Mastering',
    year: 2023,
    title: 'Rise Up',
    artist: 'Mystical Crew',
    description: 'Mastering for motivational rap album with crystal clear vocals.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80'
  },
];
