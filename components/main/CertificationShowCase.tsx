// CertificationShowcase.js

import React from 'react';
import Image from 'next/image';
import { certifications } from '@/data/certificationsData';

interface Certification {
  id: number;
  title: string;
  image: string;
  issuer: string;
  description: string;
  date: string;
}

const CertificationShowcase = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-gray-200 sm:text-4xl text-center mb-8">
          My Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-40">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-zinc-900/30 backdrop-blur-sm rounded-xl 
            p-6 border border-zinc-800 grid shadow-md overflow-hidden relative gap-2">
              <div className="flex w-full justify-center items-center pt-2">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={300}
                  height={280}
                  className="object-cover"
                  priority={cert.id <= 3}/>
              </div>
              <div className="">
                <h3 className="text-lg font-semibold text-gray-200">{cert.title}</h3>
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
