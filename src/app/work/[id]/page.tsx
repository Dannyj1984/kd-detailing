import { projects } from '@/app/data/projects';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function WorkDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.id === parseInt(resolvedParams.id));

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="relative h-[400px] w-full mb-8">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
        
        <div className="prose max-w-none">
          <p className="text-xl text-gray-600 mb-8">{project.fullDescription}</p>
        </div>

        {project.additionalImages && project.additionalImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.additionalImages.map((image, index) => (
                <div key={index} className="relative h-[300px]">
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}