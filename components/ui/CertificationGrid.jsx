import React from 'react';
import Image from 'next/image';

const CertificationCard = ({ title, image, issuer, date, description }) => {
    return (
      <div className="bg-white rounded-lg flex flex-col
      shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <Image 
            src={image} alt={title}
            width={300} height={300} 
            className="object-cover m-auto" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-1">Issued by: {issuer}</p>
          <p className="text-sm text-gray-500">Date: {date}</p>
          <p className="text-sm text-gray-500">Date: {description}</p>
        </div>
      </div>
    );
};

const CertificationGrid = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

