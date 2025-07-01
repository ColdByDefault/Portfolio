// src/components/Technologies.tsx
"use client";

import { motion } from "framer-motion";
import { techGroups } from "@/data/tech";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Technologies() {
  return (
    <section className="px-4 max-w-7xl mx-auto flex flex-col space-y-8" id="tech">
      <Card className="border-0 dark:bg-transparent">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-4xl font-light">
            Technologies I Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techGroups.map((group) => (
              <Card key={group.category}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-center">
                    {group.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {group.items.map(({ name, Icon }) => (
                      <motion.div
                        key={name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:shadow-sm transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <motion.div
        className="text-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, delay: 2 }}
      >
        <p className="text-muted-foreground">
          ...and many more technologies in my toolkit
        </p>
      </motion.div>
    </section>
  );
}
