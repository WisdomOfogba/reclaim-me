import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, FileText, Mail, Phone, Clock } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const faqs = [
    {
      question: "How does the AI letter generation work?",
      answer:
        "Our AI analyzes the details of your incident and uses advanced natural language processing to create professional, legally-appropriate letters. The AI has been trained on thousands of successful legal documents and understands the specific requirements for different types of recipients like banks, law enforcement, and legal entities.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, absolutely. We use enterprise-grade security measures including end-to-end encryption, secure data storage, and strict access controls. Your information is never shared with third parties, and we comply with all major data protection regulations including GDPR.",
    },
    {
      question: "Can I edit the generated letters?",
      answer:
        "Yes, you have full editing capabilities. After the AI generates your letter, you can review, modify, and customize it to include specific details about your case. You can also preview the letter before sending or downloading it.",
    },
    {
      question: "What types of scams can I report?",
      answer:
        "ScamGuard supports reporting for all types of scams including online fraud, identity theft, investment scams, romance scams, phishing attempts, credit card fraud, and more. Our AI adapts the letter content based on the type of incident you're reporting.",
    },
    {
      question: "How much does ScamGuard cost?",
      answer:
        "We offer flexible pricing plans to make our service accessible to all victims. We have a free tier for basic letter generation, and premium plans with additional features like priority support and advanced customization options.",
    },
    {
      question: "Can I send letters directly to recipients?",
      answer:
        "Yes, you can send letters directly via email through our platform, or you can download them as PDF files to send yourself. We also provide guidance on the best methods to contact different types of organizations.",
    },
    {
      question: "What if I need help with my case?",
      answer:
        "Our support team is available to help you through the process. We also provide resources and guidance on next steps after sending your letters. For complex legal matters, we can provide referrals to qualified legal professionals.",
    },
    {
      question: "How long does it take to generate a letter?",
      answer:
        "Most letters are generated within 1-2 minutes after you provide the incident details. The AI works quickly to analyze your information and create a professional document tailored to your specific situation.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Help Center
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            How Can We
            <span className="text-blue-600 dark:text-blue-400 block">Help You Today?</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Find answers to common questions, get support, and learn how to make the most of ScamGuard&apos;s features.
          </p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Getting Started</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Learn how to create your first report and generate letters
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <Search className="h-12 w-12 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Search FAQs</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Find quick answers to frequently asked questions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Live Chat</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Get instant help from our support team
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Email Support</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Send us a detailed message for complex issues
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Still Need Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-blue-800 dark:text-blue-300">24/7 Support</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-400">
                  Our support team is available around the clock to help you with any questions or issues.
                </CardDescription>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <Phone className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-green-800 dark:text-green-300">Emergency Assistance</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-400">
                  For urgent matters or if you&apos;re in immediate danger, contact law enforcement directly at 911.
                </CardDescription>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400"
                  >
                    Emergency Resources
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
