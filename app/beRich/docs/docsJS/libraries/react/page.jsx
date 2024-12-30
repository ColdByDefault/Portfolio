'use client';
import React, { useState } from 'react';
import {Step, StepItem} from '@components/ui/Step';
import Breadcrumb from '@components/ui/breadcrumb';
import Link from 'next/link';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative mt-4 bg-gray-900 rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300`}>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold py-1 px-2 rounded transition duration-200"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default function InstallReact() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">How to Install React</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="Set Up Your Development Environment" number="1">
              <p className="mb-4">
                Before installing React, make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://nodejs.org" className="text-indigo-400 hover:text-indigo-300 underline">
                  nodejs.org
                </Link>.
              </p>
              <p className="mb-2">Verify your Node.js and npm installation by running:</p>
              <CodeBlock code="node --version
npm --version" language="bash" />
            </StepItem>
            
            <StepItem title="Create a New React Project" number="2">
              <p className="mb-4">
                To create a new React project, you can use Create React App:
              </p>
              <CodeBlock
                code="npx create-react-app my-react-app"
                language="bash"
              />
              <p className="mt-4 mb-2">
                This command will create a new React project with a default setup.
              </p>
            </StepItem>
            
            <StepItem title="Navigate to Your Project" number="3">
              <p className="mb-4">
                Once the installation is complete, navigate to your project directory:
              </p>
              <CodeBlock
                code="cd my-react-app"
                language="bash"
              />
            </StepItem>

            <StepItem title="Install Tailwind CSS and PostCSS" number="4">
              <p className="mb-4">
                To add Tailwind CSS and PostCSS to your React project, follow these steps:
              </p>
              <p className="mb-2">1. Install the necessary packages:</p>
              <CodeBlock
                code="npm install -D tailwindcss@latest postcss@latest autoprefixer@latest"
                language="bash"
              />
              <p className="mt-4 mb-2">2. Generate Tailwind and PostCSS config files:</p>
              <CodeBlock
                code="npx tailwindcss init -p"
                language="bash"
              />
              <p className="mt-4 mb-2">3. Update the Tailwind config file (tailwind.config.js):</p>
              <CodeBlock
                code={`module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
                language="javascript"
              />
              <p className="mt-4 mb-2">4. Add Tailwind directives to your CSS file (src/index.css):</p>
              <CodeBlock
                code={`@tailwind base;
@tailwind components;
@tailwind utilities;`}
                language="css"
              />
            </StepItem>

            <StepItem title="Run the Development Server" number="5">
              <p className="mb-4">
                Start the development server to see your new React application with Tailwind CSS:
              </p>
              <CodeBlock
                code="npm start"
                language="bash"
              />
              <p className="mt-4">
                Your React application should now be running on{" "}
                <a href="http://localhost:3000" className="text-indigo-400 hover:text-indigo-300 underline">
                  http://localhost:3000
                </a>. Open this URL in your browser to see your new app!
              </p>
            </StepItem>

            <StepItem title="Start Building Your React App" number="6">
              <p className="mb-4">
                You're now ready to start building your React application with Tailwind CSS! Here are some key files and directories to know:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><code className="bg-gray-700 px-1 rounded">src/</code>: Where you'll create your React components and application logic</li>
                <li><code className="bg-gray-700 px-1 rounded">public/</code>: For static assets like images</li>
                <li><code className="bg-gray-700 px-1 rounded">src/index.css</code>: Your main CSS file with Tailwind directives</li>
              </ul>
              <p>
                Refer to the{" "}
                <a href="https://reactjs.org/docs/getting-started.html" className="text-indigo-400 hover:text-indigo-300 underline">
                  React documentation
                </a>{" "}
                and the{" "}
                <a href="https://tailwindcss.com/docs" className="text-indigo-400 hover:text-indigo-300 underline">
                  Tailwind CSS documentation
                </a>{" "}
                for more information on how to build your app.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}

