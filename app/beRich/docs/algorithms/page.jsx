import React from 'react'
import Breadcrumb from '../../components/breadcrumb';
import Link from 'next/link';

export default function AlgorithmsStartUp() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Algorithms Learning Hub</h1>
        <p className="mb-6 text-lg">
          This page provides a structured pathway for learning algorithms, starting with the basics and progressing to advanced topics. Each section includes curated resources, descriptions, and practice platforms.
        </p>

        <div className="space-y-8">
          {/* Section: Basics */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">1. Basics of Algorithms</h2>
            <p className="mb-4">
              Begin with foundational concepts, such as understanding what algorithms are, how they work, and their importance in computer science.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/introduction-to-algorithms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Introduction to Algorithms - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.khanacademy.org/computing/computer-science/algorithms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Algorithms Course - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.youtube.com/watch?v=rL8X2mlNHPM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  What is an Algorithm? - YouTube
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Data Structures */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">2. Data Structures</h2>
            <p className="mb-4">
              Data structures form the backbone of many algorithms. Learn about arrays, linked lists, stacks, queues, trees, and graphs.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/data-structures/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Data Structures - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://visualgo.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Visualizing Data Structures - VisuAlgo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.programiz.com/dsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Data Structures Explained - Programiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Sorting and Searching Algorithms */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">3. Sorting and Searching Algorithms</h2>
            <p className="mb-4">
              Learn common sorting algorithms like QuickSort, MergeSort, and BubbleSort, and searching techniques such as Binary Search.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/sorting-algorithms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Sorting Algorithms - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://visualgo.net/en/sorting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Visualize Sorting - VisuAlgo
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.tutorialspoint.com/data_structures_algorithms/binary_search_algorithm.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Binary Search Algorithm - TutorialsPoint
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Advanced Algorithms */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">4. Advanced Algorithms</h2>
            <p className="mb-4">
              Dive into dynamic programming, graph algorithms, and more to solve complex computational problems.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.geeksforgeeks.org/dynamic-programming/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Dynamic Programming - GeeksforGeeks
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.topcoder.com/thrive/articles/Dynamic%20Programming:%20From%20Novice%20to%20Advanced"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Dynamic Programming Guide - TopCoder
                </Link>
              </li>
              <li>
                <Link
                  href="https://cp-algorithms.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Competitive Programming Algorithms
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Practice Platforms */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-400 mb-4">5. Practice Platforms</h2>
            <p className="mb-4">
              Practice solving algorithmic problems on these platforms to strengthen your understanding and skills.
            </p>
            <ul className="list-disc list-inside">
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
                  href="https://www.codeforces.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Codeforces
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
