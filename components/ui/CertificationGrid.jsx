import React from 'react';
import Image from 'next/image';

const CertificationCard = ({ title, image, issuer, date, description }) => {
    return (
      <div className="bg-zinc-900/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-800 grid z-40
        shadow-md overflow-hidden relative grid-rows-2 gap-2">
        <div className="row-span-1 flex w-full justify-center items-center pt-2">
          <Image src={image} alt={title}
              width={300} height={300} 
              className="object-cover" />
        </div>
        <div className="row-span-1 p-4">
          <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
          <p className="text-sm text-gray-200 mb-1">Issued by: {issuer}</p>
          <p className="text-sm text-gray-300">Date: {date}</p>
          <p className="text-sm text-gray-400">Date: {description}</p>
        </div>
      </div>
    );
};

const CertificationGrid = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-40">
      {certifications.map((cert) => (
        <CertificationCard
          key={cert.id}
          title={cert.title}
          image={cert.image}
          issuer={cert.issuer}
          date={cert.date}
          description={cert.description}
        />
      ))}
    </div>
  );
};

export default CertificationGrid;

