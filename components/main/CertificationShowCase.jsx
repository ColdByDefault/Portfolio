import React from 'react';
import CertificationGrid from '@components/main/CertificationGrid';

const certifications = [
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
      image: "/assets/HTMLC.png",
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
    }    
  ];
  

const CertificationShowcase = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
          My Certifications
        </h2>
        <CertificationGrid certifications={certifications} />
      </div>
    </section>
  );
};

export default CertificationShowcase;

