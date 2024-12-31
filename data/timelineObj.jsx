/* const events = [
  {
    date: "2020",
    title: "Explored Web Development",
    description: "Started building projects with HTML, CSS.",
    cardDescription: "Built foundational knowledge in structuring web pages and styling elements effectively.",
    cardTitle: "Gaining Fundamentals",
  },
  {
    date: "2021",
    title: "Started Learning Front-End Programming",
    description: "Deployed my first Website ever.",
    cardDescription: "Learned how to turn designs into functional web pages with responsiveness.",
    cardTitle: "Front-End Milestones",
  },
  {
    date: "2022",
    title: "Started Learning Programming",
    description: "Dived into Python and built my first simple applications.",
    cardDescription: "Explored logic building and developed problem-solving skills through Python projects.",


 */

// timelineData.js
import Image from "next/image";

const timelineData = [
  {
    title: "2024",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-8">
            Diving into deep learning and neural networks. <br />
            Understanding data science concepts and implementing machine learning algorithms.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/ml1.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full 
              shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/assets/numpy.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60
              shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
  },
  {
    title: "2023",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-8">
            Started Academic Journey as a Software Developer <br />
            Enrolled in a formal academic program to study software development. <br />
            Focusing on foundational programming and practical skills. <br />
            cardDescription: "Engaged in structured learning, working on collaborative and individual projects. 
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/gfn.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/assets/softwareDev.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
  },
  {
    title: "2022",
      content: (
        <div>
          <p className="text-white text-xs md:text-sm font-normal mb-8">
            Started Learning Programming. <br />
            Dived into Python and built my first simple applications. <br />
            Explored logic building and developed problem-solving skills through Python projects. 
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/programing-clipart.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-24 lg:h-24 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/assets/numpy.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
  },
  /* 2023 */
  /* 2022 */
  /* 2021 */
  {
    title: "Changelog",
    content: (
      <div>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
          Deployed 5 new components on Aceternity today
        </p>
        <div className="mb-8">
          {[
            "one two three to the four",
            "one two three to the four",
            "one two three to the four",
            "one two three to the four",
            "one two three to the four",
          ].map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm"
            >
              ✅ {item}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, index) => (
            <Image
              key={index}
              src="/logo.png"
              alt="template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full 
              shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          ))}
        </div>
      </div>
    ),
  },
];

export default timelineData;

