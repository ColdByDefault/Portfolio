"use client";

import { useState } from "react";
import HeroButton from "@components/ui/DynamicBtn"; 

export default function BottomDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 p-4">
      <HeroButton
        title={"Explore"}
        onClick={toggleDrawer}
      />

      {isOpen && (
        <div className="mt-4 bg-white rounded-t-2xl shadow-lg p-6 max-h-64 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Drawer Content</h2>
          <p className="text-gray-700">
            This is the content inside the drawer. You can add more content here.
          </p>
        </div>
      )}
    </div>
  );
}
