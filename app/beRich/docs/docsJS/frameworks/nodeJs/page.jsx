'use client';
import React, { useState } from 'react';
import {Step, StepItem} from '../../components/Step';
import Breadcrumb from '../../components/breadcrumb';
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

export default function InstallNodeJs() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">How to Install Node.js</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="Download Node.js" number="1">
              <p className="mb-4">
                Visit the official Node.js website at{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://nodejs.org" className="text-indigo-400 hover:text-indigo-300 underline">
                  nodejs.org
                </Link>{" "}
                and download the appropriate version for your operating system.
              </p>
              <p className="mb-4">
                You'll see two versions available:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>LTS (Long Term Support): Recommended for most users</li>
                <li>Current: Latest features, but may have some instability</li>
              </ul>
              <p>Choose the version that best suits your needs.</p>
            </StepItem>
            
            <StepItem title="Install Node.js" number="2">
              <p className="mb-4">
                Once the installer is downloaded, follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Run the installer package</li>
                <li>Follow the prompts in the installer</li>
                <li>Accept the license agreement</li>
                <li>Choose the destination for the installation</li>
                <li>Let the installer run and wait for it to finish</li>
              </ol>
              <p>
                The installer will set up Node.js and npm (Node Package Manager) on your system.
              </p>
            </StepItem>
            
            <StepItem title="Verify the Installation" number="3">
              <p className="mb-4">
                After the installation is complete, you can verify it by opening a terminal or command prompt and running the following commands:
              </p>
              <CodeBlock
                code="node --version
npm --version"
                language="bash"
              />
              <p className="mt-4">
                These commands should display the versions of Node.js and npm that you just installed.
              </p>
            </StepItem>

            <StepItem title="Update npm (Optional)" number="4">
              <p className="mb-4">
                npm is updated more frequently than Node.js. To ensure you have the latest version of npm, you can run:
              </p>
              <CodeBlock
                code="npm install -g npm@latest"
                language="bash"
              />
              <p className="mt-4">
                This command will update npm to the latest version globally on your system.
              </p>
            </StepItem>

            <StepItem title="Set Up Your Development Environment" number="5">
              <p className="mb-4">
                Now that Node.js is installed, you can set up your development environment:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Choose a code editor or IDE (e.g., Visual Studio Code, Sublime Text, WebStorm)</li>
                <li>Install helpful extensions for Node.js development in your chosen editor</li>
                <li>Set up a version control system like Git</li>
              </ol>
              <p>
                These tools will help you write and manage your Node.js projects more effectively.
              </p>
            </StepItem>

            <StepItem title="Create Your First Node.js Application" number="6">
              <p className="mb-4">
                Let's create a simple "Hello, World!" application to test your Node.js installation:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Create a new file named <code className="bg-gray-700 px-1 rounded">app.js</code></li>
                <li>Open the file in your code editor and add the following code:</li>
              </ol>
              <CodeBlock
                code={`console.log('Hello, World!');`}
                language="javascript"
              />
              <p className="mt-4 mb-2">Save the file and run it using Node.js:</p>
              <CodeBlock
                code="node app.js"
                language="bash"
              />
              <p className="mt-4">
                You should see "Hello, World!" printed in your terminal. Congratulations! You've just run your first Node.js application.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}

