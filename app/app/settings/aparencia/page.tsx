import type { Metadata } from "next";
import { AppearancePicker } from "@/components/theme/appearance-picker";
import { requireAuth } from "@/lib/auth/server";
import { traduzir } from "@/lib/i18n/dicionario";

export const metadata: Metadata = { title: "Temas de Jul-IA" };

export default async function AppearancePage() {
  const user = await requireAuth();
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 md:p-8">
      <header>
        <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {traduzir("Personalização", user.idioma)}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {traduzir("Temas de Jul-IA", user.idioma)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {traduzir("Seu espaço de trabalho, do seu jeito.", user.idioma)}
        </p>
      </header>
      <AppearancePicker />
    </div>
  );
}
