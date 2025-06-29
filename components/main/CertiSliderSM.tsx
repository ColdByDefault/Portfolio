import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious, 
  CarouselNext, 
} from "@/components/ui/carousel"

import Image from "next/image"
import { certifications } from '@/data/certificationsData';


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


  return (
    <Carousel
      plugins={[plugin.current]}
      className={maxWidth ? `w-full ${maxWidth}` : className}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
        {certifications.map((item) => (
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
      <CarouselPrevious className="bg-transparent" />
      <CarouselNext className="bg-transparent"/>
    </Carousel>
  )
}