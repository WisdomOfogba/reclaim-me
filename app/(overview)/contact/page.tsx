import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Get in Touch
            <span className="text-blue-600 dark:text-blue-400 block">We&apos;re Here to Help</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Have questions about ScamGuard? Need assistance with your case? Our dedicated support team is ready to help
            you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Email Support</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                support@scamguard.com
                <br />
                Response within 24 hours
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Live Chat</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Available 24/7
                <br />
                Instant responses
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Phone className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Phone Support</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                1-800-SCAM-HELP
                <br />
                Mon-Fri 9AM-6PM EST
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <Clock className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4 mx-auto" />
              <CardTitle className="text-gray-900 dark:text-white">Emergency</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Urgent cases
                <br />
                Priority support available
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Contact Form and Info */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white text-2xl">Send Us a Message</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <Input placeholder="John" className="bg-gray-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <Input placeholder="Doe" className="bg-gray-50 dark:bg-slate-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="bg-gray-50 dark:bg-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                <Input placeholder="How can we help you?" className="bg-gray-50 dark:bg-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <Textarea
                  placeholder="Please describe your question or issue in detail..."
                  rows={6}
                  className="bg-gray-50 dark:bg-slate-800"
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                <CardTitle className="text-blue-800 dark:text-blue-300">Our Office</CardTitle>
                <CardContent className="p-0">
                  <p className="text-blue-700 dark:text-blue-400">
                    123 Justice Street
                    <br />
                    Legal District, LD 12345
                    <br />
                    United States
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                <CardTitle className="text-green-800 dark:text-green-300">Business Hours</CardTitle>
                <CardContent className="p-0">
                  <div className="text-green-700 dark:text-green-400 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Emergency support only</p>
                    <p className="font-semibold mt-2">24/7 Live Chat Available</p>
                  </div>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
                <CardTitle className="text-purple-800 dark:text-purple-300">Quick Response</CardTitle>
                <CardContent className="p-0">
                  <p className="text-purple-700 dark:text-purple-400">
                    For urgent matters, use our live chat feature or call our emergency support line. We understand that
                    scam situations can be time-sensitive and we&apos;re here to help immediately.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
