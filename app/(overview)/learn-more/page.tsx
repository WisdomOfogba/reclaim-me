import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Brain, FileText, Users, Lock, Zap, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">

      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Learn More About ReclaimMe
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Empowering Victims with
            <span className="text-blue-600 dark:text-blue-400 block">AI-Powered Justice</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Discover how our advanced AI technology helps scam victims create professional legal documentation and take
            meaningful action against fraudsters.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            The Challenge Victims Face
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-300">Complex Legal Processes</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-400">
                  Victims often struggle with complicated legal procedures and don&apos;t know where to start
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-300">Time-Consuming Documentation</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-400">
                  Creating proper legal letters can take hours or days, delaying critical reporting
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-300">Expensive Legal Fees</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-400">
                  Professional legal assistance can cost thousands, making it inaccessible to many victims
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <CardHeader>
                <CardTitle className="text-red-800 dark:text-red-300">Emotional Stress</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-400">
                  The trauma of being scammed is compounded by navigating complex reporting systems
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How ReclaimMe Solves These Problems
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <Brain className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-green-800 dark:text-green-300">AI-Powered Intelligence</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    Our advanced AI understands legal requirements and generates appropriate documentation automatically
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <Zap className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-green-800 dark:text-green-300">Instant Generation</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    Create professional legal letters in minutes, not hours or days
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <Shield className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-green-800 dark:text-green-300">Affordable Access</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    Professional-grade legal assistance at a fraction of traditional legal costs
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-green-800 dark:text-green-300">User-Friendly Interface</CardTitle>
                  <CardDescription className="text-green-700 dark:text-green-400">
                    Simple, intuitive design that reduces stress and makes the process straightforward
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Advanced AI Technology
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trained on Legal Best Practices</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Analyzed thousands of successful legal cases and documentation
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Understands requirements for different types of financial institutions
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Adapts language and tone for law enforcement agencies
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-300">
                    Continuously updated with latest legal standards and practices
                  </p>
                </div>
              </div>
            </div>
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <FileText className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-blue-800 dark:text-blue-300 text-xl">Smart Document Generation</CardTitle>
                <CardContent className="p-0">
                  <p className="text-blue-700 dark:text-blue-400 leading-relaxed">
                    Our AI analyzes your incident details and automatically selects the appropriate legal language,
                    formatting, and structure for maximum effectiveness with your intended recipients.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Your Security is Our Priority
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Lock className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">End-to-End Encryption</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    All your data is encrypted both in transit and at rest using industry-standard protocols
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">GDPR Compliant</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    We follow strict data protection regulations and give you full control over your information
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                  <CardTitle className="text-gray-900 dark:text-white">No Data Sharing</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Your sensitive information is never shared with third parties or used for any other purpose
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of victims who have successfully used ReclaimMe to seek justice and recover their losses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
              >
                Start Your Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
