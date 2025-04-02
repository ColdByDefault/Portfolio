import React from 'react';
import Image from 'next/image';

interface Certification {
  id: number;
  title: string;
  image: string;
  issuer: string;
  description: string;
  date: string;
}

const CertificationShowcase = () => {
  const certifications: Certification[] = [
    {
      id: 1,
      title: 'Python PCEP',
      image: '/assets/cer1.png',
      issuer: 'Python Institute',
      description: 'Earned the PCEP (Python Certified Entry-Level Programmer) certification, demonstrating foundational knowledge of Python programming.',
      date: '2024',
    },
    {
      id: 2,
      title: 'Udemy Python Bootcamp',
      image: '/assets/cer2.png',
      issuer: 'Udemy',
      description: 'Completed the "100 Days of Code - The Complete Python Pro Bootcamp," mastering Python from beginner to advanced levels.',
      date: '2024',
    },
    {
      id: 3,
      title: 'Meta Frontend Development',
      image: '/assets/cer3.png',
      issuer: 'Meta (via Coursera)',
      description: 'Completed the "Introduction to Frontend Development" course, gaining foundational skills in HTML, CSS.',
      date: '2022',
    },
    {
      id: 4,
      title: "Udemy HTML and CSS for Beginners - Build a Website & Launch Online",
      image: "/assets/htmlC.png",
      issuer: "Udemy",
      description: "Completed the course, learning the fundamentals of HTML and CSS to build and deploy a website.",
      date: "2025"
    },
    {
      id: 5,
      title: "The Git & GitHub Bootcamp",
      image: "/assets/githubC.png",
      issuer: "Udemy",
      description: "Completed a comprehensive Git and GitHub course, covering version control, branching, and collaboration workflows.",
      date: "2025"
    },
    {
      id: 6,
      title: "Full-Stack Web-Development",
      image: "/assets/nodecer.jpg",
      issuer: "Udemy",
      description: "Frontend and Backend Web Development course, covering HTML, CSS, JavaScript, Node.js, and React.",
      date: "2025"
    }    
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl text-center mb-8">
          My Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-40">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 grid shadow-md overflow-hidden relative grid-rows-2 gap-2">
              <div className="row-span-1 flex w-full justify-center items-center pt-2">
                <Image 
                  src={cert.image} 
                  alt={cert.title}
                  width={300}
                  height={280} 
                  className="object-cover" 
                  priority={cert.id <= 3} // Only prioritize first 3 images
                />
              </div>
              <div className="row-span-1 p-4">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-200 mb-1">Issued by: {cert.issuer}</p>
                <p className="text-sm text-gray-300">Date: {cert.date}</p>
                <p className="text-sm text-gray-400">{cert.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationShowcase;