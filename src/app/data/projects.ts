interface Image {
  url: string;
  tag: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image: Image;
    credit?: string;
    fullDescription?: string;
    additionalImages?: Image[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: 'Exterior Detailing',
      description: 'Full exterior detailing of an Audi',
      image: {url: '/work/audi-ext.png', tag: 'After'},
      fullDescription: 'Full exterior clean of this beautiful Audi including clay bar treatment and polish to bring back a deep shine.',
      additionalImages: [],
    },
    {
      id: 2,
      title: 'Exterior Detailing',
      description: 'Full exterior detailing of a Mercedes',
      image: {url: '/work/merc.png', tag: 'After'},
      fullDescription: 'Full exterior clean of this beautiful Mercedes, to restore it to its original beauty.',
      additionalImages: [{tag: 'Before', url: '/work/merc-ext-before.png'}]
    },
    {
      id: 3,
      title: 'Wheel Cleaning',
      description: 'Restoring these wheels to their former glory',
      image: {url: '/work/wheel1.png', tag: 'After'},
      fullDescription: 'Alloy wheels are treated with a professional cleaner, containing no harsh chemicals and we clean using non-abrasive brushes',
      additionalImages: [{tag: 'Before', url: '/work/wheel-1-before.png'}]
    },
    {
      id: 4,
      title: 'Interior Detailing',
      description: 'Full interior detailing.',
      image: {url: '/work/interior-2-after.png', tag: 'After'},
      fullDescription: 'Full interior clean of this beautiful car including wet vacuuming to revitalise the carpets and upholstery.',
      additionalImages: [{tag: 'Before', url: '/work/interior-before.png'}, {tag: 'After', url: '/work/interior-after.png'}]
    }
  ];