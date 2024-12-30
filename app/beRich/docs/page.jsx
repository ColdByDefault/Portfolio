import Image from 'next/image';
import '@styles/docs.css';
import Breadcrumb from '@components/ui/breadcrumb';



export default function Page() {
  return (
    <div>
      <Breadcrumb />
    <div  className='docs-container'>
        <main>
          {/* Introduction Section */}
          <section>
            <h1>Introduction</h1>
            <p>
              This section provides an overview of the Library.
            </p>
          </section>
          {/* Cube Icon and Documents Section */}
          <section>
            <div className="bg-black backdrop-filter backdrop-blur-sm bg-opacity-30
            shadow-lg rounded-lg p-12 w-full items-center justify-center flex flex-col">
              {/* Cube Icon */}
              <div className="w-full h-52 flex justify-center items-center mb-4">
                <Image src="/library.png" width={400} height={400} alt="Folder Icon" />
              </div>
              <h4 className='text-sm text-gray-600'>"You can do anything you set your mind to"</h4>
            </div>
          </section>
          {/* Description Section */}
          <section className='text-center mt-2'>
            <p>
              Welcome to <span>beRich.Library</span>, a powerful and flexible Next.js documentation page.
            </p>
            <p className="text-gray-300 text-lg">
              Built with <span>React</span>, <span>Tailwind CSS</span>, and <span className="font-bold">JavaScript</span>.
            </p>
          </section>
          {/* <div className="flex justify-center gap-4 my-8">
            <FeatureCard
              title="NEXT.JS"
              description="Learn how to use the starter kit with step-by-step guides."
              link="/docs/docsJS/frameworks/nextJs"
              linkText="View Docs"/>
            <FeatureCard
              title="React"
              description="Explore the React documentation and learn how to build web applications."
              link="/docs/docsJS/libraries/react"
              linkText="Explore React"/>
            <FeatureCard
              title="API Reference"
              description="Dive deep into the API for advanced usage and customization."
              link="/docs"
              linkText="Explore API"/>
          </div> */}
          <div>
            <h2 className=''>Why This Digital Library?</h2>
            <p>
            This digital library was created to serve as a free and accessible hub for anyone looking to 
            expand their knowledge and skills. It's a collection of curated resources, 
            tools, and insights gathered during my own learning journey, tailored to inspire 
            and support learners of all levels. Whether you're exploring programming, discovering new tools, 
            or seeking guidance, this hub is designed to make learning straightforward and enjoyable.
            </p>
            <p>
              The library's flexible and user-friendly structure ensures you can dive into learning, explore resources, and connect with tools seamlessly.
            </p>
            <ul>
              <li>Learning Materials: Discover courses, books, and guides across various domains.</li>
              <li>Tools for Growth: Find the most effective tools and software for productivity and skill-building.</li>
              <li>Curated Links: Access a well-organized collection of websites and platforms to enhance your journey.</li>
            </ul>
            <p>
              This library is continuously evolving to reflect the latest in education and technology, making it a reliable companion for your growth.
            </p>
          </div>
          <div>
            <h2>Key Features</h2>
            <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Structured Resources</td>
                    <td>Organized categories and sections for easy navigation and discovery of learning materials.</td>
                  </tr>
                  <tr>
                    <td>Curated Tools</td>
                    <td>Handpicked software and platforms to assist in productivity and skill enhancement.</td>
                  </tr>
                  <tr>
                    <td>Interactive Content</td>
                    <td>Includes interactive tools and links to engage and deepen understanding of key concepts.</td>
                  </tr>
                  <tr>
                    <td>Multilingual Support</td>
                    <td>Resources available in English, Arabic, and German for a global learning experience.</td>
                  </tr>
                  <tr>
                    <td>Open Collaboration</td>
                    <td>Contributions and suggestions are welcomed to make the library more robust and inclusive.</td>
                  </tr>
                  <tr>
                    <td>Updated Regularly</td>
                    <td>Continuous updates to ensure the latest resources and tools are readily available.</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </main>
      </div>
    </div>
  );
}
