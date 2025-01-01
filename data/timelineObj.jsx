import Image from "next/image";

const timelineData = [
  {
    title: "Late 2024",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          Focused on full-stack development with React, Tailwind, Vite, and Next.js. <br />
          Successfully launched the third version of the beRich Next.js app.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["/assets/fullstack.png", "/assets/next.png", "/assets/logo44.png", "/assets/stats.png"].map((src, index) => (
            <Image
            key={index}
            src={src}
            alt="Fullstack development"
            width={300} // Adjust width here
            height={300} // Adjust height here
            className="rounded-lg object-cover h-16 md:h-32 lg:h-48 w-48 
            shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Early 2024",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          Began with a basic understanding of machine learning, studying linear algebra, statistics, and libraries like NumPy, Pandas, Matplotlib, and PyTorch. <br />
          Launched my first web app, the Flask-based beRich version 2.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["/assets/ml1.png", "/assets/numpy.png", "/assets/pytorch.png", "/assets/version2.png"].map((src, index) => (
            <Image
            key={index}
            src={src}
            alt="Fullstack development"
            width={300} // Adjust width here
            height={300} // Adjust height here
            className="rounded-lg object-cover h-16 md:h-32 lg:h-48 w-48 
            shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2023",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          Started my academic journey as a software developer at GFN School. <br />
          Launched the first version of the beRich app, built as a standalone Python application using CTkinter.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["/assets/gfn.png", "/assets/plan.png", "/assets/version1.png"].map((src, index) => (
            <Image
            key={index}
            src={src}
            alt="Fullstack development"
            width={300} // Adjust width here
            height={300} // Adjust height here
            className="rounded-lg object-cover h-16 md:h-22 lg:h-24 w-48 
            shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          Started learning algorithms and basic programming concepts. <br />
          Focused on Python and general programming principles, building a strong foundation.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["/assets/programing-clipart.png", "/assets/python.png", "/assets/alg.png", "/assets/plan2.png"].map((src, index) => (
            <Image
            key={index}
            src={src}
            alt="Fullstack development"
            width={300} // Adjust width here
            height={300} // Adjust height here
            className="rounded-lg object-cover h-16 md:h-32 lg:h-48 w-48 
            shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2021",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          Began with HTML and CSS, creating simple static pages hosted on Netlify. <br />
          Used GitHub for version control and collaboration.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {["/assets/html.png", "/assets/static.png"].map((src, index) => (
            <Image
            key={index}
            src={src}
            alt="Fullstack development"
            width={300} // Adjust width here
            height={300} // Adjust height here
            className="rounded-lg object-cover h-16 md:h-32 lg:h-48 w-48 
            shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-white text-xs md:text-sm font-normal mb-4">
          2024 Milestones
        </p>
        <div>
          {["Migrated projects to Next.js and Vercel hosting.",
            "Integrated MongoDB and Supabase for database management.",
            "Developed and deployed a user authentication system.",
            "Built scalable full-stack applications.",
            "Enhanced deep learning model performance in small-scale projects."].map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ {item}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default timelineData;
