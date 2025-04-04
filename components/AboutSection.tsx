"use client"

import { Parallax } from "react-scroll-parallax"
import { Card, CardContent } from "@/components/ui/card2"
import { User, Calendar, MapPin, Briefcase } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-20 relative overflow-hidden text-white">
      <div className="container mx-auto px-4">
        <Parallax translateY={[10, -10]} className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </Parallax>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Parallax translateX={[-10, 10]} opacity={[0.8, 1]}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-zinc-500/20 blur-xl"></div>
              <img
                src="/m123.jpg"
                alt="Profile"
                className="rounded-xl relative z-10 w-full h-auto"
              />
            </div>
          </Parallax>
          <Parallax translateY={[20, -20]} opacity={[0.8, 1]}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                I'm a passionate developer with expertise in creating beautiful, functional websites and applications.
                With a background in both design and development, I bring a unique perspective to every project.
              </p>
              <div className="grid grid-cols-2 gap-4">
            {/* <Card>
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">5+ Years</p>
                    </div>
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  )
}

