import React from "react";

import { ArrowUpRight } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

export default function FeatureCard({ title, description, link, linkText }: FeatureCardProps) {
  return (
    <div className="relative group bg-neutral-800 rounded-lg p-12 hover:bg-gray-700 transition-colors">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
      {link && (
        <a 
          href={link}
          className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={linkText || 'Learn more'}>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </a>
      )}
    </div>
  );
}