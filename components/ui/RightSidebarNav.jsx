// File: /components/Sidebar.jsx
import React from 'react';
import Link from 'next/link';

const Sidebar = ({ topics }) => {
  return (
    <aside className="w-52 border-l border-gray-300 p-6 h-72">
      <h2 className="text-lg font-bold mb-4">Topics</h2>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link
              href={topic.link}
              className="text-gray-600 hover:text-white">
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
