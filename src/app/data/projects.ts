export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    credit?: string;
    fullDescription?: string;
    additionalImages?: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: 'BMW Exterior Detailing',
      description: 'Full exterior detailing of a BMW iX',
      image: '/work/bmw.jpg',
      fullDescription: 'Full exterior clean of this beautiful BMW iX including clay bar treatment and polish to bring back a deep shine.',
      additionalImages: []
    },
    {
      id: 2,
      title: 'Ceramic Coating',
      description: '7 year ceramic coating',
      image: '/work/ceramic.jpg',
      fullDescription: '7 year ceramic coating, full exterior clean and paint preparation. Followed by application of a 7 year ceramic coating.',
      additionalImages: []
    }
  ];