// Copyright © [ColdByDefault] [AnotherProject]™.
// All Rights Reserved.
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import SocialLinks from "./SocialLinks";

function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 md:py-12 lg:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-border shadow-2xl">
              <Image
                src="/profileDark.jpg"
                alt="Profile Picture"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-sm font-medium"
              >
                Available for collabration
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 max-w-4xl">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Yazan Abo-Ayash
              </h1>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground">
                  Full Stack Junior Developer
                </h2>
              </div>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences through
              clean code, innovative solutions, and user-centered design.
              Specialized in modern web technologies with 3+ years of
              experience.
            </p>
            <Link href="/about">
              <Button variant="outline" size="lg" className="gap-2">
                Learn More About Me
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
