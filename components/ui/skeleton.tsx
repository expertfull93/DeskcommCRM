import { cn } from "@/lib/utils";

/** Placeholder não visual: mantém o espaço reservado sem pintar blocos durante a espera. */
function Skeleton({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-esqueleto
      aria-hidden="true"
      className={cn("rounded-md", className)}
      style={{ ...style, visibility: "hidden", animation: "none" }}
    />
  );
}

export { Skeleton };
