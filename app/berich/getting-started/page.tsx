import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Getting Started | Minimal Docs Site",
  description: "Learn how to get started with our documentation",
}

export default function GettingStarted() {
  return (
    <main className="max-w-3xl mx-auto">
        <pre>
        <code>{`import { Client } from '@our-company/package';

const client = new Client();
const result = await client.doSomething();
console.log(result);`}</code>
      </pre>

    </main>
  )
}

