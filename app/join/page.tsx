import { JoinPage } from "@/components/join-page";
import { resolveInterestForm } from "@/lib/interest-form";

export default function Join() {
  const form = resolveInterestForm(
    process.env.NEXT_PUBLIC_GIIYO_EATS_FORM_EMBED_URL,
  );
  return <JoinPage form={form} />;
}
