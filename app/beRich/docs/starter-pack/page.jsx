import React from 'react'
import Breadcrumb from '@components/ui/breadcrumb';
import RightSidebarNav from '@components/ui/RightSidebarNav';


const topics = [
    { id: 1, title: 'Getting Started', link: '#getting-started' },
    { id: 2, title: 'API Reference', link: '#api-reference' },
    { id: 3, title: 'Examples', link: '#examples' },
    { id: 4, title: 'FAQ', link: '#faq' },
  ];
  
  const DocumentationPage = () => {
    return (
      <section className="flex flex-col min-h-screen">
         <div className='mb-4'>
            <Breadcrumb />
        </div>
        {/* Main Content */}
        <div className="flex flex-1">
          {/* Main Content */}
          <main className="flex-1 p-6">
            <section id="getting-started" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
              <p>Welcome to the documentation. This section will help you get started quickly.</p>
            </section>
            <section id="api-reference" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">API Reference</h2>
              <p>Find detailed information about our API endpoints.</p>
            </section>
            <section id="examples" className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Examples</h2>
              <p>Explore various examples to integrate our service into your application.</p>
            </section>
            <section id="faq">
              <h2 className="text-2xl font-semibold mb-2">FAQ</h2>
              <p>Find answers to frequently asked questions.</p>
            </section>
          </main>
            <RightSidebarNav topics={topics} />
        </div>
      </section>
    );
  };
  
  export default DocumentationPage;


