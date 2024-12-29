'use client';
import React, { useState } from 'react';
import { Step, StepItem } from '@/components/Step';
import Breadcrumb from '@/components/breadcrumb';
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

export default function InstallFlask() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">How to Install Flask and Set Up a Project</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="Install Python" number="1">
              <p className="mb-4">
                Before installing Flask, make sure you have Python installed on your system. Flask requires Python 3.7 or newer. You can download Python from the{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://www.python.org/downloads/" className="text-indigo-400 hover:text-indigo-300 underline">
                  official Python website
                </Link>.
              </p>
              <p className="mb-2">Verify your Python installation by running:</p>
              <CodeBlock
                code="python --version"
                language="bash"
              />
            </StepItem>
            
            <StepItem title="Set Up a Virtual Environment" number="2">
              <p className="mb-4">
                It's recommended to use a virtual environment for Flask projects. This keeps your project dependencies isolated from other Python projects.
              </p>
              <p className="mb-2">Create a new directory for your project and navigate to it:</p>
              <CodeBlock
                code="mkdir myflaskproject
cd myflaskproject"
                language="bash"
              />
              <p className="mt-4 mb-2">Create a virtual environment:</p>
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
            </StepItem>
            
            <StepItem title="Install Flask" number="3">
              <p className="mb-4">
                With your virtual environment activated, install Flask using pip:
              </p>
              <CodeBlock
                code="pip install flask"
                language="bash"
              />
              <p className="mt-4">
                This command will install Flask and its dependencies in your virtual environment.
              </p>
            </StepItem>

            <StepItem title="Create Your Flask Project Structure" number="4">
              <p className="mb-4">
                Now, let's set up a basic Flask project structure:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Create a new file named <code className="bg-gray-700 px-1 rounded">__init__.py</code> in your project root</li>
                <li>Create a new file named <code className="bg-gray-700 px-1 rounded">app.py</code> in your project root</li>
              </ol>
              <p className="mb-2">Your project structure should look like this:</p>
              <CodeBlock
                code="myflaskproject/
├── venv/
├── __init__.py
└── app.py"
                language="plaintext"
              />
            </StepItem>

            <StepItem title="Set Up Your Flask Application" number="5">
              <p className="mb-4">
                Let's create a basic Flask application. Open <code className="bg-gray-700 px-1 rounded">app.py</code> and add the following code:
              </p>
              <CodeBlock
                code={`from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)`}
                language="python"
              />
              <p className="mt-4">
                This creates a simple Flask application with a single route that returns "Hello, World!".
              </p>
            </StepItem>

            <StepItem title="Run Your Flask Application" number="6">
              <p className="mb-4">
                Now you can run your Flask application:
              </p>
              <CodeBlock
                code="python app.py"
                language="bash"
              />
              <p className="mt-4">
                Your Flask application should now be running. Open a web browser and go to{" "}
                <Link target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:5000" className="text-indigo-400 hover:text-indigo-300 underline">
                  http://127.0.0.1:5000
                </Link>. You should see "Hello, World!" displayed.
              </p>
            </StepItem>

            <StepItem title="Next Steps" number="7">
              <p className="mb-4">
                Now that you have a basic Flask application running, you can start building your project:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Add more routes and views to your application</li>
                <li>Create templates for rendering HTML</li>
                <li>Set up a database connection</li>
                <li>Implement user authentication</li>
                <li>Explore Flask extensions for additional functionality</li>
              </ul>
              <p>
                Refer to the{" "}
                <Link target="_blank" rel="noopener noreferrer" href="https://flask.palletsprojects.com/" className="text-indigo-400 hover:text-indigo-300 underline">
                  Flask documentation
                </Link>{" "}
                for more information on how to develop your Flask application.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}

