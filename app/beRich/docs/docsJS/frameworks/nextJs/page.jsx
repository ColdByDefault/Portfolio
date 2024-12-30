'use client';
import React, {useState} from 'react';
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

export default function InstallNextJs() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">How to Install Next.js</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="Set Up Your Development Environment" number="1">
              <p className="mb-4">
                Before installing Next.js, make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://nodejs.org" className="text-indigo-400 hover:text-indigo-300 underline">
                  nodejs.org
                </Link>.
              </p>
              <p className="mb-2">Verify your Node.js and npm installation by running:</p>
              <CodeBlock code="node --version
npm --version" language="bash" />
            </StepItem>
            
            <StepItem title="Create a New Next.js Project" number="2">
              <p className="mb-4">
                To create a new Next.js project, you can use the following command:
              </p>
              <CodeBlock
                code="npx create-next-app@latest my-next-app"
                language="bash"
              />
              <p className="mt-4 mb-2">
                This command will prompt you with some questions about your project setup. You can customize your choices or use the default options.
              </p>
            </StepItem>
            
            <StepItem title="Navigate to Your Project" number="3">
              <p className="mb-4">
                Once the installation is complete, navigate to your project directory:
              </p>
              <CodeBlock
                code="cd my-next-app"
                language="bash"
              />
            </StepItem>

            <StepItem title="Run the Development Server" number="4">
              <p className="mb-4">
                Start the development server to see your new Next.js application in action:
              </p>
              <CodeBlock
                code="npm run dev"
                language="bash"
              />
              <p className="mt-4">
                Your Next.js application should now be running on{" "}
                <Link target="_blank" rel="noopener noreferrer" href="http://localhost:3000" className="text-indigo-400 hover:text-indigo-300 underline">
                  http://localhost:3000
                </Link>. Open this URL in your browser to see your new app!
              </p>
            </StepItem>

            <StepItem title="Start Building Your Next.js App" number="5">
              <p className="mb-4">
                You're now ready to start building your Next.js application! Here are some key files and directories to know:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><code className="bg-gray-700 px-1 rounded">pages/</code> or <code className="bg-gray-700 px-1 rounded">app/</code>: Where you'll create your application routes and pages</li>
                <li><code className="bg-gray-700 px-1 rounded">public/</code>: For static assets like images</li>
                <li><code className="bg-gray-700 px-1 rounded">styles/</code>: For your CSS files</li>
              </ul>
              <p>
                Refer to the{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://nextjs.org/docs" className="text-indigo-400 hover:text-indigo-300 underline">
                  Next.js documentation
                </Link>{" "}
                for more information on how to build your app.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}

