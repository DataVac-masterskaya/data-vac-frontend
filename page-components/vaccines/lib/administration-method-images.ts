import type { AdministrationMethod } from '@datavac/ui-kit'

const DEMO_IMAGE = '/images/administration-demo.jpg'

export const ADMINISTRATION_METHOD_IMAGE: Record<AdministrationMethod, string> = {
  intramuscularly: DEMO_IMAGE,
  subcutaneously:  DEMO_IMAGE,
  cutaneously:     DEMO_IMAGE,
  intradermally:   DEMO_IMAGE,
  drops:           DEMO_IMAGE,
  pills:           DEMO_IMAGE,
  intranasally:    DEMO_IMAGE,
}
