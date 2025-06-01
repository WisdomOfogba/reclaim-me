import { Resend, CreateEmailOptions } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

/** @throws */
export async function sendMail(data: Omit<CreateEmailOptions, "from">) {
  return resend.emails.send({
    from: "onboarding@resend.dev",
    ...data,
  } as CreateEmailOptions);
}
