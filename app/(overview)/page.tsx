"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Mail, Edit, Eye, Users, Clock, CheckCircle, ArrowRight } from "lucide-react"
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

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 py-12 from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/30 text-sm px-4 py-2">
                AI-Generated Reports
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              ReclaimMe
              <motion.span
                className="text-blue-600 dark:text-blue-400 block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Turn your scam story into real action in minutes.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              Got scammed online? You&apos;re not alone, and you&apos;re not powerless. ReclaimMe helps you fight back
              by turning your experience into ready-to-send reports, bank complaints, and action checklists.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto hover:scale-105 transition-transform"
                >
                  Start now
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn-more">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto hover:scale-105 transition-transform"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <AnimateWhenVisible>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Tools for Scam Victims
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-driven platform simplifies the process of reporting scams and communicating with authorities
            </p>
          </div>
        </AnimateWhenVisible>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px 0px" }}
        >
          <motion.div variants={itemVariants}>
            <Card className="border-2 hover:border-blue-200 pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:scale-105">
              <CardHeader className="text-center">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <FileText className="size-10 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                </motion.div>
                <CardTitle className="text-gray-900 dark:text-white text-xl">AI Letter Generation</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Advanced AI creates professional, legally-sound letters tailored to your specific incident
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="border-2 hover:border-blue-200 pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:scale-105">
              <CardHeader className="text-center">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Edit className="size-10 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                </motion.div>
                <CardTitle className="text-gray-900 dark:text-white text-xl">Edit & Customize</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Full editing capabilities to personalize your letters and add specific details about your case
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1">
            <Card className="border-2 hover:border-blue-200 pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:scale-105">
              <CardHeader className="text-center">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Eye className="size-10 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                </motion.div>
                <CardTitle className="text-gray-900 dark:text-white text-xl">Preview & Send</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Preview your letters before sending via email or downloading as PDF documents
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </section>
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <AnimateWhenVisible>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How ReclaimMe Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Get professional legal documentation in just a few simple steps
              </p>
            </div>
          </AnimateWhenVisible>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Report Incident",
                description: "Provide details about your scam or illegal activity experience",
              },
              {
                step: "2",
                title: "AI Generation",
                description: "Our AI creates professional letters for banks, police, and legal entities",
              },
              {
                step: "3",
                title: "Review & Edit",
                description: "Customize and preview your letters to ensure accuracy",
              },
              {
                step: "4",
                title: "Send & Download",
                description: "Email directly to recipients or download PDF copies for your records",
              },
            ].map((item, index) => (
              <AnimateWhenVisible key={index} delay={index * 0.2}>
                <div className="text-center">
                  <motion.div
                    className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </AnimateWhenVisible>
            ))}
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <AnimateWhenVisible>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Why Choose ReclaimMe?
              </h2>
            </AnimateWhenVisible>

            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px 0px" }}
            >
              {[
                {
                  icon: CheckCircle,
                  title: "Professional Documentation",
                  description: "Legally-sound letters that authorities take seriously",
                },
                {
                  icon: Clock,
                  title: "Save Time & Stress",
                  description: "Generate comprehensive reports in minutes, not hours",
                },
                {
                  icon: Users,
                  title: "Expert-Backed AI",
                  description: "Trained on legal best practices and successful case studies",
                },
                {
                  icon: Shield,
                  title: "Secure & Confidential",
                  description: "Your sensitive information is protected with enterprise-grade security",
                },
              ].map((benefit, index) => (
                <motion.div key={index} className="flex items-start space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                    <benefit.icon className="h-8 w-8 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimateWhenVisible delay={0.3}>
            <motion.div
              className="bg-gradient-to-b pt-12r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 lg:p-12 rounded-2xl border border-blue-100 dark:border-blue-800/30"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Mail className="h-20 w-20 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Take Action?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Join thousands of victims who have successfully reported scams and recovered their losses
                </p>
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg py-4"
                    >
                      Create Your First Report
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </AnimateWhenVisible>
        </div>
      </section>
    </div>
  )
}
