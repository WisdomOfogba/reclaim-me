import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Heart,
  Target,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Wisdom Ofogba",
      role: "CEO & Co-Founder",
      description:
        "Fullstack Developer with a passion for social impact and legal tech",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Quadri Lasisi",
      role: "CTO & Co-Founder",
      description:
        "Fullstack Developer with a passion for AI and cybersecurity",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Chiebidolu Chinaemerem",
      role: "CFO & Co-Founder",
      description: "Fullstack Developer with a focus on financial technology",
      image: "/placeholder.svg?height=200&width=200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 pt-12 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            About ReclaimMe
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Empowering Victims,
            <span className="text-blue-600 dark:text-blue-400 block">
              Fighting Fraud
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We believe every scam victim deserves access to professional legal
            assistance. Our mission is to democratize justice through AI-powered
            technology that levels the playing field against fraudsters.
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
                <CardTitle className="text-blue-800 dark:text-blue-300 text-xl">
                  Our Mission
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-blue-700 dark:text-blue-400">
                    To provide every scam victim with immediate access to
                    professional-grade legal documentation, empowering them to
                    seek justice and recover their losses.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-center">
              <CardHeader>
                <Heart className="h-16 w-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                <CardTitle className="text-green-800 dark:text-green-300 text-xl">
                  Our Values
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-green-700 dark:text-green-400">
                    Compassion, integrity, and innovation drive everything we
                    do. We understand the trauma of being scammed and work
                    tirelessly to restore hope and dignity.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-center">
              <CardHeader>
                <Globe className="h-16 w-16 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-purple-800 dark:text-purple-300 text-xl">
                  Our Vision
                </CardTitle>
                <CardContent className="p-0">
                  <p className="text-purple-700 dark:text-purple-400">
                    A world where scammers face swift consequences and victims
                    have the tools they need to fight back effectively and
                    recover their losses.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 text-center"
              >
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                    <Users className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white text-lg">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400 font-medium">
                    {member.role}
                  </CardDescription>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {member.description}
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Together, we can create a world where scam victims have the tools
            they need to fight back and seek justice.
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
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 w-full sm:w-auto"
              >
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
