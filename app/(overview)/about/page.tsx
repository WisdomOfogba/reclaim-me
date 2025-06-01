"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Target, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Custom animation hook for elements that should animate when they come into view
type AnimateWhenVisibleProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

function AnimateWhenVisible({ children, className, delay = 0, duration = 0.5 }: AnimateWhenVisibleProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Wisdom Ofogba",
      role: "CEO & Co-Founder",
      description: "Fullstack Developer with a passion for social impact and legal tech",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Quadri Lasisi",
      role: "CTO & Co-Founder",
      description: "Fullstack Developer with a passion for AI and cybersecurity",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Chiebidolu Chinaemerem",
      role: "CFO & Co-Founder",
      description: "Fullstack Developer with a focus on financial technology",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 pt-12 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
              About ReclaimMe
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Empowering Victims,
            <motion.span
              className="text-blue-600 dark:text-blue-400 block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Fighting Fraud
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            We believe every scam victim deserves access to professional legal assistance. Our mission is to democratize
            justice through AI-powered technology that levels the playing field against fraudsters.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            <motion.div variants={itemVariants}>
              <motion.div variants={cardHoverVariants} whileHover="hover">
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-center h-full">
                  <CardHeader>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <Target className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                    </motion.div>
                    <CardTitle className="text-blue-800 dark:text-blue-300 text-xl">Our Mission</CardTitle>
                    <CardContent className="p-0">
                      <p className="text-blue-700 dark:text-blue-400">
                        To provide every scam victim with immediate access to professional-grade legal documentation,
                        empowering them to seek justice and recover their losses.
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div variants={cardHoverVariants} whileHover="hover">
                <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-center h-full">
                  <CardHeader>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Heart className="h-16 w-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                    </motion.div>
                    <CardTitle className="text-green-800 dark:text-green-300 text-xl">Our Values</CardTitle>
                    <CardContent className="p-0">
                      <p className="text-green-700 dark:text-green-400">
                        Compassion, integrity, and innovation drive everything we do. We understand the trauma of being
                        scammed and work tirelessly to restore hope and dignity.
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div variants={cardHoverVariants} whileHover="hover">
                <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-center h-full">
                  <CardHeader>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <Globe className="h-16 w-16 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                    </motion.div>
                    <CardTitle className="text-purple-800 dark:text-purple-300 text-xl">Our Vision</CardTitle>
                    <CardContent className="p-0">
                      <p className="text-purple-700 dark:text-purple-400">
                        A world where scammers face swift consequences and victims have the tools they need to fight
                        back effectively and recover their losses.
                      </p>
                    </CardContent>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <AnimateWhenVisible>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Meet Our Team
            </h2>
          </AnimateWhenVisible>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px 0px" }}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <motion.div
                        className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      >
                        <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <CardTitle className="text-gray-900 dark:text-white text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                        {member.role}
                      </CardDescription>
                      <CardContent className="p-0">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <AnimateWhenVisible>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Together, we can create a world where scam victims have the tools they need to fight back and seek
              justice.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/signup">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Get Started Today
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                    Partner With Us
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </AnimateWhenVisible>
      </section>
    </div>
  )
}
