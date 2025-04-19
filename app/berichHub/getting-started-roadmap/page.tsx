'use client'
import Link from "next/link"
import {
  Code2,
  BookOpen,
  Database,
  Globe,
  Server,
  Smartphone,
  ExternalLink,
  Github,
  Youtube,
  BookMarked,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function GettingStartedRoadmap() {
    const { theme } = useTheme()
  return (
    <div className={`flex flex-col justify-center items-center flex-grow p-4 mt-12 lg:mt-0 ${theme === "dark" ? "dark" : "light"}`}>
      <main className="flex flex-col">
        <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Programming Roadmap</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow this step-by-step guide to build a solid foundation in programming and software development.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 ">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full">
                        1
                      </span>
                      Fundamentals
                    </CardTitle>
                    <CardDescription>Master the basics of programming</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Learn a beginner-friendly language (Python or JavaScript)</li>
                      <li>Understand variables, data types, and operators</li>
                      <li>Master control structures (if/else, loops)</li>
                      <li>Learn functions and basic data structures</li>
                      <li>Practice problem-solving with simple exercises</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        2
                      </span>
                      Web Development Basics
                    </CardTitle>
                    <CardDescription>Build your first websites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Learn HTML for structure</li>
                      <li>Learn CSS for styling</li>
                      <li>Understand responsive design principles</li>
                      <li>Introduction to JavaScript for interactivity</li>
                      <li>Build simple static websites</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        3
                      </span>
                      Version Control
                    </CardTitle>
                    <CardDescription>Track and manage your code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Learn Git basics (commit, push, pull)</li>
                      <li>Create a GitHub account</li>
                      <li>Understand branching and merging</li>
                      <li>Collaborate on projects with others</li>
                      <li>Create your first repository</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6">
                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        4
                      </span>
                      Frontend Development
                    </CardTitle>
                    <CardDescription>Create interactive user interfaces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Learn a frontend framework (React, Vue, or Angular)</li>
                      <li>Understand component-based architecture</li>
                      <li>Master state management</li>
                      <li>Learn about API integration</li>
                      <li>Build interactive web applications</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        5
                      </span>
                      Backend Development
                    </CardTitle>
                    <CardDescription>Build server-side applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Learn a backend language/framework (Node.js, Python/Django, etc.)</li>
                      <li>Understand databases (SQL and NoSQL)</li>
                      <li>Create RESTful APIs</li>
                      <li>Implement authentication and authorization</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        6
                      </span>
                      Advanced Topics
                    </CardTitle>
                    <CardDescription>Specialize and grow your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="ml-6 list-disc [&>li]:mt-2">
                      <li>Choose a specialization (web, mobile, AI, etc.)</li>
                      <li>Learn testing and debugging techniques</li>
                      <li>Understand DevOps basics</li>
                      <li>Build a portfolio of projects</li>
                      <li>Contribute to open source</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h3 className="text-xl font-bold">Choose Your Path</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                  <Card className={`flex flex-col items-center p-6 ${theme === "dark" ? "dark" : "light"}`}>
                    <Globe className="h-12 w-12 mb-4 text-primary" />
                    <h4 className="text-lg font-semibold">Web Development</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Build websites and web applications that run in browsers
                    </p>
                  </Card>

                  <Card className={`flex flex-col items-center p-6 ${theme === "dark" ? "dark" : "light"}`}>
                    <Smartphone className="h-12 w-12 mb-4 text-primary" />
                    <h4 className="text-lg font-semibold">Mobile Development</h4>
                    <p className="text-sm text-muted-foreground mt-2">Create apps for iOS and Android devices</p>
                  </Card>

                  <Card className={`flex flex-col items-center p-6 ${theme === "dark" ? "dark" : "light"}`}>
                    <Server className="h-12 w-12 mb-4 text-primary" />
                    <h4 className="text-lg font-semibold">Backend Development</h4>
                    <p className="text-sm text-muted-foreground mt-2">Build server-side applications and APIs</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="resources" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learning Resources</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Curated resources to help you on your programming journey.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Free Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.freecodecamp.org/" className="text-sm hover:underline" target="_blank">
                        freeCodeCamp
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.codecademy.com/" className="text-sm hover:underline" target="_blank">
                        Codecademy
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.theodinproject.com/" className="text-sm hover:underline" target="_blank">
                        The Odin Project
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.edx.org/" className="text-sm hover:underline" target="_blank">
                        edX
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.coursera.org/" className="text-sm hover:underline" target="_blank">
                        Coursera
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="h-5 w-5" />
                    YouTube Channels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://www.youtube.com/c/TraversyMedia"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        Traversy Media
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://www.youtube.com/c/TheNetNinja"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        The Net Ninja
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://www.youtube.com/c/Freecodecamp"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        freeCodeCamp
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://www.youtube.com/c/ProgrammingwithMosh"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        Programming with Mosh
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://www.youtube.com/c/Fireship"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        Fireship
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5" />
                    Documentation & Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://developer.mozilla.org/" className="text-sm hover:underline" target="_blank">
                        MDN Web Docs
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.w3schools.com/" className="text-sm hover:underline" target="_blank">
                        W3Schools
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://roadmap.sh/" className="text-sm hover:underline" target="_blank">
                        roadmap.sh
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.geeksforgeeks.org/" className="text-sm hover:underline" target="_blank">
                        GeeksforGeeks
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.tutorialspoint.com/" className="text-sm hover:underline" target="_blank">
                        TutorialsPoint
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5" />
                    Coding Practice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.hackerrank.com/" className="text-sm hover:underline" target="_blank">
                        HackerRank
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://leetcode.com/" className="text-sm hover:underline" target="_blank">
                        LeetCode
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.codewars.com/" className="text-sm hover:underline" target="_blank">
                        Codewars
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://exercism.io/" className="text-sm hover:underline" target="_blank">
                        Exercism
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.codingame.com/" className="text-sm hover:underline" target="_blank">
                        CodinGame
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    Open Source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://github.com/firstcontributions/first-contributions"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        First Contributions
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://goodfirstissue.dev/" className="text-sm hover:underline" target="_blank">
                        Good First Issue
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://up-for-grabs.net/" className="text-sm hover:underline" target="_blank">
                        Up For Grabs
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.codetriage.com/" className="text-sm hover:underline" target="_blank">
                        CodeTriage
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link
                        href="https://hacktoberfest.digitalocean.com/"
                        className="text-sm hover:underline"
                        target="_blank"
                      >
                        Hacktoberfest
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Tools & Software
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://code.visualstudio.com/" className="text-sm hover:underline" target="_blank">
                        Visual Studio Code
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://git-scm.com/" className="text-sm hover:underline" target="_blank">
                        Git
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://github.com/" className="text-sm hover:underline" target="_blank">
                        GitHub
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.figma.com/" className="text-sm hover:underline" target="_blank">
                        Figma
                      </Link>
                    </li>
                    <li className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      <Link href="https://www.postman.com/" className="text-sm hover:underline" target="_blank">
                        Postman
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Common questions about starting your programming journey.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Do I need a computer science degree to become a programmer?</AccordionTrigger>
                  <AccordionContent>
                    No, you don't need a computer science degree to become a programmer. While a degree can provide a
                    structured education and may help with certain job opportunities, many successful developers are
                    self-taught. What matters most is your skills, portfolio, and ability to solve problems.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Which programming language should I learn first?</AccordionTrigger>
                  <AccordionContent>
                    Python and JavaScript are excellent choices for beginners. Python is known for its readability and
                    simplicity, making it great for learning programming concepts. JavaScript is the language of the web
                    and allows you to build interactive websites right away. Choose based on your interests: Python for
                    general programming, data science, or backend; JavaScript for web development.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does it take to learn programming?</AccordionTrigger>
                  <AccordionContent>
                    Learning programming is a continuous journey. You can learn the basics in a few weeks to a couple of
                    months. Becoming job-ready typically takes 6-12 months of consistent practice. Mastery is an ongoing
                    process that takes years. The key is consistent practice and building projects.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>What kind of computer do I need for programming?</AccordionTrigger>
                  <AccordionContent>
                    For beginners, any modern computer (less than 5 years old) with at least 8GB of RAM should be
                    sufficient. You don't need an expensive setup to start learning. As you progress to more complex
                    projects or specific fields like game development or machine learning, you might need more powerful
                    hardware.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I build a portfolio as a beginner?</AccordionTrigger>
                  <AccordionContent>
                    Start by completing tutorials and then modify those projects to make them your own. Then, build
                    projects that solve real problems you or others face. Create a personal website to showcase your
                    work. Contribute to open-source projects. Document your learning journey through a blog or GitHub.
                    Quality matters more than quantity—a few well-crafted projects are better than many incomplete ones.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is programming hard to learn?</AccordionTrigger>
                  <AccordionContent>
                    Programming has a learning curve, but it's accessible with the right approach. It requires logical
                    thinking and problem-solving skills rather than advanced math. The key is to be patient, persistent,
                    and practice regularly. Break down complex problems into smaller parts, and don't be afraid to make
                    mistakes—they're part of the learning process.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

