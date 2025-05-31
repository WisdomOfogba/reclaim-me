import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, Server, Key, AlertTriangle, CheckCircle, Globe } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-12 from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300">
            Security & Trust
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Enterprise-Grade
            <span className="text-blue-600 dark:text-blue-400 block">Security</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your sensitive information deserves the highest level of protection. We implement industry-leading security
            measures to keep your data safe and secure.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Comprehensive Security Measures
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Lock className="h-16 w-16 text-blue-600 dark:text-blue-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">End-to-End Encryption</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    All data is encrypted using AES-256 encryption both in transit and at rest, ensuring your
                    information remains protected at all times.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Server className="h-16 w-16 text-green-600 dark:text-green-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Secure Infrastructure</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Our platform runs on SOC 2 Type II compliant infrastructure with 24/7 monitoring and automated
                    threat detection.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Key className="h-16 w-16 text-purple-600 dark:text-purple-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Multi-Factor Authentication</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Optional MFA adds an extra layer of security to your account, protecting against unauthorized
                    access.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Eye className="h-16 w-16 text-orange-600 dark:text-orange-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Privacy by Design</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We collect only the minimum data necessary and implement privacy controls throughout our entire
                    system.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Threat Detection</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Advanced AI-powered threat detection systems monitor for suspicious activity and potential security
                    breaches.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Globe className="h-16 w-16 text-indigo-600 dark:text-indigo-400 mb-4 mx-auto" />
                <CardTitle className="text-gray-900 dark:text-white">Global Compliance</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We comply with international data protection regulations including GDPR, CCPA, and other privacy
                    laws.
                  </p>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Certifications */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Security Certifications & Compliance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-gray-900 dark:text-white text-xl">SOC 2 Type II</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300">
                      Independently audited and certified for security, availability, processing integrity,
                      confidentiality, and privacy controls.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-gray-900 dark:text-white text-xl">GDPR Compliant</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300">
                      Full compliance with European General Data Protection Regulation, ensuring the highest standards
                      of data protection.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-gray-900 dark:text-white text-xl">ISO 27001</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300">
                      International standard for information security management systems, demonstrating our commitment
                      to security best practices.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>

              <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
                  <CardTitle className="text-gray-900 dark:text-white text-xl">CCPA Compliant</CardTitle>
                  <CardContent className="p-0">
                    <p className="text-gray-600 dark:text-gray-300">
                      Compliance with California Consumer Privacy Act, providing transparency and control over personal
                      information.
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Security Practices</h2>
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Data Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All sensitive data is encrypted using industry-standard AES-256 encryption. This includes:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Data in transit (TLS 1.3)</li>
                <li>• Data at rest (AES-256)</li>
                <li>• Database encryption</li>
                <li>• Backup encryption</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Access Controls</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We implement strict access controls to ensure only authorized personnel can access your data:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Role-based access control (RBAC)</li>
                <li>• Principle of least privilege</li>
                <li>• Regular access reviews</li>
                <li>• Multi-factor authentication for all staff</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Monitoring & Incident Response</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our security team monitors our systems 24/7 and has established procedures for incident response:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Real-time security monitoring</li>
                <li>• Automated threat detection</li>
                <li>• Incident response team</li>
                <li>• Regular security audits</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Employee Security Training</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                All ReclaimMe employees undergo comprehensive security training:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Security awareness training</li>
                <li>• Data handling procedures</li>
                <li>• Incident reporting protocols</li>
                <li>• Regular security updates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="bg-gray-50 dark:bg-slate-900/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Report Security Issues</h2>
            <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4">Found a Security Vulnerability?</h3>
              <p className="text-red-700 dark:text-red-400 mb-6">
                We take security seriously and appreciate responsible disclosure of security vulnerabilities. If you
                discover a security issue, please contact our security team immediately.
              </p>
              <div className="space-y-2 text-red-700 dark:text-red-400">
                <p>Email: security@ReclaimMe.com</p>
                <p>PGP Key: Available upon request</p>
                <p>Response Time: Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
