'use client'
import React from 'react';
import Link from 'next/link';
import { useTheme } from "next-themes"

export default function GettingStarted() {
  const { theme } = useTheme()
  /* "container mx-auto px-4 py-8 max-w-4xl" */
  return (
    <main className={`getting-started-spec w-full mx-auto px-4 py-8 ${theme === "dark" ? "dark" : "light"}`}>
      <h1 className="text-4xl font-bold mb-8">Next.js 15 Getting Started Guide</h1>

      <section className="mb-12">
        <h2 id="install-nodejs" className="text-2xl font-semibold mb-4">
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
              <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
                <code>node --version</code>
              </pre>
            </li>
          </ol>
          <p className="mt-4">
            Alternatively, you can use a version manager like nvm (Node Version Manager) to install and manage multiple
            Node.js versions.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="install-nextjs" className="text-2xl font-semibold mb-4">
          2. How to Install Next.js 15.2, React 19, and Tailwind v4
        </h2>
        <div className="prose max-w-none">
          <p>Create a new Next.js project with the latest features using the following command:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>npx create-next-app@latest</code>
          </pre>
          <p className="mt-4">You'll be prompted with several options:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`What is your project named? my-app
Would you like to use TypeScript? Yes
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like your code inside a \`src/\` directory? No
Would you like to use App Router? (recommended) Yes
Would you like to use Turbopack for \`next dev\`? Yes
Would you like to customize the import alias (@/* by default)? Yes
What import alias would you like configured? @/*`}</code>
          </pre>
          <p className="mt-4">After the installation completes, navigate to your project directory:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>cd my-app</code>
          </pre>
          <p className="mt-2">Start the development server:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>npm run dev</code>
          </pre>
          <p className="mt-4">
            Your Next.js application will be running at <code>http://localhost:3000</code>.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="app-structure" className="text-2xl font-semibold mb-4">
          3. App Folder Structure Explanation
        </h2>
        <div className="prose max-w-none">
          <p>The App Router in Next.js 15 uses a folder-based routing system. Here's the basic structure:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`my-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx      # Root layout (applies to all routes)
│   ├── page.tsx        # Home page (/)
│   └── about/          # Route segment for /about
│       └── page.tsx    # About page (/about)
├── components/         # Reusable components
├── public/             # Static assets
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration`}</code>
          </pre>
          <p className="mt-4">Key directories and files:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>app/</strong>: Contains all routes, layouts, and pages
            </li>
            <li>
              <strong>components/</strong>: Reusable UI components
            </li>
            <li>
              <strong>public/</strong>: Static files like images and fonts
            </li>
            <li>
              <strong>next.config.mjs</strong>: Configuration options for Next.js
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="start-editing" className="text-2xl font-semibold mb-4">
          4. Where to Start Editing
        </h2>
        <div className="prose max-w-none">
          <p>To start editing your Next.js application:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Open the project in your favorite code editor (VS Code recommended)</li>
            <li>
              Navigate to <code>app/page.tsx</code> - this is your home page
            </li>
            <li>Make changes to the file and save - the browser will automatically update</li>
          </ol>
          <p className="mt-4">
            The development server provides hot module replacement, so you'll see your changes immediately without
            refreshing the page.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="page-layout" className="text-2xl font-semibold mb-4">
          5. Explanation of page.tsx and layout.tsx
        </h2>
        <div className="prose max-w-none">
          <h3 className="text-xl font-medium mt-4 mb-2">page.tsx</h3>
          <p>
            A <code>page.tsx</code> file defines the unique content for a route. It's the primary UI component for a
            specific route.
          </p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to my Next.js application</h1>
      <p>This is the home page</p>
    </main>
  )
}`}</code>
          </pre>

          <h3 className="text-xl font-medium mt-6 mb-2">layout.tsx</h3>
          <p>
            A <code>layout.tsx</code> file defines shared UI for a segment and its children. Layouts don't re-render
            when navigating between pages that share the layout.
          </p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>My Website</header>
        {children}
        <footer>© 2025</footer>
      </body>
    </html>
  )
}`}</code>
          </pre>
          <p className="mt-4">
            The <code>children</code> prop represents the page content or nested layouts. The root layout must contain{" "}
            <code>html</code> and <code>body</code> tags.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="global-css" className="text-2xl font-semibold mb-4">
          6. What is globals.css
        </h2>
        <div className="prose max-w-none">
          <p>
            <code>globals.css</code> is a stylesheet that applies to all routes in your application. It's imported in
            the root layout.
          </p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

/* Add your global styles here */`}</code>
          </pre>
          <p className="mt-4">
            With Tailwind CSS, the file includes the necessary Tailwind directives. You can add custom global styles
            here that should apply throughout your application.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="create-component" className="text-2xl font-semibold mb-4">
          7. Example of Creating and Importing a Component
        </h2>
        <div className="prose max-w-none">
          <p>Create a new file in the components directory:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// components/button.tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}`}</code>
          </pre>

          <p className="mt-4">Import and use the component in a page:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// app/page.tsx
import Button from '@/components/button';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to my app</h1>
      <Button text="Click me" />
    </main>
  );
}`}</code>
          </pre>
          <p className="mt-4">
            The <code>@/</code> alias points to the root of your project, making imports cleaner and more consistent.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="routing" className="text-2xl font-semibold mb-4">
          8. Routing and Pages with Example
        </h2>
        <div className="prose max-w-none">
          <p>Next.js App Router uses a file-system based routing mechanism where:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Folders define routes</li>
            <li>
              <code>page.tsx</code> files make routes publicly accessible
            </li>
            <li>Nested folders create nested routes</li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-2">Example:</h3>
          <p>To create a blog section with individual post pages:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`app/
├── page.tsx         # Home page (/)
└── blog/
    ├── page.tsx     # Blog index page (/blog)
    └── [slug]/      # Dynamic route segment
        └── page.tsx # Individual blog post page (/blog/post-1)`}</code>
          </pre>

          <p className="mt-4">Blog index page:</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// app/blog/page.tsx
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    { id: 1, slug: 'hello-world', title: 'Hello World' },
    { id: 2, slug: 'next-js-15', title: 'What\'s New in Next.js 15' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id}>
            <Link 
              href={\`/blog/\${post.slug}\`}
              className="text-blue-600 hover:underline text-lg"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}`}</code>
          </pre>

          <p className="mt-4">Individual blog post page (dynamic route):</p>
          <pre className={`p-3 rounded-md mt-2 overflow-x-auto ${theme === "dark" ? "dark" : "light"}`}>
            <code>{`// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Post: {params.slug}</h1>
      <p>This is the content of the blog post with slug: {params.slug}</p>
    </article>
  );
}`}</code>
          </pre>
          <p className="mt-4">
            The <code>[slug]</code> folder creates a dynamic route segment that captures any value in that position of
            the URL and passes it as the <code>params.slug</code> prop to the page component.
          </p>
        </div>
      </section>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <Link href="/berich" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}

