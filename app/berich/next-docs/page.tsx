"use client"

import Link from "next/link"
import { ArrowRight, Code, FileCode, Layers, LayoutDashboard, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/berich/ui/tabs"

export default function NextJsPage() {
  return (
    <main className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Next.js</h1>
          <p className="text-lg text-muted-foreground">The React Framework for the Web</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Quick Start
              </CardTitle>
              <CardDescription>Get up and running with Next.js in minutes</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p>Create a new Next.js application with the following command:</p>
              <pre className="mt-4 mb-4 bg-muted p-4 rounded-md overflow-x-auto">
                <code>npx create-next-app@latest my-app</code>
              </pre>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link href="#installation">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                Project Structure
              </CardTitle>
              <CardDescription>Understanding the Next.js file system</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <p>Next.js uses file-based routing with a structured folder hierarchy:</p>
              <pre className="mt-4 mb-4 bg-muted p-4 rounded-md overflow-x-auto">
                <code>{`app/
├── layout.tsx    # Root layout
├── page.tsx      # Home page
└── about/
    └── page.tsx  # About page`}</code>
              </pre>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link href="#project-structure">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="app-router" className="mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="app-router">App Router</TabsTrigger>
            <TabsTrigger value="pages-router">Pages Router</TabsTrigger>
          </TabsList>
          <TabsContent value="app-router" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2">App Router (Recommended)</h3>
            <p className="mb-4">
              The App Router is the newest routing system introduced in Next.js 13, built on React Server Components.
            </p>
            <pre className="bg-muted p-4 rounded-md mb-4 overflow-x-auto">
              <code>{`// app/page.tsx
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}`}</code>
            </pre>
          </TabsContent>
          <TabsContent value="pages-router" className="p-4 border rounded-md mt-2">
            <h3 className="text-lg font-semibold mb-2">Pages Router (Legacy)</h3>
            <p className="mb-4">
              The Pages Router is the original routing system in Next.js, based on the pages directory.
            </p>
            <pre className="bg-muted p-4 rounded-md mb-4 overflow-x-auto">
              <code>{`// pages/index.js
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}`}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <section id="installation" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <p className="mb-6">
            Next.js requires Node.js 18.17 or later. You can create a new Next.js app using one of the following
            methods:
          </p>

          <h3 className="text-xl font-semibold mb-3">Using create-next-app (Recommended)</h3>
          <p className="mb-4">
            The easiest way to get started with Next.js is by using <code>create-next-app</code>. This CLI tool enables
            you to quickly start building a new Next.js application, with everything set up for you.
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`npx create-next-app@latest`}</code>
          </pre>

          <p className="mb-4">During the installation, you'll see the following prompts:</p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use \`src/\` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the default import alias (@/*)? No / Yes`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">Manual Setup</h3>
          <p className="mb-4">To manually create a new Next.js app, install the required packages:</p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`npm install next@latest react@latest react-dom@latest`}</code>
          </pre>

          <p className="mb-4">
            Open your <code>package.json</code> file and add the following scripts:
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}`}</code>
          </pre>
        </section>

        <section id="project-structure" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Project Structure</h2>
          <p className="mb-6">Next.js uses a file-system based router where folders are used to define routes. [^1]</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  App Router Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code>{`app/
