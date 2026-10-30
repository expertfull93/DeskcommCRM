"use client";

import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme";
import { useT } from "@/hooks/i18n/useT";
import { Check, Moon, Sun, MonitorPlay } from "@/lib/ui/icons";
import { Button } from "@/components/ui/button";
import { APPEARANCES } from "@/lib/appearance";

export function AppearancePicker() {
  const t = useT();
  const { appearance, setAppearance, theme, setTheme } = useTheme();
  return (
    <div className="julia-appearance space-y-8">
      <section aria-labelledby="appearance-heading">
        <h2 id="appearance-heading" className="text-base font-semibold">
          {t("Escolha seu visual")}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("A escolha fica salva neste navegador. Você pode mudar quando quiser.")}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {APPEARANCES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="julia-theme-option"
              aria-pressed={appearance === item.id}
              onClick={() => {
                setAppearance(item.id);
                setTheme(item.mode);
              }}
            >
              <span
                className="julia-theme-preview"
                style={
                  {
                    "--preview-bg": item.preview.bg,
                    "--preview-surface": item.preview.surface,
                    "--preview-border": item.preview.border,
                    "--preview-accent": item.preview.accent,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span className="julia-preview-sidebar">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="julia-preview-content">
                  <i />
                  <span>
                    <b />
                    <b />
                    <b />
                  </span>
                  <em />
                </span>
              </span>
              <span className="mt-4 flex items-center justify-between gap-2 font-semibold">
                {t(item.name)}
                {appearance === item.id ? <Check size={18} aria-label={t("Selecionado")} /> : null}
              </span>
              <span className="mt-1 block text-sm font-normal text-muted-foreground">
                {t(item.description)}
              </span>
            </button>
          ))}
        </div>
      </section>
      <section aria-labelledby="brightness-heading">
        <h2 id="brightness-heading" className="text-base font-semibold">
          {t("Modo de exibição")}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { id: "light", name: "Claro", Icon: Sun },
              { id: "dark", name: "Escuro", Icon: Moon },
              { id: "system", name: "Automático", Icon: MonitorPlay },
            ] as const
          ).map(({ id, name, Icon }) => (
            <Button
              key={id}
              variant={theme === id ? "default" : "outline"}
              aria-pressed={theme === id}
              onClick={() => setTheme(id)}
            >
              <Icon size={16} aria-hidden />
              {t(name)}
            </Button>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("O modo automático acompanha a preferência de claro ou escuro do seu dispositivo.")}
        </p>
      </section>
    </div>
  );
}
