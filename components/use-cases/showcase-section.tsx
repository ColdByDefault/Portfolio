import { useCaseProjects } from "@/data/use-cases";
import { ProjectCard } from "./project-card";

export function ShowcaseSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-balance">
            Project Showcase TRANSLATE
          </h2>
          <p className="mx-auto max-w-175 text-muted-foreground md:text-xl text-pretty">
            Explore our collection of production-ready projects. Each showcases
            modern development practices and real-world applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCaseProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
