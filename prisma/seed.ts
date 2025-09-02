/**
 * Database Seed Script
 * @author ColdByDefault
 * @copyright 2025 ColdByDefault. All Rights Reserved.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create blog categories
  console.log("📁 Creating blog categories...");
  const techCategory = await prisma.blogCategory.upsert({
    where: { slug: "technology" },
    update: {},
    create: {
      name: "Technology",
      slug: "technology",
      description:
        "Articles about programming, web development, and tech trends",
      color: "#3B82F6",
      isActive: true,
    },
  });

  const tutorialCategory = await prisma.blogCategory.upsert({
    where: { slug: "tutorials" },
    update: {},
    create: {
      name: "Tutorials",
      slug: "tutorials",
      description: "Step-by-step guides and how-to articles",
      color: "#10B981",
      isActive: true,
    },
  });

  // Create blog tags
  console.log("🏷️ Creating blog tags...");
  const reactTag = await prisma.blogTag.upsert({
    where: { slug: "react" },
    update: {},
    create: {
      name: "React",
      slug: "react",
      color: "#61DAFB",
    },
  });

  const nextjsTag = await prisma.blogTag.upsert({
    where: { slug: "nextjs" },
    update: {},
    create: {
      name: "Next.js",
      slug: "nextjs",
      color: "#000000",
    },
  });

  const typescriptTag = await prisma.blogTag.upsert({
    where: { slug: "typescript" },
    update: {},
    create: {
      name: "TypeScript",
      slug: "typescript",
      color: "#3178C6",
    },
  });

  const webdevTag = await prisma.blogTag.upsert({
    where: { slug: "web-development" },
    update: {},
    create: {
      name: "Web Development",
      slug: "web-development",
      color: "#F59E0B",
    },
  });

  // Create test blog 1 (English)
  console.log("📝 Creating English blog post...");
  const englishBlog = await prisma.blog.upsert({
    where: { slug: "getting-started-with-nextjs-14" },
    update: {},
    create: {
      title: "Getting Started with Next.js 14: A Complete Guide",
      slug: "getting-started-with-nextjs-14",
      excerpt:
        "Learn how to build modern web applications with Next.js 14, including the new App Router, Server Components, and more.",
      content: `# Getting Started with Next.js 14: A Complete Guide

Next.js 14 brings exciting new features and improvements to the React framework that makes building full-stack web applications easier than ever.

## What's New in Next.js 14

### App Router (Stable)
The App Router is now stable and provides a better developer experience with:
- **Server Components by default**: Better performance and SEO
- **Improved routing**: File-based routing with enhanced features
- **Layout support**: Persistent layouts across route changes

### Turbopack (Beta)
Next.js 14 includes Turbopack in beta, which provides:
- Up to 53% faster local server startup
- Up to 5x faster code updates with Fast Refresh

## Setting Up Your First Next.js 14 Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Features to Explore

1. **Server Actions**: Handle form submissions and data mutations directly in your components
2. **Partial Prerendering**: Combine static and dynamic content for optimal performance
3. **Improved Image Component**: Better performance and developer experience

## Best Practices

- Use Server Components when possible for better performance
- Implement proper error boundaries
- Optimize your images with the Next.js Image component
- Use TypeScript for better development experience

## Conclusion

Next.js 14 continues to push the boundaries of what's possible with React applications. Whether you're building a simple blog or a complex e-commerce platform, Next.js 14 provides the tools you need to succeed.

Happy coding! 🚀`,
      featuredImage: "/assets/nextjs-guide.jpg",
      language: "en",
      isPublished: true,
      isFeatured: true,
      isDraft: false,
      metaTitle: "Getting Started with Next.js 14 - Complete Guide",
      metaDescription:
        "Learn Next.js 14 with this comprehensive guide covering App Router, Server Components, Turbopack, and best practices.",
      readingTime: 8,
      publishedAt: new Date("2025-01-15T10:00:00Z"),
      categoryId: techCategory.id,
    },
  });

  // Create test blog 2 (German)
  console.log("📝 Creating German blog post...");
  const germanBlog = await prisma.blog.upsert({
    where: { slug: "react-hooks-tutorial-deutsch" },
    update: {},
    create: {
      title: "React Hooks Tutorial: Von Beginner zu Pro",
      slug: "react-hooks-tutorial-deutsch",
      excerpt:
        "Lerne React Hooks von Grund auf - useState, useEffect, Custom Hooks und mehr. Ein umfassendes Tutorial auf Deutsch.",
      content: `# React Hooks Tutorial: Von Beginner zu Pro

React Hooks haben die Art und Weise, wie wir React-Komponenten schreiben, revolutioniert. In diesem Tutorial lernst du alles, was du über Hooks wissen musst.

## Was sind React Hooks?

Hooks sind Funktionen, die es dir ermöglichen, React-Features in funktionalen Komponenten zu nutzen. Sie wurden in React 16.8 eingeführt und haben die Entwicklung erheblich vereinfacht.

## Die wichtigsten Hooks

### useState Hook
Der \`useState\` Hook verwaltet lokalen State in funktionalen Komponenten:

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}
\`\`\`

### useEffect Hook
Der \`useEffect\` Hook führt Seiteneffekte in funktionalen Komponenten aus:

\`\`\`jsx
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Du hast \${count} mal geklickt\`;
  });

  return (
    <div>
      <p>Du hast {count} mal geklickt</p>
      <button onClick={() => setCount(count + 1)}>
        Klick mich
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks erstellen

Du kannst eigene Hooks erstellen, um Logik zwischen Komponenten zu teilen:

\`\`\`jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
\`\`\`

## Wichtige Regeln

1. **Nur in React-Funktionen aufrufen**: Hooks nur in React-Komponenten oder anderen Hooks verwenden
2. **Nur auf oberster Ebene aufrufen**: Keine Hooks in Schleifen, Bedingungen oder verschachtelten Funktionen
3. **Konsistente Reihenfolge**: Hooks müssen immer in derselben Reihenfolge aufgerufen werden

## Fazit

React Hooks machen funktionale Komponenten kraftvoller und den Code sauberer. Mit der Zeit wirst du feststellen, dass Hooks die Entwicklung erheblich vereinfachen.

Viel Erfolg beim Lernen! 🎯`,
      featuredImage: "/assets/react-hooks-tutorial.jpg",
      language: "de",
      isPublished: true,
      isFeatured: false,
      isDraft: false,
      metaTitle: "React Hooks Tutorial - Von Beginner zu Pro",
      metaDescription:
        "Umfassendes React Hooks Tutorial auf Deutsch. Lerne useState, useEffect, Custom Hooks und Best Practices.",
      readingTime: 12,
      publishedAt: new Date("2025-01-20T14:30:00Z"),
      categoryId: tutorialCategory.id,
    },
  });

  // Create blog tag relations
  console.log("🔗 Creating blog tag relations...");

  // English blog tags
  await prisma.blogTagRelation.createMany({
    data: [
      { blogId: englishBlog.id, tagId: nextjsTag.id },
      { blogId: englishBlog.id, tagId: reactTag.id },
      { blogId: englishBlog.id, tagId: webdevTag.id },
    ],
    skipDuplicates: true,
  });

  // German blog tags
  await prisma.blogTagRelation.createMany({
    data: [
      { blogId: germanBlog.id, tagId: reactTag.id },
      { blogId: germanBlog.id, tagId: typescriptTag.id },
      { blogId: germanBlog.id, tagId: webdevTag.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Database seeded successfully!");
  console.log(`📊 Created:`);
  console.log(`   - 2 blog categories`);
  console.log(`   - 4 blog tags`);
  console.log(`   - 2 blog posts (1 English, 1 German)`);
  console.log(`   - 6 tag relations`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
