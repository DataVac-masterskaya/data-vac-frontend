"use client";

import {
  AdministrationIcon,
  Badge,
  type AdministrationMethod,
} from "@datavac/ui-kit";
import { VACCINE_COUNT_BADGE_CLASS_NAME } from "./vaccine-column-meta";
import { useVaccineTableMedia } from "./use-vaccine-table-media";

type VaccineRoutesCellProps = {
  routes: AdministrationMethod[];
};

export function VaccineRoutesCell({ routes }: VaccineRoutesCellProps) {
  const { layout, routesMaxVisible } = useVaccineTableMedia();

  if (routes.length === 0) {
    return null;
  }

  const extraRoutesCount = routes.length - routesMaxVisible;
  const visibleRoutes = routes.slice(0, routesMaxVisible);

  return (
    <div
      className={
        layout !== "desktop"
          ? "flex flex-wrap items-start gap-1"
          : "flex items-start gap-1 pt-0.5 overflow-visible"
      }
    >
      {visibleRoutes.map((method, index) => {
        const isLastIcon = index === visibleRoutes.length - 1;
        const needsRightPadding = isLastIcon && extraRoutesCount === 0;

        return (
          <span
            key={`${method}-${index}`}
            className={`inline-flex shrink-0 overflow-visible ${needsRightPadding ? " pr-1" : ""}`}
          >
            <AdministrationIcon method={method} className="h-11 w-10 shrink-0 overflow-visible" />
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
