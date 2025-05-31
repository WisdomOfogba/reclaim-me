import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Heart, Target, Award, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

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

  const milestones = [
    {
      year: "2025",
      title: "Company Founded",
      description:
        "ReclaimMe was born from personal experience with fraud and the frustration of complex legal processes.",
    },
    {
      year: "2025",
      title: "AI Platform Launch",
      description: "Released our first AI-powered letter generation tool, helping 1,000+ victims in the first month.",
    },
    {
      year: "2025",
      title: "10,000+ Letters Generated",
      description: "Reached a major milestone with over 10,000 professional legal documents created for victims.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            About ReclaimMe
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Empowering Victims,
            <span className="text-blue-600 dark:text-blue-400 block">Fighting Fraud</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We believe every scam victim deserves access to professional legal assistance. Our mission is to democratize
            justice through AI-powered technology that levels the playing field against fraudsters.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-center">
              <CardHeader>
                <Target className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                <CardTitle className="text-blue-800 dark:text-blue-300 text-xl">Our Mission</CardTitle>
                <CardContent className="p-0">
                  <p className="text-blue-700 dark:text-blue-400">
                    To provide every scam victim with immediate access to professional-grade legal documentation,
                    empowering them to seek justice and recover their losses.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-center">
              <CardHeader>
                <Heart className="h-16 w-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                <CardTitle className="text-green-800 dark:text-green-300 text-xl">Our Values</CardTitle>
                <CardContent className="p-0">
                  <p className="text-green-700 dark:text-green-400">
                    Compassion, integrity, and innovation drive everything we do. We understand the trauma of being
                    scammed and work tirelessly to restore hope and dignity.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-center">
              <CardHeader>
                <Globe className="h-16 w-16 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-purple-800 dark:text-purple-300 text-xl">Our Vision</CardTitle>
                <CardContent className="p-0">
                  <p className="text-purple-700 dark:text-purple-400">
                    A world where scammers face swift consequences and victims have the tools they need to fight back
                    effectively and recover their losses.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Story</h2>
            <div className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                ReclaimMe was founded in 2022 after our CEO, Sarah Chen, experienced a devastating investment scam that
                cost her family $50,000. The most frustrating part wasn't just the financial loss—it was the complex,
                time-consuming process of reporting the crime and seeking justice.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Sarah spent months navigating bureaucratic processes, drafting letters to banks and law enforcement, and
                trying to understand legal requirements. Despite her background in cybersecurity, she found the system
                overwhelming and inaccessible.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                That's when she partnered with AI researcher Michael Rodriguez to create a solution. They envisioned a
                platform that could instantly generate professional legal documents, making justice accessible to
                everyone—regardless of their legal knowledge or financial resources.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, ReclaimMe has helped over 10,000 victims generate professional legal documentation, with a 95%
                success rate in getting responses from financial institutions and law enforcement agencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 text-center">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                    <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </CardDescription>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{member.description}</p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Journey
            </h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white text-xl">{milestone.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-center">
              <CardHeader>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10,000+</div>
                <CardTitle className="text-blue-800 dark:text-blue-300">Letters Generated</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-400">
                  Professional legal documents created for victims
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-center">
              <CardHeader>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
                <CardTitle className="text-green-800 dark:text-green-300">Success Rate</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-400">
                  Positive responses from institutions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-center">
              <CardHeader>
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$2.5M+</div>
                <CardTitle className="text-purple-800 dark:text-purple-300">Recovered</CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-400">
                  Total amount recovered by our users
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 text-center">
              <CardHeader>
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                <CardTitle className="text-orange-800 dark:text-orange-300">Support</CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-400">
                  Round-the-clock assistance for victims
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12">Awards & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Award className="h-16 w-16 text-yellow-600 dark:text-yellow-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">TechCrunch Disrupt</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Winner - Best Social Impact Startup 2023
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Shield className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">Cybersecurity Excellence</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Outstanding Data Protection Award 2024
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Users className="h-16 w-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">Consumer Choice</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Top Rated Legal Tech Platform 2024
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Together, we can create a world where scam victims have the tools they need to fight back and seek justice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
