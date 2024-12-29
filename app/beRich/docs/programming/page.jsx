import React from 'react'
import Breadcrumb from '@components/breadcrumb';
import Link from 'next/link';


export default function ProgrammingConceptsStartUp() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
              <Breadcrumb />
              </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Programming Concepts Learning Hub</h1>
        <p className="mb-6 text-lg">
          This page is your starting point for learning the fundamental concepts of programming. It includes essential topics, explanations, and resources to help you get started.
        </p>

        <div className="space-y-8">
          {/* Section: Introduction to Programming */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">1. Introduction to Programming</h2>
            <p className="mb-4">
              Programming is the process of designing and building an executable computer program to accomplish a specific computing result.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.khanacademy.org/computing/computer-programming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Introduction to Programming - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.codecademy.com/learn/learn-how-to-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Learn How to Code - Codecademy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.freecodecamp.org/news/what-is-programming-definition-and-what-do-programmers-do/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  What is Programming? - freeCodeCamp
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Variables and Data Types */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">2. Variables and Data Types</h2>
            <p className="mb-4">
              Variables are containers for storing data values, and data types define the type of data a variable can hold.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.w3schools.com/python/python_variables.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Variables in Python - W3Schools
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.javatpoint.com/java-data-types"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Data Types in Java - JavaTpoint
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/c-data-types/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Data Types in C - GeeksforGeeks
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Control Structures */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">3. Control Structures</h2>
            <p className="mb-4">
              Control structures guide the flow of a program and include conditionals (if/else) and loops (for, while).
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.w3schools.com/python/python_conditions.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Conditionals in Python - W3Schools
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tutorialspoint.com/java/java_decision_making.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Decision Making in Java - TutorialsPoint
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.programiz.com/c-programming/c-loops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Loops in C - Programiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Functions and Methods */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">4. Functions and Methods</h2>
            <p className="mb-4">
              Functions are blocks of code that perform specific tasks and can be reused throughout the program.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.w3schools.com/python/python_functions.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Functions in Python - W3Schools
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/functions-in-c/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Functions in C - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.javatpoint.com/java-methods"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Methods in Java - JavaTpoint
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Object-Oriented Programming (OOP) */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">5. Object-Oriented Programming (OOP)</h2>
            <p className="mb-4">
              OOP is a programming paradigm based on the concept of objects. Learn about classes, inheritance, and polymorphism.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.w3schools.com/python/python_classes.asp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  OOP in Python - W3Schools
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/java-oops-concepts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  OOP Concepts in Java - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.programiz.com/cpp-programming/object-oriented-programming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  OOP in C++ - Programiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Practice Platforms */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">6. Practice Platforms</h2>
            <p className="mb-4">
              Practice coding to reinforce your understanding of programming concepts.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.hackerrank.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  HackerRank
                </Link>
              </li>
              <li>
                <Link
                  href="https://leetcode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  LeetCode
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.codewars.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Codewars
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}