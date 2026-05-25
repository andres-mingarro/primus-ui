import { ComponentMeta as BadgeMeta } from '@/components-library/Badge/meta'
import { ComponentMeta as ButtonMeta } from '@/components-library/Button/meta'
import { ComponentMeta as CardMeta } from '@/components-library/Card/meta'
import { ComponentMeta as DividerMeta } from '@/components-library/Divider/meta'
import { ComponentMeta as GridTemplateMeta } from '@/components-library/GridTemplate/meta'
import { ComponentMeta as HeadingMeta } from '@/components-library/Heading/meta'
import { ComponentMeta as LinkMeta } from '@/components-library/Link/meta'
import { ComponentMeta as SectionContainerMeta } from '@/components-library/SectionContainer/meta'
import { ComponentMeta as TextMeta } from '@/components-library/Text/meta'

export interface ComponentPropDoc {
  name: string
  type: string
  required?: boolean
  default?: unknown
  description: string
}

export interface ComponentCssVarDoc {
  name: string
  default: string
  description: string
}

export interface ComponentDoc {
  name: string
  slug: string
  version: string
  description: string
  props: ComponentPropDoc[]
  cssVars: ComponentCssVarDoc[]
}

export const componentDocs: ComponentDoc[] = [
  DividerMeta,
  GridTemplateMeta,
  TextMeta,
  HeadingMeta,
  SectionContainerMeta,
  CardMeta,
  LinkMeta,
  ButtonMeta,
  BadgeMeta,
]

export function getComponentDoc(slug: string) {
  return componentDocs.find((component) => component.slug === slug)
}
