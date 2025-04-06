'use client'
import React from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes"
import CodeBlock from '@/components/ui/code-block'


export default function GettingStartedReact() {
  const { theme } = useTheme()
  /* "container mx-auto px-4 py-8 max-w-4xl" */
  return (
    <main className={`flex flex-col justify-center items-center flex-grow p-4 ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="text-md lg:text-4xl font-bold mb-8">React Getting Started Guide with Vite</h1>
      <section className="mb-12">
        <h2 id="install-react" className="text-md lg:text-2xl font-semibold mb-4">
          1. How to Install Node.js
        </h2>
        <div className="prose max-w-none">
          <p className='pb-1'>Node.js is required to run Next.js applications. Follow these steps to install Node.js:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Visit the{" "}
              <Link href="https://nodejs.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                official Node.js website
              </Link>
            </li>
            <li>Download the LTS (Long Term Support) version (recommended for most users)</li>
            <li>Run the installer and follow the installation wizard</li>
            <li>
              Verify installation by opening a terminal/command prompt and running:
              <CodeBlock code="node --version" language="bash" showLineNumbers={true}/>
            </li>
          </ol>
          <p className="mt-4">
            Alternatively, you can use a version manager like nvm (Node Version Manager) to install and manage multiple
            Node.js versions.
          </p>
        </div>
      </section>
      <section className="mb-12">
        <h2 id="install-react" className="text-2xl font-semibold mb-4">
          2. How to Install React 19
        </h2>
        <div className="prose max-w-none">
          <p>Create a new React project with the latest features using the following command:</p>
          <CodeBlock code="npm create vite@latest my-react-app" language="bash" showLineNumbers={true}/>
          <p className="mt-4">You'll be prompted with several options:</p>
          <CodeBlock code={`✔ Project name: … my-react-app
✔ Select a framework: > React
✔ Select a variant: > JavaScript / TypeScript
`} language="bash" showLineNumbers={true}/>
          <p className="mt-4">After the installation completes, navigate to your project directory:</p>
          <CodeBlock code="cd my-react-app" language="bash" showLineNumbers={true}/>
          <p className="mt-4">Install the necessary dependencies, including React 19:</p>
          <CodeBlock code="npm install react@^19.0.0 react-dom@^19.0.0" language="bash" showLineNumbers={true}/>
          <p className="mt-4">If you're using TypeScript, also install the type definitions:</p>
          <CodeBlock code="npm install --save-dev @types/react@^19.0.0 @types/react-dom@^19.0.0" language="bash" showLineNumbers={true}/>
          <p className="mt-2">Start the development server:</p>
          <CodeBlock code="npm run dev" language="bash" showLineNumbers={true}/>
          <p className="mt-4">
            Your React application will be running at <code>http://localhost:3000</code>.
          </p>
        </div>
      </section>
      <section className="mb-12">
        <h2 id="app-structure" className="text-2xl font-semibold mb-4">
          3. App Folder Structure Explanation
        </h2>
        <div className="prose max-w-none">
          <p>The App Router in Next.js 15 uses a folder-based routing system. Here's the basic structure:</p>
          <CodeBlock code={`my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── App.jsx (or App.tsx for TypeScript)
│   ├── main.jsx (or main.tsx for TypeScript)
│   └── components/
├── package.json
├── vite.config.js
└── README.md
`} language="Folder Structure" showLineNumbers={true}/>
          <p className="mt-4">Key directories and files:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>public/</strong>: Contains static assets and the main HTML file.
            </li>
            <li>
              <strong>src/</strong>: Contains the React components and application logic
            </li>
            <ul>
                <li><strong>App.jsx</strong>: The root component of your application.</li>
                <li><strong>main.jsx</strong>: The entry point that renders the App component.</li>
                <li><strong>components/</strong>: Directory to store reusable components.</li>
            </ul>
          </ul>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 id="" className="text-2xl font-semibold mb-4">
          4. Creating and Using Components
        </h2>
        <div className="prose max-w-none">
          <h3 className="text-xl font-medium mt-4 mb-2">stc/components/ directory</h3>
          <p>In React, the UI is built using components. Here's how you can create and use a simple component:
          </p>
          <CodeBlock code={`import React from 'react';

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
}

export default Button;`} language="JavaScript" showLineNumbers={true}/>
          <h3 className="text-xl font-medium mt-6 mb-2">Use the Component in App.jsx:</h3>
          <p>Import and use the Button component in your App.jsx:
          </p>
          <CodeBlock code={`// src/App.jsx
import React from 'react';
import Button from './components/Button';

function App() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div>
      <h1>Welcome to My React App</h1>
      <Button text="Click Me" onClick={handleClick} />
    </div>
  );
}

export default App;`} language="JavaScript" showLineNumbers={true}/>
        </div>
      </section>
      <section className="mb-12">
        <h2 id="global-css" className="text-2xl font-semibold mb-4">
          6. How to style
        </h2>
        <div className="prose max-w-none">
          <p>You can style your application using CSS. For example, to style the button component:
          </p>
          <CodeBlock code={`/* src/components/Button.css */
.btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
`} language="css" showLineNumbers={true}/>
          <p className="mt-4">
            Modify the Button.jsx file to import the CSS:
          </p>
          <CodeBlock code={`// src/components/Button.jsx
import React from 'react';
import './Button.css';

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {text}
    </button>
  );
}

export default Button;
`} language="JavaScript" showLineNumbers={true}/>
        </div>
      </section>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link href="/berich" className="text-blue-600">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}

