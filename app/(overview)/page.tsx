import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  FileText,
  Mail,
  Edit,
  Eye,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 py-12  from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/30 text-sm px-4 py-2">
              AI-Generated Reports
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              ReclaimMe
              <span className="text-blue-600 dark:text-blue-400 block">
                Turn your scam story into real action in minutes.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Got scammed online? You&apos;re not alone, and you&apos;re not powerless.
              ReclaimMe helps you fight back by turning your experience into
              ready-to-send reports, bank complaints, and action checklists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
                >
                  Start Your Report
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn-more">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 w-full sm:w-auto"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                10,000+
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Letters Generated
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                95%
              </div>
              <p className="text-gray-600 dark:text-gray-300">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Tools for Scam Victims
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-driven platform simplifies the process of reporting scams and
            communicating with authorities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-blue-200  pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <FileText className="size-10 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white text-xl">
                AI Letter Generation
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Advanced AI creates professional, legally-sound letters tailored
                to your specific incident
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200  pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <Edit className="size-10 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white text-xl">
                Edit & Customize
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Full editing capabilities to personalize your letters and add
                specific details about your case
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-blue-200 pb-2 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 md:col-span-2 lg:col-span-1">
            <CardHeader className="text-center">
              <Eye className="size-10 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white text-xl">
                Preview & Send
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Preview your letters before sending via email or downloading as
                PDF documents
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How ReclaimMe Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get professional legal documentation in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Report Incident",
                description:
                  "Provide details about your scam or illegal activity experience",
              },
              {
                step: "2",
                title: "AI Generation",
                description:
                  "Our AI creates professional letters for banks, police, and legal entities",
              },
              {
                step: "3",
                title: "Review & Edit",
                description:
                  "Customize and preview your letters to ensure accuracy",
              },
              {
                step: "4",
                title: "Send & Download",
                description:
                  "Email directly to recipients or download PDF copies for your records",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 dark:bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Why Choose ReclaimMe?
            </h2>
            <div className="space-y-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Professional Documentation",
                  description:
                    "Legally-sound letters that authorities take seriously",
                },
                {
                  icon: Clock,
                  title: "Save Time & Stress",
                  description:
                    "Generate comprehensive reports in minutes, not hours",
                },
                {
                  icon: Users,
                  title: "Expert-Backed AI",
                  description:
                    "Trained on legal best practices and successful case studies",
                },
                {
                  icon: Shield,
                  title: "Secure & Confidential",
                  description:
                    "Your sensitive information is protected with enterprise-grade security",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <benefit.icon className="h-8 w-8 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-b pt-12r from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 lg:p-12 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <div className="text-center">
              <Mail className="h-20 w-20 text-blue-600 dark:text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Take Action?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Join thousands of victims who have successfully reported scams
                and recovered their losses
              </p>
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg py-4"
                >
                  Create Your First Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
}
