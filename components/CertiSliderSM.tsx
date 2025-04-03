import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"

interface CarouselItemData {
  id: number;
  title: string;
  image: string;
  issuer?: string;
  description?: string;
  date?: string;
}

interface CarouselPluginProps {
  autoPlayDelay?: number;
  className?: string;
  maxWidth?: string;
}

export function CarouselPlugin({ 
  autoPlayDelay = 2000, 
  className = "w-full max-w-xs",
  maxWidth 
}: CarouselPluginProps) {
  const plugin = React.useRef(
    Autoplay({ delay: autoPlayDelay, stopOnInteraction: true })
  )

  // Data now lives inside the component
  const certificationData: CarouselItemData[] = [
    {
      id: 1,
      title: 'Python PCEP',
      image: '/assets/cer1.png',
      issuer: 'Python Institute',
      description: 'Earned the PCEP (Python Certified Entry-Level Programmer) certification, demonstrating foundational knowledge of Python programming.',
      date: '2024',
    },
    {
      id: 2,
      title: 'Udemy Python Bootcamp',
      image: '/assets/cer2.png',
      issuer: 'Udemy',
      description: 'Completed the "100 Days of Code - The Complete Python Pro Bootcamp," mastering Python from beginner to advanced levels.',
      date: '2024',
    },
    {
      id: 3,
      title: 'Meta Frontend Development',
      image: '/assets/cer3.png',
      issuer: 'Meta (via Coursera)',
      description: 'Completed the "Introduction to Frontend Development" course, gaining foundational skills in HTML, CSS.',
      date: '2022',
    },
    {
      id: 4,
      title: "Udemy HTML and CSS for Beginners - Build a Website & Launch Online",
      image: "/assets/htmlC.png",
      issuer: "Udemy",
      description: "Completed the course, learning the fundamentals of HTML and CSS to build and deploy a website.",
      date: "2025"
    },
    {
      id: 5,
      title: "The Git & GitHub Bootcamp",
      image: "/assets/githubC.png",
      issuer: "Udemy",
      description: "Completed a comprehensive Git and GitHub course, covering version control, branching, and collaboration workflows.",
      date: "2025"
    },
    {
      id: 6,
      title: "Full-Stack Web-Development",
      image: "/assets/nodecer.jpg",
      issuer: "Udemy",
      description: "Frontend and Backend Web Development course, covering HTML, CSS, JavaScript, Node.js, and React.",
      date: "2025"
    }
  ]

  return (
    <Carousel
      plugins={[plugin.current]}
      className={maxWidth ? `w-full ${maxWidth}` : className}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {certificationData.map((item) => (
          <CarouselItem key={item.id}>
            <div className="py-6">
              <Card>
                <CardContent className="flex flex-col items-center justify-center">
                  {item.image && (
                    <div className="relative w-full h-60">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill
                        className="object-contain"/>
                    </div>)}
                  <div className="text-center">
                    <h3 className="text-xl ">{item.title}</h3>
                    {item.issuer && <p className="text-sm text-gray-200">{item.issuer}</p>}
                    {item.date && <p className="text-sm text-gray-300 mb-2">{item.date}</p>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}