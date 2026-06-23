import type { Vaccine } from "@/shared/types/api";
import type { VaccineData } from "@/page-components/vaccines/model/types";
import { formatAgeLabel } from "@/page-components/vaccines/lib/format-age-label";
import { mapAdministrationMethods } from "@/page-components/vaccines/lib/map-administration-methods";

export function mapVaccineToTableRow(vaccine: Vaccine): VaccineData {
  return {
    id: String(vaccine.id),
    name: vaccine.name,
    infections: vaccine.infections,
    routes: mapAdministrationMethods(vaccine.administration_method),
    ageRange: formatAgeLabel(vaccine.min_age_months, vaccine.max_age_months),
    permissibility: "allowed",
    pregnancyPermissibility: vaccine.allowed_during_pregnancy
      ? "allowed"
      : "forbidden",
    contraindications: [],
    isIncompatible: false,
  };
}
