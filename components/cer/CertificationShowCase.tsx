// CertificationShowcase.js

import React from "react";
import Image from "next/image";
import { certifications } from "@/data/certificationsData";
import { Card, CardTitle } from "@/components/ui/card";

interface CertificationShowcaseProps {
  className?: string;
}

function CertificationShowcase({ className }: CertificationShowcaseProps) {
  return (
    <section className={className} id="cert">
      <Card className="max-w-7xl mx-auto border-0 dark:bg-transparent">
        <CardTitle className="text-3xl font-light sm:text-4xl text-center mb-8">
          My Certifications
        </CardTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-40">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="p-6 grid shadow-md overflow-hidden relative gap-2"
            >
              <CardTitle>
                <h3 className="text-lg font-semibold text-center">
                  {cert.title}
                </h3>
              </CardTitle>
              <div className="flex w-full justify-center items-center pt-2">
                <Image
                  src={cert.image}
                  alt={cert.title}
                  width={300}
                  height={280}
                  className="object-cover"
                  priority={cert.id <= 3}
                />
              </div>
              <div className="">
                <p className="text-sm mb-1">Issued by: {cert.issuer}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Date: {cert.date}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {cert.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default CertificationShowcase;
