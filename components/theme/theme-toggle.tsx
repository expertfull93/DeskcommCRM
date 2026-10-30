"use client";

import { useTheme } from "@/lib/theme";
import { useHotkeys } from "react-hotkeys-hook";
import { Sun, Moon, MonitorPlay } from "@/lib/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/i18n/useT";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/**
 * ⚠️ O ATALHO `mod+shift+l` MORA AQUI DENTRO, e por isso ele só existe onde
 * este componente está montado. Até 20/09/2026 o `ThemeToggle` só era montado
 * pelo `components/shell/UserMenu.tsx` (a casca do tenant), o que deixava TODA a
 * superfície de Admin Plataforma sem botão e sem atalho: quem entrava direto
 * lá — e o `install.sh` cria o dono como platform admin, então é onde muita
 * gente cai primeiro — ficava preso ao tema que estivesse valendo, sem
 * descobrir que a troca existia numa outra casca.
 *
 * `className` existe para a tarja do Modo Plataforma, que tem 40px de altura e
 * não comporta os 44px de alvo de toque do `size="icon"`.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useT();
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  };

  useHotkeys("mod+shift+l", cycle, { preventDefault: true }, [theme]);

  const Icon = theme === "dark" ? Moon : theme === "system" ? MonitorPlay : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(className)}
          aria-label={t("Aparência e temas")}
          // O servidor não sabe a preferência salva no navegador do usuário --
          // renderiza um valor default e o cliente corrige pro valor real assim
          // que hidrata. É o mismatch ESPERADO de todo seletor de tema; React
          // "corrige" sozinho no primeiro render, só reclamava no console.
          suppressHydrationWarning
        >
          <Icon size={16} aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setTheme("light")}>{t("Modo claro")}</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("dark")}>{t("Modo escuro")}</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setTheme("system")}>
          {t("Usar tema do dispositivo")}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/app/settings/aparencia">{t("Temas de Jul-IA")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
