type ResetOptions = {
  email: string;
  firstName: string;
  link: string;
};

export default function PasswordReset({
  email,
  firstName,
  link,
}: ResetOptions) {
  return <div>Reset Password</div>;
}
