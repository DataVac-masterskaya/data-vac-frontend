"use client";

import {
  AdministrationIcon,
  Badge,
} from "@datavac/ui-kit";
import type { AdministrationRoute } from "@/page-components/vaccines/model/types";
import { ADMINISTRATION_CODE_TO_LABEL } from "@/page-components/vaccines/lib/map-administration-methods";
import { AdministrationImagePanel } from "@/shared/ui/AdministrationImagePanel/AdministrationImagePanel";
import { VACCINE_COUNT_BADGE_CLASS_NAME } from "./vaccine-column-meta";
import { useVaccineTableMedia } from "./use-vaccine-table-media";

type VaccineRoutesCellProps = {
  routes: AdministrationRoute[];
};

export function VaccineRoutesCell({ routes }: VaccineRoutesCellProps) {
  const { layout, routesMaxVisible } = useVaccineTableMedia();

  const renderable = routes.filter((r) => r.knownMethod);

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
        const title = route.code ? (ADMINISTRATION_CODE_TO_LABEL[route.code] ?? route.code) : '';
        const imageSrc = route.detailImageUrl ?? route.listIconUrl ?? '/images/administration/no_illustration.png';

        return (
          <span
            key={key}
            className={`inline-flex shrink-0 overflow-visible ${needsRightPadding ? " pr-1" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <AdministrationImagePanel
              trigger={
                <AdministrationIcon method={route.knownMethod!} className="h-11 w-10 shrink-0 overflow-visible" />
              }
              title={title}
              imageSrc={imageSrc}
              imageAlt={title}
            />
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
