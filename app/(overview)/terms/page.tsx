import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, FileText, AlertTriangle, Shield } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Terms of Service
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Terms of
            <span className="text-blue-600 dark:text-blue-400 block">Service</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Please read these terms carefully before using ScamGuard. By accessing our platform, you agree to be bound
            by these terms and conditions.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: December 2024</p>
        </div>
      </section>

      {/* Key Points */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Key Terms Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <Scale className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Legal Assistance Tool</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    ScamGuard provides AI-generated legal documents but does not constitute legal advice or
                    representation.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">User Responsibility</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Users are responsible for reviewing and verifying all generated content before use.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Data Protection</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We maintain strict confidentiality and security standards for all user information.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-orange-600 dark:text-orange-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Limitation of Liability</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our liability is limited as outlined in the detailed terms below.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    By accessing and using ScamGuard, you accept and agree to be bound by the terms and provision of
                    this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    ScamGuard is an AI-powered platform that assists users in generating legal documents and letters for
                    reporting scams and illegal activities. Our service includes:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• AI-generated legal letters and documents</li>
                    <li>• Document editing and customization tools</li>
                    <li>• Email and download functionality</li>
                    <li>• Customer support and guidance</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. User Accounts and Registration
                </h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To use certain features of our service, you must register for an account. You agree to:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Provide accurate and complete information during registration</li>
                    <li>• Maintain the security of your password and account</li>
                    <li>• Notify us immediately of any unauthorized use of your account</li>
                    <li>• Accept responsibility for all activities under your account</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Acceptable Use Policy</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You agree not to use ScamGuard for any unlawful purpose or in any way that could damage, disable, or
                    impair the service. Prohibited activities include:
                  </p>
                  <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                    <li>• Generating false or fraudulent documents</li>
                    <li>• Harassing or threatening others</li>
                    <li>• Violating any applicable laws or regulations</li>
                    <li>• Attempting to gain unauthorized access to our systems</li>
                    <li>• Interfering with other users&apos; use of the service</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Disclaimer of Legal Advice</h2>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="text-yellow-800 dark:text-yellow-300 font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                  <p className="text-yellow-700 dark:text-yellow-400">
                    ScamGuard is a document generation tool and does not provide legal advice. The AI-generated
                    documents are templates and suggestions only. We strongly recommend consulting with a qualified
                    attorney for legal advice specific to your situation. We are not responsible for the legal
                    effectiveness or accuracy of generated documents.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Intellectual Property Rights
                </h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The ScamGuard platform, including its AI technology, design, and content, is protected by
                    intellectual property laws. You retain ownership of the content you input, while we retain ownership
                    of our platform and technology.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Limitation of Liability</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    To the maximum extent permitted by law, ScamGuard shall not be liable for any indirect, incidental,
                    special, consequential, or punitive damages, including without limitation, loss of profits, data,
                    use, goodwill, or other intangible losses, resulting from your use of the service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Termination</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    We may terminate or suspend your account and access to the service immediately, without prior
                    notice, for conduct that we believe violates these Terms of Service or is harmful to other users,
                    us, or third parties, or for any other reason.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Changes to Terms</h2>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes
                    via email or through our platform. Continued use of the service after changes constitutes acceptance
                    of the new terms.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Contact Information</h2>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-700 dark:text-blue-400 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <ul className="text-blue-700 dark:text-blue-400 space-y-2">
                    <li>• Email: legal@scamguard.com</li>
                    <li>• Phone: 1-800-SCAM-HELP</li>
                    <li>• Mail: ScamGuard Legal Team, 123 Justice Street, Legal District, LD 12345</li>
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
