/**
 * Select option types — defined locally to remove naive-ui dependency.
 * Compatible shape with Naive UI NSelect options for migration.
 */
export interface SelectOption {
  label?: string
  value?: string | number
  disabled?: boolean
  [key: string]: unknown
}

export interface SelectGroupOption {
  label: string
  type?: 'group'
  children: SelectOption[]
  [key: string]: unknown
}

export type { OGSchemaType, OGSchemaTypeElementInput, OGSchemaTypeElementSelect, OGSchemaTypeElementInputMultiple };

interface OGSchemaTypeElementBase {
  key: string
  label: string
  placeholder: string
}

interface OGSchemaTypeElementInput extends OGSchemaTypeElementBase {
  type: 'input'
}

interface OGSchemaTypeElementInputMultiple extends OGSchemaTypeElementBase {
  type: 'input-multiple'
}

interface OGSchemaTypeElementSelect extends OGSchemaTypeElementBase {
  type: 'select'
  options: Array<SelectOption | SelectGroupOption>
}

interface OGSchemaType {
  name: string
  elements: (OGSchemaTypeElementSelect | OGSchemaTypeElementInput | OGSchemaTypeElementInputMultiple)[]
}
