import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "FadeScore <welcome@fadescore.com>";
const ADMIN_EMAIL = "welcome@fadescore.com";

export async function sendIntakeNotification(submission: {
  email: string;
  barberName?: string;
  shopName?: string;
  city?: string;
  state?: string;
  customName?: string;
  customShopName?: string;
  notListed?: boolean;
}) {
  const subject = submission.notListed
    ? `New barber intake: ${submission.customName ?? "Unknown"} (not listed)`
    : `Barber intake: ${submission.barberName ?? "Unknown"} at ${submission.shopName ?? "Unknown"}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    text: `New intake submission from ${submission.email}\n\n${JSON.stringify(submission, null, 2)}`,
  });
}

export async function sendClaimNotification(claim: {
  shopName: string;
  email: string;
  name: string;
  role: string;
  message?: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `Shop claim request: ${claim.shopName} by ${claim.name}`,
    text: `Claim request from ${claim.email}\nRole: ${claim.role}\nShop: ${claim.shopName}\nMessage: ${claim.message ?? "N/A"}`,
  });
}

export async function sendVerificationCode(email: string, code: string) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your FadeScore verification code: ${code}`,
    text: `Your verification code is: ${code}\n\nThis code expires in 15 minutes.\n\n— FadeScore`,
  });
}
