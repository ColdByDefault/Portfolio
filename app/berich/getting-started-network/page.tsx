"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Network, Wifi, Globe, Server, Database, Layers, Share2 } from "lucide-react"
import { useTheme } from "next-themes"


export default function NetworkingDocs() {
  const { theme } = useTheme()


  return (
    <div
      className={`flex flex-col justify-center items-center flex-grow p-1 sm:p-2 md:p-4 lg:p-8 ${theme === "dark" ? "dark" : "light"}`}>
      <div className="w-full max-w-5xl ">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Networking Fundamentals</h1>
          <p className="text-sm md:text-base">
            A comprehensive guide to basic networking concepts
          </p>
        </header>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full auto-cols-max grid-flow-col overflow-auto">
            <TabsTrigger value="basics"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Basics</TabsTrigger>
            <TabsTrigger value="ip"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">IP Addressing</TabsTrigger>
            <TabsTrigger value="dns"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">DNS</TabsTrigger>
            <TabsTrigger value="protocols"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Protocols</TabsTrigger>
            <TabsTrigger value="osi"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">OSI Model</TabsTrigger>
            <TabsTrigger value="architecture"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Architecture</TabsTrigger>
            <TabsTrigger value="security"className="border font-semibold shadow-sm shadow-zinc-600 mx-1
                cursor-pointer focus:border-gray-500">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="basics">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>

              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Network className="h-5 w-5" />
                  What is a Network?
                </CardTitle>
                <CardDescription>Understanding the fundamentals of computer networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6">
                <p>
                  A <strong>computer network</strong> is a group of computers and other devices that are connected
                  together to share resources and communicate with each other.
                </p>

                <h3 className="text-lg font-medium mt-4">Types of Networks</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>LAN (Local Area Network)</strong>: A network confined to a small geographic area, like a
                    home, office, or building.
                  </li>
                  <li>
                    <strong>WAN (Wide Area Network)</strong>: A network that spans a large geographic area, like a city,
                    country, or even globally.
                  </li>
                  <li>
                    <strong>MAN (Metropolitan Area Network)</strong>: A network that spans a city or large campus.
                  </li>
                  <li>
                    <strong>PAN (Personal Area Network)</strong>: A network for connecting devices centered around an
                    individual person.
                  </li>
                </ul>

                <h3 className="text-lg font-medium mt-4">Network Topologies</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="border rounded-md p-2 sm:p-4">
                    <h4 className="font-medium text-sm sm:text-base">Star Topology</h4>
                    <p className="text-xs sm:text-sm">All devices connect to a central hub or switch.</p>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4">
                    <h4 className="font-medium text-sm sm:text-base">Bus Topology</h4>
                    <p className="text-xs sm:text-sm">All devices connect to a single cable or backbone.</p>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4">
                    <h4 className="font-medium text-sm sm:text-base">Ring Topology</h4>
                    <p className="text-xs sm:text-sm">Devices connect in a circular pattern.</p>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4">
                    <h4 className="font-medium text-sm sm:text-base">Mesh Topology</h4>
                    <p className="text-xs sm:text-sm">Devices connect to multiple other devices for redundancy.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ip">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  IP Addressing & Subnetting
                </CardTitle>
                <CardDescription>Understanding IP addresses and how networks are divided</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6">
                <h3 className="text-lg font-medium">IP Addresses</h3>
                <p>
                  An <strong>IP address</strong> is a unique identifier assigned to each device on a network. It serves
                  two main functions:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Host or network interface identification</li>
                  <li>Location addressing</li>
                </ul>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">IPv4</h4>
                  <p>32-bit address written in four octets (e.g., 192.168.1.1)</p>

                  <h4 className="font-medium mt-3">IPv6</h4>
                  <p>
                    128-bit address written in eight groups of hexadecimal digits (e.g.,
                    2001:0db8:85a3:0000:0000:8a2e:0370:7334)
                  </p>
                </div>

                <h3 className="text-lg font-medium mt-6">Subnetting</h3>
                <p>
                  <strong>Subnetting</strong> is the practice of dividing a network into two or more smaller networks.
                </p>

                <div className="w-full overflow-auto">
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>CIDR Notation</TableHead>
                        <TableHead>Subnet Mask</TableHead>
                        <TableHead>Available Hosts</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>/24</TableCell>
                        <TableCell>255.255.255.0</TableCell>
                        <TableCell>254</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>/25</TableCell>
                        <TableCell>255.255.255.128</TableCell>
                        <TableCell>126</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>/26</TableCell>
                        <TableCell>255.255.255.192</TableCell>
                        <TableCell>62</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>/27</TableCell>
                        <TableCell>255.255.255.224</TableCell>
                        <TableCell>30</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dns">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Domain Name System (DNS)
                </CardTitle>
                <CardDescription>How domain names are translated to IP addresses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3 sm:p-6">
                <p>
                  The <strong>Domain Name System (DNS)</strong> is a hierarchical and decentralized naming system for
                  computers, services, or other resources connected to the Internet or a private network.
                </p>

                <h3 className="text-lg font-medium mt-4">How DNS Works</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>User enters a URL in the browser (e.g., www.example.com)</li>
                  <li>The browser checks its cache for a DNS record</li>
                  <li>If not found, the request goes to the resolver server (usually your ISP)</li>
                  <li>The resolver checks its cache, then queries root servers if needed</li>
                  <li>Root servers direct to TLD servers (.com, .org, etc.)</li>
                  <li>TLD servers direct to authoritative name servers</li>
                  <li>Authoritative name servers return the IP address</li>
                  <li>The resolver caches the result and returns it to the browser</li>
                  <li>The browser connects to the web server using the IP address</li>
                </ol>

                <h3 className="text-lg font-medium mt-6">DNS Record Types</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">A Record</h4>
                    <p>Maps a domain to an IPv4 address</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">AAAA Record</h4>
                    <p>Maps a domain to an IPv6 address</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">CNAME Record</h4>
                    <p>Maps a domain to another domain</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">MX Record</h4>
                    <p>Specifies mail servers for the domain</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">TXT Record</h4>
                    <p>Stores text information for various purposes</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <h4 className="font-medium">NS Record</h4>
                    <p>Specifies authoritative name servers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="protocols">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Network Protocols
                </CardTitle>
                <CardDescription>Standard rules that allow devices to communicate</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-4">
                <p>
                  <strong>Network protocols</strong> are sets of established rules that dictate how data is transmitted
                  between different devices in the same network.
                </p>

                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="tcp-ip">
                    <AccordionTrigger>TCP/IP Protocol Suite</AccordionTrigger>
                    <AccordionContent>
                      <p>The foundation of Internet communications, consisting of:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>TCP (Transmission Control Protocol)</strong>: Connection-oriented, reliable data
                          delivery
                        </li>
                        <li>
                          <strong>IP (Internet Protocol)</strong>: Addressing and routing packets
                        </li>
                        <li>
                          <strong>UDP (User Datagram Protocol)</strong>: Connectionless, faster but less reliable
                        </li>
                        <li>
                          <strong>ICMP (Internet Control Message Protocol)</strong>: Error reporting and diagnostics
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="application">
                    <AccordionTrigger>Application Layer Protocols</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium">HTTP/HTTPS</h4>
                          <p>Web browsing and data transfer</p>
                        </div>
                        <div>
                          <h4 className="font-medium">FTP</h4>
                          <p>File transfer between client and server</p>
                        </div>
                        <div>
                          <h4 className="font-medium">SMTP</h4>
                          <p>Sending email messages</p>
                        </div>
                        <div>
                          <h4 className="font-medium">POP3/IMAP</h4>
                          <p>Retrieving email messages</p>
                        </div>
                        <div>
                          <h4 className="font-medium">SSH</h4>
                          <p>Secure remote login and command execution</p>
                        </div>
                        <div>
                          <h4 className="font-medium">DNS</h4>
                          <p>Domain name resolution</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="routing">
                    <AccordionTrigger>Routing Protocols</AccordionTrigger>
                    <AccordionContent>
                      <p>Protocols that determine the best path for data to travel:</p>
                      <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>
                          <strong>OSPF (Open Shortest Path First)</strong>: Interior gateway protocol using link-state
                          routing algorithm
                        </li>
                        <li>
                          <strong>BGP (Border Gateway Protocol)</strong>: Exterior gateway protocol for routing between
                          autonomous systems
                        </li>
                        <li>
                          <strong>RIP (Routing Information Protocol)</strong>: Distance-vector routing protocol
                        </li>
                        <li>
                          <strong>EIGRP (Enhanced Interior Gateway Routing Protocol)</strong>: Advanced distance-vector
                          routing protocol
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="osi">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  OSI Model
                </CardTitle>
                <CardDescription>The 7-layer conceptual model for understanding network communications</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-4">
                <p>
                  The <strong>OSI (Open Systems Interconnection) Model</strong> is a conceptual framework used to
                  understand and implement network communications between different systems.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      layer: 7,
                      name: "Application Layer",
                      description: "Interfaces directly with end-user applications",
                      examples: "HTTP, FTP, SMTP, DNS, Telnet",
                    },
                    {
                      layer: 6,
                      name: "Presentation Layer",
                      description: "Translates, encrypts, and compresses data",
                      examples: "SSL/TLS, JPEG, MPEG, ASCII, Unicode",
                    },
                    {
                      layer: 5,
                      name: "Session Layer",
                      description: "Establishes, manages, and terminates connections",
                      examples: "NetBIOS, RPC, SOCKS",
                    },
                    {
                      layer: 4,
                      name: "Transport Layer",
                      description: "End-to-end communication and error recovery",
                      examples: "TCP, UDP, SCTP",
                    },
                    {
                      layer: 3,
                      name: "Network Layer",
                      description: "Routing and forwarding of data packets",
                      examples: "IP, ICMP, OSPF, BGP",
                    },
                    {
                      layer: 2,
                      name: "Data Link Layer",
                      description: "Node-to-node data transfer and error detection",
                      examples: "Ethernet, PPP, HDLC, Frame Relay",
                    },
                    {
                      layer: 1,
                      name: "Physical Layer",
                      description: "Transmission of raw bit stream over physical medium",
                      examples: "Ethernet cables, fiber optic, wireless",
                    },
                  ].map((layer) => (
                    <div key={layer.layer} className="border rounded-md p-2 sm:p-4">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
                          {layer.layer}
                        </span>
                        <h3 className="text-sm sm:text-lg font-medium">{layer.name}</h3>
                      </div>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm">{layer.description}</p>
                      <div className="mt-1 sm:mt-2">
                        <span className="text-xs sm:text-sm font-medium">Examples: </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">{layer.examples}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium">Data Encapsulation</h3>
                  <p className="mt-2">
                    As data travels down the OSI layers from sender to network, each layer adds its own header (and
                    sometimes trailer) information. This process is called encapsulation. The reverse process,
                    decapsulation, happens as data travels up the layers at the receiving end.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Network Architecture
                </CardTitle>
                <CardDescription>Common network design patterns and models</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-4">
                <h3 className="text-lg font-medium">Client-Server Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p>
                      In a <strong>client-server architecture</strong>, clients request services or resources, and
                      servers provide them. This is the most common network architecture on the internet.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                      <li>
                        <strong>Clients</strong>: End-user devices that request services (computers, smartphones, etc.)
                      </li>
                      <li>
                        <strong>Servers</strong>: Powerful computers that provide services (web servers, database
                        servers, etc.)
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4 flex flex-col items-center justify-center">
                    <div className="text-center mb-2 sm:mb-4">
                      <div className="inline-block p-2 border rounded-md mb-2 text-sm">Server</div>
                      <div className="h-10 sm:h-16 border-l-2 mx-auto"></div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div className="text-center">
                        <div className="h-6 sm:h-10 border-t-2 w-10 sm:w-16 mx-auto"></div>
                        <div className="inline-block p-1 sm:p-2 border rounded-md text-xs sm:text-sm">Client</div>
                      </div>
                      <div className="text-center">
                        <div className="h-6 sm:h-10 border-t-2 w-10 sm:w-16 mx-auto"></div>
                        <div className="inline-block p-1 sm:p-2 border rounded-md text-xs sm:text-sm">Client</div>
                      </div>
                      <div className="text-center">
                        <div className="h-6 sm:h-10 border-t-2 w-10 sm:w-16 mx-auto"></div>
                        <div className="inline-block p-1 sm:p-2 border rounded-md text-xs sm:text-sm">Client</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6">Peer-to-Peer Architecture</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p>
                      In a <strong>peer-to-peer (P2P) architecture</strong>, computers can act as both clients and
                      servers, sharing resources directly with each other without a central server.
                    </p>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                      <li>Decentralized structure</li>
                      <li>Each peer can be both provider and consumer</li>
                      <li>Examples: BitTorrent, blockchain networks</li>
                    </ul>
                  </div>
                  <div className="border rounded-md p-2 sm:p-4 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-3 sm:gap-6">
                      <div className="text-center">
                        <div className="inline-block p-1 sm:p-2 border rounded-md mb-1 sm:mb-2 text-xs sm:text-sm">
                          Peer
                        </div>
                        <div className="border-b-2 w-full"></div>
                        <div className="border-r-2 h-6 sm:h-10 mx-auto"></div>
                      </div>
                      <div className="text-center">
                        <div className="inline-block p-1 sm:p-2 border rounded-md mb-1 sm:mb-2 text-xs sm:text-sm">
                          Peer
                        </div>
                        <div className="border-b-2 w-full"></div>
                        <div className="border-l-2 h-6 sm:h-10 mx-auto"></div>
                      </div>
                      <div className="text-center">
                        <div className="border-r-2 h-6 sm:h-10 mx-auto"></div>
                        <div className="border-t-2 w-full"></div>
                        <div className="inline-block p-1 sm:p-2 border rounded-md mt-1 sm:mt-2 text-xs sm:text-sm">
                          Peer
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="border-l-2 h-6 sm:h-10 mx-auto"></div>
                        <div className="border-t-2 w-full"></div>
                        <div className="inline-block p-1 sm:p-2 border rounded-md mt-1 sm:mt-2 text-xs sm:text-sm">
                          Peer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6">Three-Tier Architecture</h3>
                <p>
                  A <strong>three-tier architecture</strong> separates applications into three logical and physical
                  computing tiers:
                </p>
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                  <li>
                    <strong>Presentation tier</strong>: User interface (web browser, mobile app)
                  </li>
                  <li>
                    <strong>Application tier</strong>: Business logic processing (application servers)
                  </li>
                  <li>
                    <strong>Data tier</strong>: Data storage and management (database servers)
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className={`p-1 sm:p-2 md:p-4 ${theme === "dark" ? "dark" : "light"}`}>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Network Security
                </CardTitle>
                <CardDescription>Protecting network infrastructure and data</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 space-y-4">
                <p>
                  <strong>Network security</strong> consists of policies and practices adopted to prevent and monitor
                  unauthorized access, misuse, modification, or denial of computer networks and network-accessible
                  resources.
                </p>

                <h3 className="text-lg font-medium mt-4">Security Components</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">Firewalls</h4>
                    <p>
                      Monitor and filter incoming and outgoing network traffic based on predetermined security rules.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">VPN (Virtual Private Network)</h4>
                    <p>
                      Extends a private network across a public network, enabling users to send and receive data as if
                      their devices were directly connected to the private network.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">IDS/IPS</h4>
                    <p>
                      Intrusion Detection Systems and Intrusion Prevention Systems monitor network traffic for
                      suspicious activity and take action to prevent threats.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">Encryption</h4>
                    <p>
                      Process of encoding information to prevent unauthorized access. Common protocols include SSL/TLS,
                      IPsec, and SSH.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mt-6">Common Network Attacks</h3>
                <div className="w-full overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attack Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Prevention</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>DDoS</TableCell>
                        <TableCell>
                          Distributed Denial of Service - overwhelming a system with traffic from multiple sources
                        </TableCell>
                        <TableCell>Traffic filtering, rate limiting, CDN services</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Man-in-the-Middle</TableCell>
                        <TableCell>Intercepting communication between two parties</TableCell>
                        <TableCell>Encryption (HTTPS), certificate validation</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phishing</TableCell>
                        <TableCell>Deceptive attempts to steal sensitive information</TableCell>
                        <TableCell>User education, email filtering</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Port Scanning</TableCell>
                        <TableCell>Probing a server for open ports</TableCell>
                        <TableCell>Firewalls, closing unnecessary ports</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <h3 className="text-lg font-medium mt-6">Security Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Implement defense in depth (multiple layers of security)</li>
                  <li>Keep all systems and software updated with security patches</li>
                  <li>Use strong authentication methods (MFA where possible)</li>
                  <li>Segment networks to limit the impact of breaches</li>
                  <li>Regularly back up critical data</li>
                  <li>Conduct security audits and penetration testing</li>
                  <li>Develop and maintain security policies and procedures</li>
                  <li>Train users on security awareness</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

