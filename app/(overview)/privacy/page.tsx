import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, UserCheck, Database } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Privacy Policy
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Your Privacy
            <span className="text-blue-600 dark:text-blue-400 block">Is Our Priority</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We understand the sensitive nature of your information and are committed to protecting your privacy with the
            highest standards of security and transparency.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: December 2024</p>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Privacy Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Data Protection</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Your data is encrypted and protected with enterprise-grade security measures.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Transparency</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We clearly explain what data we collect and how we use it.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <UserCheck className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">User Control</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    You have full control over your data and can modify or delete it anytime.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Privacy Policy */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Name and contact information (email, phone number)</li>
                    <li>• Account credentials and authentication data</li>
                    <li>• Incident details you provide for letter generation</li>
                    <li>• Communication preferences and support interactions</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Information</h3>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Device information and browser type</li>
                    <li>• IP address and location data (for security purposes)</li>
                    <li>• Usage analytics and platform interaction data</li>
                    <li>• Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ul className="text-gray-600 dark:text-gray-300 space-y-3">
                    <li>
                      • <strong>Letter Generation:</strong> To create personalized legal documents based on your
                      incident details
                    </li>
                    <li>
                      • <strong>Account Management:</strong> To provide access to your account and maintain your
                      preferences
                    </li>
                    <li>
                      • <strong>Customer Support:</strong> To respond to your inquiries and provide assistance
                    </li>
                    <li>
                      • <strong>Security:</strong> To protect against fraud, abuse, and unauthorized access
                    </li>
                    <li>
                      • <strong>Service Improvement:</strong> To enhance our AI models and platform functionality
                    </li>
                    <li>
                      • <strong>Legal Compliance:</strong> To comply with applicable laws and regulations
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Sharing and Disclosure</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We do not sell, rent, or share your personal information with third parties except in the following
                    limited circumstances:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>
                      • <strong>With your consent:</strong> When you explicitly authorize us to share information
                    </li>
                    <li>
                      • <strong>Service providers:</strong> With trusted partners who help us operate our platform
                      (under strict confidentiality agreements)
                    </li>
                    <li>
                      • <strong>Legal requirements:</strong> When required by law, court order, or to protect our legal
                      rights
                    </li>
                    <li>
                      • <strong>Safety purposes:</strong> To prevent harm to you or others in emergency situations
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                      <CardTitle className="text-gray-900 dark:text-white text-lg">Encryption</CardTitle>
                      <CardContent className="p-0">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          All data is encrypted in transit and at rest using AES-256 encryption standards.
                        </p>
                      </CardContent>
                    </CardHeader>
                  </Card>

                  <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <Database className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                      <CardTitle className="text-gray-900 dark:text-white text-lg">Secure Storage</CardTitle>
                      <CardContent className="p-0">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Data is stored in secure, SOC 2 compliant data centers with multiple layers of protection.
                        </p>
                      </CardContent>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your Rights and Choices</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>
                      • <strong>Access:</strong> Request a copy of the personal information we hold about you
                    </li>
                    <li>
                      • <strong>Correction:</strong> Update or correct inaccurate personal information
                    </li>
                    <li>
                      • <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                      requirements)
                    </li>
                    <li>
                      • <strong>Portability:</strong> Receive your data in a structured, machine-readable format
                    </li>
                    <li>
                      • <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
                    </li>
                    <li>
                      • <strong>Restriction:</strong> Request limitation of processing in certain circumstances
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">International Data Transfers</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    If you are located outside the United States, please note that we may transfer your information to
                    and process it in the United States and other countries. We ensure appropriate safeguards are in
                    place to protect your information in accordance with applicable data protection laws, including GDPR
                    for European users.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <ul className="text-blue-700 dark:text-blue-400 space-y-2">
                    <li>• Email: privacy@scamguard.com</li>
                    <li>• Phone: 1-800-SCAM-HELP</li>
                    <li>• Mail: ScamGuard Privacy Team, 123 Justice Street, Legal District, LD 12345</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
