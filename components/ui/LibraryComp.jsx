import Image from 'next/image';
import FeatureCard from '@components/ui/feature-card';

export default function LibraryComponent() {
  return (
    <div className="flex flex-col flex-grow mx-auto p-4 sm:p-8">
      <main className="flex-1">
        {/* Introduction Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Introduction</h1>
          <p className="text-lg text-gray-700">
            This section provides an overview of the Library.
          </p>
        </section>

        {/* Cube Icon and Documents Section */}
        <section className="mb-8">
          <div className="bg-black bg-opacity-30 backdrop-blur-md shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="h-52 w-full flex justify-center items-center mb-4">
              <Image src="/library.png" width={200} height={200} alt="Folder Icon" />
            </div>
            <h4 className="text-sm text-gray-400 text-center">
              "You can do anything you set your mind to"
            </h4>
          </div>
        </section>

        {/* Description Section */}
        <section className="text-center mb-8">
          <p className="text-lg text-gray-800">
            Welcome to <span className="font-bold">beRich.Library</span>, a powerful and flexible Next.js documentation page.
          </p>
          <p className="text-gray-600 text-md">
            Built with <span className="font-semibold">React</span>, <span className="font-semibold">Tailwind CSS</span>, and <span className="font-bold">JavaScript</span>.
          </p>
        </section>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <FeatureCard
            title="NEXT.JS"
            description="Learn how to use the starter kit with step-by-step guides."
            link="/docs/docsJS/frameworks/nextJs"
            linkText="View Docs"
          />
          <FeatureCard
            title="React"
            description="Explore the React documentation and learn how to build web applications."
            link="/docs/docsJS/libraries/react"
            linkText="Explore React"
          />
          <FeatureCard
            title="API Reference"
            description="Dive deep into the API for advanced usage and customization."
            link="/docs"
            linkText="Explore API"
          />
        </div>

        {/* Why This Digital Library Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why This Digital Library?</h2>
          <p className="text-gray-700 mb-4">
            This digital library was created to serve as a free and accessible hub for anyone looking to expand
            their knowledge and skills. It's a collection of curated resources, tools, and insights gathered
            during my own learning journey, tailored to inspire and support learners of all levels.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Learning Materials: Discover courses, books, and guides across various domains.</li>
            <li>Tools for Growth: Find the most effective tools and software for productivity and skill-building.</li>
            <li>Curated Links: Access a well-organized collection of websites and platforms to enhance your journey.</li>
          </ul>
        </section>

        {/* Key Features Table */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <table className="table-auto w-full text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Feature</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Structured Resources</td>
                <td className="border px-4 py-2">Organized categories for easy navigation.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Curated Tools</td>
                <td className="border px-4 py-2">Handpicked software for productivity.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Interactive Content</td>
                <td className="border px-4 py-2">Engaging tools and links for learning.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Multilingual Support</td>
                <td className="border px-4 py-2">Available in English, Arabic, and German.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Open Collaboration</td>
                <td className="border px-4 py-2">Welcomes contributions to improve content.</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Updated Regularly</td>
                <td className="border px-4 py-2">Ensures up-to-date resources are available.</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