├── layout.tsx      # Root layout
├── page.tsx        # Home page
├── global.css      # Global styles
├── favicon.ico     # Favicon
├── about/
│   └── page.tsx    # /about route
└── blog/
    ├── layout.tsx  # Blog layout
    ├── page.tsx    # /blog route
    └── [slug]/
        └── page.tsx # /blog/:slug route`}</code>
                </pre>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-primary" />
                    Special Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <code>layout.tsx</code> - Shared UI for a segment and its children
                    </li>
                    <li>
                      <code>page.tsx</code> - UI for a route and makes it publicly accessible
                    </li>
                    <li>
                      <code>loading.tsx</code> - Loading UI for a segment and its children
                    </li>
                    <li>
                      <code>error.tsx</code> - Error UI for a segment and its children
                    </li>
                    <li>
                      <code>not-found.tsx</code> - UI for not found (404) errors
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Route Conventions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <code>[param]</code> - Dynamic segment (e.g., [id] or [slug])
                    </li>
                    <li>
                      <code>[...catchAll]</code> - Catch-all segment
                    </li>
                    <li>
                      <code>(group)</code> - Route group (doesn't affect URL path)
                    </li>
                    <li>
                      <code>@name</code> - Named slot (for parallel routes)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="routing" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Routing</h2>
          <p className="mb-6">
            Next.js has a file-system based router built on the concept of routes where folders define the routes.
            [^1][^2]
          </p>

          <h3 className="text-xl font-semibold mb-3">Creating Routes</h3>
          <p className="mb-4">
            To create a route, you need to create a <code>page.tsx</code> file inside a folder in the app directory:
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`// app/dashboard/page.tsx
export default function Dashboard() {
  return <h1>Dashboard Page</h1>
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">Dynamic Routes</h3>
          <p className="mb-4">To create a dynamic route, use square brackets around a folder name:</p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog Post: {params.slug}</h1>
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">Linking Between Pages</h3>
          <p className="mb-4">
            Use the <code>Link</code> component from <code>next/link</code> to navigate between pages:
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/hello-world">Blog Post</Link>
    </nav>
  )
}`}</code>
          </pre>
        </section>

        <section id="data-fetching" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Data Fetching</h2>
          <p className="mb-6">Next.js provides several ways to fetch data in your application.</p>

          <h3 className="text-xl font-semibold mb-3">Server Components (Recommended)</h3>
          <p className="mb-4">
            By default, components in the App Router are React Server Components. This allows you to fetch data directly
            in your components:
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">Client Components</h3>
          <p className="mb-4">
            For client-side data fetching, you can use the <code>use client</code> directive and hooks like{" "}
            <code>useState</code> and <code>useEffect</code>:
          </p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`'use client'

import { useState, useEffect } from 'react'

export default function ClientComponent() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
  
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
    </div>
  )
}`}</code>
          </pre>
        </section>

        <section id="styling" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Styling</h2>
          <p className="mb-6">
            Next.js supports various styling methods including CSS Modules, Tailwind CSS, and CSS-in-JS solutions.
            [^4][^5]
          </p>

          <h3 className="text-xl font-semibold mb-3">CSS Modules</h3>
          <p className="mb-4">CSS Modules locally scope CSS by automatically creating unique class names:</p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="mb-2 font-medium">styles.module.css:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto h-full">
                <code>{`.button {
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: white;
  border-radius: 4px;
}

.button:hover {
  background: #0051a2;
}`}</code>
              </pre>
            </div>
            <div>
              <p className="mb-2 font-medium">Button.tsx:</p>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto h-full">
                <code>{`import styles from './styles.module.css'

export function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  )
}`}</code>
              </pre>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Tailwind CSS</h3>
          <p className="mb-4">Next.js works seamlessly with Tailwind CSS, a utility-first CSS framework:</p>

          <pre className="bg-muted p-4 rounded-md mb-6 overflow-x-auto">
            <code>{`// Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// Usage in components
export function Button() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
      Click me
    </button>
  )
}`}</code>
          </pre>
        </section>

        <section id="deployment" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Deployment</h2>
          <p className="mb-6">
            Next.js applications can be deployed to various platforms, with Vercel being the recommended option for the
            best experience.
          </p>

          <h3 className="text-xl font-semibold mb-3">Deploying to Vercel</h3>
          <p className="mb-4">
            Vercel is the platform built by the creators of Next.js and provides the optimal environment for Next.js
            applications:
          </p>

          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Push your code to a Git repository (GitHub, GitLab, Bitbucket)</li>
            <li>Import your project into Vercel</li>
            <li>Vercel will detect that you're using Next.js and use the optimal build settings</li>
            <li>Your application will be deployed to a global CDN with automatic HTTPS</li>
          </ol>

          <Button asChild>
            <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
              Deploy to Vercel
            </a>
          </Button>
        </section>

        <section id="resources" className="pt-10 border-t">
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Official Documentation</CardTitle>
                <CardDescription>Comprehensive guides and API reference</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://nextjs.org/docs" className="text-primary hover:underline" target="_blank">
                      Next.js Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="https://nextjs.org/learn" className="text-primary hover:underline" target="_blank">
                      Learn Next.js
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://github.com/vercel/next.js/tree/canary/examples"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Next.js Examples
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Resources</CardTitle>
                <CardDescription>Tutorials, courses, and community support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="https://github.com/vercel/next.js/discussions"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      GitHub Discussions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://discord.com/invite/bUG2bvbtHy"
                      className="text-primary hover:underline"
                      target="_blank"
                    >
                      Next.js Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="https://twitter.com/nextjs" className="text-primary hover:underline" target="_blank">
                      Next.js Twitter
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}