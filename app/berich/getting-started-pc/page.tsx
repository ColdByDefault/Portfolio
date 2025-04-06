"use client"
import {
  Cpu,
  HardDrive,
  MemoryStickIcon as Memory,
  Monitor,
  Keyboard,
  Mouse,
  Wifi,
  Usb,
  Binary,
  Layers,
  MicroscopeIcon as Microchip,
  PlugZap,
  Disc,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const { theme } = useTheme()
  return (
    <div
      className={`flex flex-col justify-center items-center flex-grow p-2 sm:p-4 md:p-6 lg:p-8 ${theme === "dark" ? "dark" : "light"}`}
    >
      <main className="flex-1">
        <section id="hardware" className="py-4 sm:py-8 md:py-16 lg:py-32">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Computer Hardware
                </h2>
                <p className="text-sm md:text-base lg:text-xl/relaxed">
                  Understanding the physical components that make up a computer system.
                </p>
              </div>
            </div>
            <Tabs defaultValue="internal" className="mt-8 max-w-5xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 gap-1 text-xs sm:text-sm md:text-base">
                <TabsTrigger
                  value="internal"
                  className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500"
                >
                  Internal Components
                </TabsTrigger>
                <TabsTrigger
                  value="external"
                  className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500"
                >
                  External Components
                </TabsTrigger>
              </TabsList>
              <TabsContent value="internal" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Cpu className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">CPU (Central Processing Unit)</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">The brain of the computer</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        The CPU processes instructions, performs calculations, and manages data flow within the
                        computer. Key specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Clock speed (GHz) - how many cycles per second</li>
                        <li>Cores - number of processing units</li>
                        <li>Cache - high-speed memory for quick data access</li>
                        <li>Architecture (32-bit vs 64-bit)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Memory className="h-6 w-6 md:h-8 md:w:8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">RAM (Random Access Memory)</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Temporary working memory</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        RAM stores data that the CPU is actively using. It's volatile, meaning data is lost when power
                        is turned off. Key specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Capacity (GB) - amount of storage</li>
                        <li>Speed (MHz) - how quickly data can be accessed</li>
                        <li>Type (DDR4, DDR5) - generation of memory technology</li>
                        <li>Channels - pathways for data transfer</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <HardDrive className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Storage Devices</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Long-term data storage</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Storage devices keep data even when the computer is powered off. Common types include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>HDD (Hard Disk Drive) - mechanical storage</li>
                        <li>SSD (Solid State Drive) - faster flash storage</li>
                        <li>NVMe - ultra-fast storage connected via PCIe</li>
                        <li>Optical drives (CD/DVD/Blu-ray)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Microchip className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Motherboard</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">The main circuit board</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        The motherboard connects all components together and allows them to communicate. Key features
                        include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Form factor (ATX, Micro-ATX, Mini-ITX)</li>
                        <li>CPU socket type</li>
                        <li>Chipset - determines compatibility and features</li>
                        <li>Expansion slots (PCIe) for add-in cards</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Layers className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">
                          GPU (Graphics Processing Unit)
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Visual processing</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        The GPU handles rendering images, videos, and animations. Key specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>VRAM (Video RAM) - dedicated graphics memory</li>
                        <li>Core count - number of processing units</li>
                        <li>Clock speed - operating frequency</li>
                        <li>Architecture - design generation</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <PlugZap className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">PSU (Power Supply Unit)</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Provides electrical power</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        The PSU converts AC power from the wall outlet to DC power for computer components. Key
                        specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Wattage - maximum power output</li>
                        <li>Efficiency rating (80+ Bronze, Gold, Platinum)</li>
                        <li>Modularity - detachable cables</li>
                        <li>Form factor - physical size and shape</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="external" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Monitor className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Monitor</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Visual display output</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Monitors display visual output from the computer. Key specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Resolution - number of pixels (1080p, 4K)</li>
                        <li>Panel type (IPS, VA, TN, OLED)</li>
                        <li>Refresh rate (Hz) - screen updates per second</li>
                        <li>Response time (ms) - pixel color change speed</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Keyboard className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Keyboard</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Text and command input</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Keyboards allow users to input text and commands. Types include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Membrane - rubber dome switches</li>
                        <li>Mechanical - individual switches per key</li>
                        <li>Layouts (QWERTY, AZERTY, DVORAK)</li>
                        <li>Form factors (full-size, tenkeyless, 60%)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Mouse className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Mouse</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Pointing device</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Mice allow users to control the cursor and navigate interfaces. Key specifications include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>DPI (Dots Per Inch) - cursor movement sensitivity</li>
                        <li>Sensor type (optical, laser)</li>
                        <li>Connection (wired, wireless, Bluetooth)</li>
                        <li>Button count and programmability</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Usb className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">External Storage</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Portable data storage</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        External storage devices allow for portable data transfer and backup. Common types include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>USB flash drives</li>
                        <li>External hard drives (HDD)</li>
                        <li>External solid state drives (SSD)</li>
                        <li>Memory cards (SD, microSD)</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Wifi className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Networking Equipment</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Internet and local connectivity
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Networking equipment connects computers to networks and the internet. Common devices include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Routers - direct network traffic</li>
                        <li>Modems - connect to internet service</li>
                        <li>Network adapters - enable network connectivity</li>
                        <li>Switches - connect multiple devices on a network</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
                    <CardHeader className="flex flex-row items-center gap-1 sm:gap-2 md:gap-4 p-1 sm:p-2 md:p-4">
                      <Disc className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                      <div>
                        <CardTitle className="text-sm sm:text-base md:text-lg">Printers & Scanners</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Physical output and input</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="p-1 sm:p-2 md:p-4">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Printers create physical copies of digital documents, while scanners convert physical documents
                        to digital. Types include:
                      </p>
                      <ul className="mt-1 md:mt-2 ml-3 md:ml-6 list-disc text-[10px] xs:text-xs sm:text-sm [&>li]:mt-0.5 md:[&>li]:mt-1">
                        <li>Inkjet printers - versatile, good for photos</li>
                        <li>Laser printers - fast, economical for text</li>
                        <li>3D printers - create physical objects</li>
                        <li>Flatbed and document scanners</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="computing" className="w-full py-4 sm:py-8 md:py-16 lg:py-32">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Computing Fundamentals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Understanding the basic concepts that power computing systems.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <Card className={`p-4 md:col-span-2 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Binary className="h-5 w-5" />
                    Binary System: The Language of Computers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Computers use the binary number system, which has only two digits: 0 and 1. Each digit is called
                        a bit (binary digit). Computers use binary because electronic components can easily represent
                        two states: on (1) or off (0).
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Binary to Decimal Conversion</h4>
                        <p className="text-sm text-muted-foreground">
                          Each position in a binary number represents a power of 2, starting from the rightmost digit
                          (2^0 = 1).
                        </p>
                        <div className="overflow-x-auto -mx-6 sm:-mx-2 md:mx-0">
                          <table className="w-full border-collapse text-[10px] xs:text-xs sm:text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Binary</th>
                                <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Calculation</th>
                                <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Decimal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0001</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0×8 + 0×4 + 0×2 + 1×1</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">1</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0010</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0×8 + 0×4 + 1×2 + 0×1</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">2</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0101</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">0×8 + 1×4 + 0×2 + 1×1</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">5</td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-2 sm:px-4 py-1 sm:py-2">1000</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">1×8 + 0×4 + 0×2 + 0×1</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">8</td>
                              </tr>
                              <tr>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">1101</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">1×8 + 1×4 + 0×2 + 1×1</td>
                                <td className="px-2 sm:px-4 py-1 sm:py-2">13</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-4">Common Binary Units</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Bit</span>
                          <span className="text-sm text-muted-foreground">A single binary digit (0 or 1)</span>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Byte</span>
                          <span className="text-sm text-muted-foreground">8 bits (can represent 256 values)</span>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Kilobyte (KB)</span>
                          <span className="text-sm text-muted-foreground">1,024 bytes</span>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Megabyte (MB)</span>
                          <span className="text-sm text-muted-foreground">1,024 kilobytes</span>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Gigabyte (GB)</span>
                          <span className="text-sm text-muted-foreground">1,024 megabytes</span>
                        </li>
                        <li className="flex items-center justify-between border-b pb-2">
                          <span className="font-medium">Terabyte (TB)</span>
                          <span className="text-sm text-muted-foreground">1,024 gigabytes</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="font-medium">Petabyte (PB)</span>
                          <span className="text-sm text-muted-foreground">1,024 terabytes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Data Representation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">ASCII and Unicode</h4>
                      <p className="text-sm text-muted-foreground">
                        Computers represent text using character encoding standards:
                      </p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>ASCII - 7-bit encoding for basic Latin characters</li>
                        <li>Unicode - supports characters from all writing systems</li>
                        <li>UTF-8 - variable-width encoding for Unicode</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Color Representation</h4>
                      <p className="text-sm text-muted-foreground">
                        Colors are typically represented using RGB values:
                      </p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Each color has Red, Green, and Blue components</li>
                        <li>Each component ranges from 0-255 (8 bits)</li>
                        <li>24-bit color allows for 16.7 million colors</li>
                        <li>Example: RGB(255, 0, 0) represents pure red</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Image and Sound</h4>
                      <p className="text-sm text-muted-foreground">Digital media is represented as binary data:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Images are grids of pixels with color values</li>
                        <li>Resolution determines image quality (e.g., 1920×1080)</li>
                        <li>Sound is represented as waveform samples</li>
                        <li>Sample rate (Hz) and bit depth affect audio quality</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Computer Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Von Neumann Architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        Most computers follow the Von Neumann architecture with these components:
                      </p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>CPU (Central Processing Unit)</li>
                        <li>Memory (RAM)</li>
                        <li>Input/Output devices</li>
                        <li>Storage</li>
                        <li>System bus for communication between components</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">CPU Operation</h4>
                      <p className="text-sm text-muted-foreground">The CPU follows the fetch-decode-execute cycle:</p>
                      <ol className="mt-2 ml-6 list-decimal text-sm [&>li]:mt-1">
                        <li>Fetch instruction from memory</li>
                        <li>Decode the instruction</li>
                        <li>Execute the instruction</li>
                        <li>Store results</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">32-bit vs 64-bit Computing</h4>
                      <p className="text-sm text-muted-foreground">The bit architecture affects system capabilities:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Refers to the size of data chunks processed</li>
                        <li>32-bit systems can address up to 4GB of RAM</li>
                        <li>64-bit systems can address theoretically 18 exabytes</li>
                        <li>64-bit enables more efficient processing of large data</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="peripherals" className="w-full py-4 sm:py-8 md:py-16 lg:py-32 bg-muted">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Peripheral Devices & Interfaces</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Understanding the devices that connect to your computer and how they communicate.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Connection Interfaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">USB (Universal Serial Bus)</h4>
                      <p className="text-sm text-muted-foreground">
                        The most common connection interface for peripherals:
                      </p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>USB 2.0: 480 Mbps transfer speed</li>
                        <li>USB 3.0/3.1: 5-10 Gbps transfer speed (blue ports)</li>
                        <li>USB-C: Reversible connector with up to 40 Gbps (Thunderbolt)</li>
                        <li>Supports plug-and-play functionality</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">HDMI & DisplayPort</h4>
                      <p className="text-sm text-muted-foreground">Video and audio output interfaces:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>HDMI: Common for TVs and monitors, supports 4K/8K</li>
                        <li>DisplayPort: Higher bandwidth, better for high refresh rates</li>
                        <li>Both carry digital video and audio signals</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Wireless Interfaces</h4>
                      <p className="text-sm text-muted-foreground">Connections without physical cables:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Bluetooth: Short-range wireless for peripherals</li>
                        <li>Wi-Fi: Wireless networking</li>
                        <li>NFC: Near Field Communication for close proximity data exchange</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Input & Output Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Input Devices</h4>
                      <p className="text-sm text-muted-foreground">Devices that send data to the computer:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Keyboard: Text and command input</li>
                        <li>Mouse/Trackpad: Cursor control and navigation</li>
                        <li>Microphone: Audio input</li>
                        <li>Webcam: Video input</li>
                        <li>Scanner: Document and image input</li>
                        <li>Game controllers: Specialized input for gaming</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Output Devices</h4>
                      <p className="text-sm text-muted-foreground">Devices that receive data from the computer:</p>
                      <ul className="mt-2 ml-6 list-disc text-sm [&>li]:mt-1">
                        <li>Monitor/Display: Visual output</li>
                        <li>Speakers/Headphones: Audio output</li>
                        <li>Printer: Physical document output</li>
                        <li>Projector: Large-scale visual output</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`p-4 md:col-span-2 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <CardTitle>Peripheral Connection Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-6 sm:-mx-2 md:mx-0">
                    <table className="w-full border-collapse text-[10px] xs:text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Device Type</th>
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Common Interfaces</th>
                          <th className="px-2 sm:px-4 py-1 sm:py-2 text-left">Connection Tips</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Keyboard & Mouse</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">USB, Bluetooth, PS/2 (legacy)</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            USB ports are interchangeable; wireless devices need batteries
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Monitor</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">HDMI, DisplayPort, VGA (legacy), DVI (legacy)</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            Use digital connections (HDMI/DisplayPort) for best quality
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Printer</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">USB, Wi-Fi, Ethernet</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            Network printers can be shared among multiple computers
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-2 sm:px-4 py-1 sm:py-2">External Storage</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">USB, Thunderbolt, eSATA</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Use USB 3.0+ for faster data transfer speeds</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Audio Devices</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">3.5mm audio jack, USB, Bluetooth</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">
                            Color-coded jacks: green (output), pink (mic), blue (line-in)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Networking</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Ethernet, Wi-Fi</td>
                          <td className="px-2 sm:px-4 py-1 sm:py-2">Wired connections are more stable than wireless</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="glossary" className="w-full py-4 sm:py-8 md:py-16 lg:py-32">
          <div className="container px-2 sm:px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">PC Terminology Glossary</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Common terms and acronyms you'll encounter in the world of computing.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>BIOS/UEFI</span>
                      <Badge variant="outline">Hardware</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Basic Input/Output System (BIOS)</strong> or{" "}
                      <strong>Unified Extensible Firmware Interface (UEFI)</strong> is firmware that initializes
                      hardware during the booting process before the operating system loads. It provides a settings
                      interface for configuring hardware parameters.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>CPU Cache</span>
                      <Badge variant="outline">Hardware</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>CPU Cache</strong> is a small amount of very fast memory built into the CPU. It stores
                      frequently accessed data to reduce the time needed to fetch data from the slower main memory
                      (RAM). Modern CPUs typically have L1, L2, and L3 cache levels, with L1 being the smallest but
                      fastest.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Overclocking</span>
                      <Badge variant="outline">Performance</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Overclocking</strong> is the process of running hardware components (typically CPU or GPU)
                      at higher speeds than their factory settings. This can improve performance but may generate more
                      heat, require better cooling, and potentially reduce component lifespan.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Operating System (OS)</span>
                      <Badge variant="outline">Software</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Operating System (OS)</strong> is the main software that manages computer hardware and
                      software resources. It provides common services for computer programs and acts as an intermediary
                      between applications and hardware. Common examples include Windows, macOS, Linux, and Chrome OS.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>IP Address</span>
                      <Badge variant="outline">Networking</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>IP Address (Internet Protocol Address)</strong> is a numerical label assigned to each
                      device connected to a computer network. IPv4 addresses consist of four numbers separated by
                      periods (e.g., 192.168.1.1), while IPv6 addresses use hexadecimal numbers separated by colons to
                      provide many more possible addresses.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Firmware</span>
                      <Badge variant="outline">Software</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Firmware</strong> is a type of software that provides low-level control for a device's
                      specific hardware. It's typically stored in non-volatile memory such as ROM or flash memory.
                      Unlike regular software, firmware is rarely updated by users and is essential for the basic
                      operation of hardware devices.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Driver</span>
                      <Badge variant="outline">Software</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Driver</strong> is a software component that allows the operating system to communicate
                      with hardware devices. Without the correct drivers, hardware components won't function properly.
                      Drivers are specific to both the hardware and the operating system being used.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Latency</span>
                      <Badge variant="outline">Performance</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Latency</strong> is the delay before a transfer of data begins following an instruction
                      for its transfer. In networking, it's often measured as ping time in milliseconds (ms). Lower
                      latency means faster response times, which is particularly important for online gaming and video
                      conferencing.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>Virtual Memory</span>
                      <Badge variant="outline">System</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Virtual Memory</strong> is a memory management technique that uses hard disk space to
                      supplement physical RAM. When RAM is full, less-used data is moved to a "page file" on the hard
                      drive, freeing up RAM for active processes. This allows computers to run more applications than
                      would be possible with physical RAM alone, though accessing data from virtual memory is much
                      slower.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <span>API (Application Programming Interface)</span>
                      <Badge variant="outline">Software</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>API (Application Programming Interface)</strong> is a set of rules and protocols that
                      allows different software applications to communicate with each other. APIs define the methods and
                      data formats that applications can use to request and exchange information, enabling integration
                      between different systems and services.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

