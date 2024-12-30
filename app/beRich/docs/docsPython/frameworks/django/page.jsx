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

export default function InstallDjango() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">How to Install Django and Set Up a Project</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="Install Python" number="1">
              <p className="mb-4">
                Before installing Django, ensure you have Python installed on your system. Django requires Python 3.8 or newer. You can download Python from the{" "}
                <Link href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline">
                  official Python website
                </Link>.
              </p>
              <p className="mb-2">Verify your Python installation by running:</p>
              <CodeBlock
                code="python --version"
                language="bash"
              />
            </StepItem>
            
            <StepItem title="Install Django" number="2">
              <p className="mb-4">
                Install Django using pip. It's recommended to create a virtual environment for your Django project to isolate dependencies.
              </p>
              <p className="mb-2">Create a virtual environment:</p>
              <CodeBlock
                code="python -m venv venv"
                language="bash"
              />
              <p className="mt-4 mb-2">Activate the virtual environment:</p>
              <p className="mb-2">On Windows:</p>
              <CodeBlock
                code="venv\Scripts\activate"
                language="bash"
              />
              <p className="mb-2">On macOS and Linux:</p>
              <CodeBlock
                code="source venv/bin/activate"
                language="bash"
              />
              <p className="mt-4 mb-2">Install Django:</p>
              <CodeBlock
                code="pip install django"
                language="bash"
              />
            </StepItem>
            
            <StepItem title="Create a Django Project" number="3">
              <p className="mb-4">
                Use the <code className="bg-gray-700 px-1 rounded">django-admin</code> command to create a new Django project:
              </p>
              <CodeBlock
                code="django-admin startproject myproject"
                language="bash"
              />
              <p className="mt-4">
                This will create a directory named <code className="bg-gray-700 px-1 rounded">myproject</code> containing the initial project files.
              </p>
            </StepItem>

            <StepItem title="Run the Development Server" number="4">
              <p className="mb-4">
                Navigate to the project directory and start the Django development server:
              </p>
              <CodeBlock
                code="cd myproject
python manage.py runserver"
                language="bash"
              />
              <p className="mt-4">
                Open a web browser and go to{" "}
                <Link href="http://127.0.0.1:8000" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline">
                  http://127.0.0.1:8000
                </Link>. You should see the default Django welcome page.
              </p>
            </StepItem>

            <StepItem title="Create a Django App" number="5">
              <p className="mb-4">
                Add functionality to your project by creating a new app. Run the following command:
              </p>
              <CodeBlock
                code="python manage.py startapp myapp"
                language="bash"
              />
              <p className="mt-4">
                This will create a directory named <code className="bg-gray-700 px-1 rounded">myapp</code> with the necessary files for your app.
              </p>
            </StepItem>

            <StepItem title="Next Steps" number="6">
              <p className="mb-4">
                You have successfully set up a basic Django project. Here are some suggested next steps:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Create models and set up the database</li>
                <li>Develop views and templates</li>
                <li>Configure URLs for routing</li>
                <li>Explore Django's admin interface</li>
                <li>Implement user authentication</li>
              </ul>
              <p>
                Refer to the{" "}
                <Link href="https://docs.djangoproject.com/" target="_blank" rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline">
                  Django documentation
                </Link>{" "}
                for more details.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}
