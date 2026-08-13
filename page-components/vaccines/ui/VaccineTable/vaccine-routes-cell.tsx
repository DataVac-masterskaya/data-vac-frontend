"use client";

import {
  AdministrationIcon,
  Badge,
} from "@datavac/ui-kit";
import type { AdministrationRoute } from "@/page-components/vaccines/model/types";
import { VACCINE_COUNT_BADGE_CLASS_NAME } from "./vaccine-column-meta";
import { useVaccineTableMedia } from "./use-vaccine-table-media";

type VaccineRoutesCellProps = {
  routes: AdministrationRoute[];
};

export function VaccineRoutesCell({ routes }: VaccineRoutesCellProps) {
  const { layout, routesMaxVisible } = useVaccineTableMedia();

  const renderable = routes.filter((r) => r.listIconUrl || r.knownMethod);

  if (renderable.length === 0) {
    return null;
  }

  const extraRoutesCount = renderable.length - routesMaxVisible;
  const visibleRoutes = renderable.slice(0, routesMaxVisible);

  return (
    <div
      className={
        layout !== "desktop"
          ? "flex flex-wrap items-start gap-1 pt-[5px]"
          : "flex items-start gap-1 pt-[5px] overflow-visible"
      }
    >
      {visibleRoutes.map((route, index) => {
        const isLastIcon = index === visibleRoutes.length - 1;
        const needsRightPadding = isLastIcon && extraRoutesCount === 0;
        const key = `${route.code ?? 'unknown'}-${index}`;

        return (
          <span
            key={key}
            className={`inline-flex shrink-0 overflow-visible ${needsRightPadding ? " pr-1" : ""}`}
          >
            {route.listIconUrl ? (
              <img
                src={route.listIconUrl}
                alt={route.code ?? ''}
                className="h-11 w-10 shrink-0 object-contain"
              />
            ) : (
              <AdministrationIcon method={route.knownMethod!} className="h-11 w-10 shrink-0 overflow-visible" />
            )}
          </span>
        );
      })}
      {extraRoutesCount > 0 && (
        <Badge className={VACCINE_COUNT_BADGE_CLASS_NAME}>
          +{extraRoutesCount}
        </Badge>
      )}
    </div>
  );
}
