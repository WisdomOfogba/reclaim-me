"use client"

import { useState, useRef, type ChangeEvent } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Shield,
  Camera,
  Lock,
  Download,
  Moon,
  Sun,
  FileArchive,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export function UserProfile() {
  const { theme, setTheme } = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    preferredContact: "email",
    notifications: true,
    anonymousReporting: false,
    profileImage: "/placeholder.svg?height=200&width=200",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordFeedback, setPasswordFeedback] = useState("")
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  // Mock reports data for download selection
  const reports = [
    { id: "RPT-2024-001", type: "Financial Fraud", date: "2024-01-15", selected: false },
    { id: "RPT-2024-002", type: "Identity Theft", date: "2024-01-14", selected: false },
    { id: "RPT-2024-003", type: "Online Scam", date: "2024-01-13", selected: false },
    { id: "RPT-2024-004", type: "Investment Fraud", date: "2024-01-12", selected: false },
  ]

  const [selectedReports, setSelectedReports] = useState(reports)

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
      action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
    })
  }

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setProfile({ ...profile, profileImage: imageUrl })

      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully.",
      })
    }
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm({ ...passwordForm, [name]: value })

    if (name === "newPassword") {
      // Simple password strength check
      let strength = 0
      let feedback = ""

      if (value.length > 8) strength += 25
      if (/[A-Z]/.test(value)) strength += 25
      if (/[0-9]/.test(value)) strength += 25
      if (/[^A-Za-z0-9]/.test(value)) strength += 25

      if (strength <= 25) feedback = "Weak password"
      else if (strength <= 50) feedback = "Moderate password"
      else if (strength <= 75) feedback = "Good password"
      else feedback = "Strong password"

      setPasswordStrength(strength)
      setPasswordFeedback(feedback)
    }
  }

  const handleChangePassword = () => {
    setIsChangingPassword(true)

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
          description: "Please make sure your passwords match.",
        })
        return
      }

      // Reset form
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      })
    }, 1500)
  }

  const toggleReportSelection = (id: string) => {
    setSelectedReports(
      selectedReports.map((report) => (report.id === id ? { ...report, selected: !report.selected } : report)),
    )
  }

  const handleDownloadReports = () => {
    const selectedCount = selectedReports.filter((r) => r.selected).length

    if (selectedCount === 0) {
      toast({
        variant: "destructive",
        title: "No reports selected",
        description: "Please select at least one report to download.",
      })
      return
    }

    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)

          toast({
            title: "Download complete",
            description: `${selectedCount} reports have been downloaded as ZIP.`,
          })

          return 0
        }
        return prev + 10
      })
    }, 300)
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger className="shadow-none" value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                <div className="relative">
                  <Avatar
                    className="h-32 w-32 cursor-pointer border-2 border-muted hover:border-primary transition-colors"
                    onClick={handleProfileImageClick}
                  >
                    <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback className="text-3xl">
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={handleProfileImageClick}
                  >
                    <Camera className="h-4 w-4" />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Preferences
              </CardTitle>
              <CardDescription>Configure your privacy and notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select
                  value={profile.preferredContact}
                  onValueChange={(value) => setProfile({ ...profile, preferredContact: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your reports</p>
                </div>
                <Switch
                  checked={profile.notifications}
                  onCheckedChange={(checked) => setProfile({ ...profile, notifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Anonymous Reporting</Label>
                  <p className="text-sm text-muted-foreground">Submit reports without personal information</p>
                </div>
                <Switch
                  checked={profile.anonymousReporting}
                  onCheckedChange={(checked) => setProfile({ ...profile, anonymousReporting: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                />
                {passwordForm.newPassword && (
                  <>
                    <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
                    <p className="text-xs text-muted-foreground mt-1">{passwordFeedback}</p>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {passwordForm.newPassword && passwordForm.confirmPassword && (
                  <div className="flex items-center gap-1 mt-1">
                    {passwordForm.newPassword === passwordForm.confirmPassword ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <p className="text-xs text-green-500">Passwords match</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        <p className="text-xs text-red-500">Passwords do not match</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleChangePassword}
                disabled={
                  isChangingPassword ||
                  !passwordForm.currentPassword ||
                  !passwordForm.newPassword ||
                  !passwordForm.confirmPassword ||
                  passwordForm.newPassword !== passwordForm.confirmPassword
                }
              >
                {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isChangingPassword ? "Changing Password..." : "Change Password"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Enable Two-Factor Authentication</Button>
            </CardContent>
          </Card>

          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove all your data
                      from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="flex gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="flex items-center gap-2"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Text Size</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="text-xs">
                    Small
                  </Button>
                  <Button variant="default">Medium</Button>
                  <Button variant="outline" className="text-lg">
                    Large
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="downloads" className="space-y-6">
          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileArchive className="h-5 w-5" />
                Download Reports
              </CardTitle>
              <CardDescription>Download your reports as a ZIP archive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Select Reports to Download</h3>
                <div className="space-y-2">
                  {selectedReports.map((report) => (
                    <div key={report.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={report.id}
                        checked={report.selected}
                        onCheckedChange={() => toggleReportSelection(report.id)}
                      />
                      <Label htmlFor={report.id} className="flex-1">
                        {report.id} - {report.type} ({report.date})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {isDownloading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Downloading...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-2" />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleDownloadReports}
                  disabled={isDownloading || selectedReports.filter((r) => r.selected).length === 0}
                  className="flex items-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download as ZIP
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReports(selectedReports.map((r) => ({ ...r, selected: true })))
                  }}
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedReports(selectedReports.map((r) => ({ ...r, selected: false })))
                  }}
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="slate-50 dark:bg-slate-950">
            <CardHeader>
              <CardTitle>Export Account Data</CardTitle>
              <CardDescription>Download all your personal data</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export All Data
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Export Your Data</DialogTitle>
                    <DialogDescription>
                      This will generate a complete export of all your personal data and reports. The process may take a
                      few minutes.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2 py-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="personal-info" defaultChecked />
                      <Label htmlFor="personal-info">Personal Information</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="reports" defaultChecked />
                      <Label htmlFor="reports">All Reports</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="communications" defaultChecked />
                      <Label htmlFor="communications">Communications History</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Start Export</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
