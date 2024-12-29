import Breadcrumb from '@components/breadcrumb';
import KatexSpan  from '@utils/LaTexRender';
import Link from 'next/link';
import RightSidebarNav from '@components/RightSidebarNav';



const topics = [
  { id: 1, title: 'Arithmetic', link: '#arithmetic' },
  { id: 2, title: 'Basic Algebra', link: '#basic-algebra' },
  { id: 3, title: 'Geometry', link: '#geometry' },
  { id: 4, title: 'Practice Platforms', link: '#practice-platforms' },
  { id: 5, title: 'Advanced Topics', link: '#advanced-topics' },
];


export default function Math() {

    return (
        <>
        <div className='mb-4'>
        <Breadcrumb />
        </div>

        <section>
            <h1>Math with LaTex</h1>
            <KatexSpan text="This is inline math: $E=mc^2$"/>
            <KatexSpan text="and this is display math: $\frac{a}{b}$" />
            <KatexSpan text="$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$" />
        </section>
        <section className="py-12 text-gray-300 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Math and Algebra Learning Hub</h1>
        <p className="mb-6 text-lg">
          This page serves as a starting point for learning basic mathematics and algebra concepts. It includes foundational topics, explanations, and resources for further study.
        </p>

        <div className="space-y-8">
          {/* Section: Arithmetic */}
          <div>
            <h2 id='arithmetic' className="text-2xl font-bold text-indigo-400 mb-4">1. Arithmetic</h2>
            <p className="mb-4">
              Arithmetic is the foundation of mathematics. Learn operations like addition, subtraction, multiplication, division, and their applications.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.khanacademy.org/math/arithmetic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Arithmetic Basics - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mathsisfun.com/numbers/arithmetic.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Arithmetic Introduction - Math Is Fun
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.cuemath.com/learn/arithmetic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Arithmetic Concepts - Cuemath
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Basic Algebra */}
          <div>
            <h2 id='basic-algebra' className="text-2xl font-bold text-indigo-400 mb-4">2. Basic Algebra</h2>
            <p className="mb-4">
              Algebra introduces variables and equations. Start with understanding linear equations, inequalities, and algebraic expressions.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.khanacademy.org/math/algebra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Algebra Basics - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mathsisfun.com/algebra/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Introduction to Algebra - Math Is Fun
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.purplemath.com/modules/index.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Algebra Modules - Purplemath
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Geometry */}
          <div>
            <h2 id='geometry' className="text-2xl font-bold text-indigo-400 mb-4">3. Geometry</h2>
            <p className="mb-4">
              Learn the basics of shapes, angles, and spatial reasoning. Geometry is essential for visualizing and solving real-world problems.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.khanacademy.org/math/geometry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Geometry Basics - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mathsisfun.com/geometry/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Geometry Fundamentals - Math Is Fun
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.education.com/resources/geometry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Geometry Resources - Education.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Practice Platforms */}
          <div>
            <h2 id='practice-platforms' className="text-2xl font-bold text-indigo-400 mb-4">4. Practice Platforms</h2>
            <p className="mb-4">
              Build your skills by solving math problems and challenges on these platforms.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.math-drills.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Math Drills
                </Link>
              </li>
              <li>
                <Link
                  href="https://brilliant.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Brilliant - Math and Logic Problems
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.prodigygame.com/main-en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Prodigy Math
                </Link>
              </li>
            </ul>
          </div>

          {/* Section: Advanced Topics */}
          <div>
            <h2 id='advanced-topics' className="text-2xl font-bold text-indigo-400 mb-4">5. Advanced Topics</h2>
            <p className="mb-4">
              Explore advanced math topics, such as calculus, linear algebra, and statistics, once you master the basics.
            </p>
            <ul className="list-disc list-inside">
              <li>
                <Link
                  href="https://www.khanacademy.org/math/calculus-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Calculus - Khan Academy
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.mathsisfun.com/algebra/linear-equations.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Linear Algebra Basics - Math Is Fun
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.statisticshowto.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 underline"
                >
                  Statistics - Statistics How To
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='absolute right-0 top-24'>
        <RightSidebarNav topics={topics} />
      </div>
    </section>
        </>
    );
}