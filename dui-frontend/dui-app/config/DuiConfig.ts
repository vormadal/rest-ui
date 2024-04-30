import { NuxtLink } from '#components'
import DefaultActions from '../../components/DefaultActions.vue'
import DefaultCreateForm from '../../components/DefaultCreateForm.vue'
import DefaultEditForm from '../../components/DefaultEditForm.vue'
import DefaultTable from '../../components/DefaultTable.vue'
import DefaultViewRecord from '../../components/DefaultViewRecord.vue'
import DefaultDashboard from '../../components/dui/DefaultDashboard.vue'
import DefaultBooleanField from '../../components/fields/DefaultBooleanField.vue'
import DefaultDateField from '../../components/fields/DefaultDateField.vue'
import DefaultDateTimeField from '../../components/fields/DefaultDateTimeField.vue'
import DefaultLookupField from '../../components/fields/DefaultLookupField.vue'
import DefaultNumberField from '../../components/fields/DefaultNumberField.vue'
import DefaultTextField from '../../components/fields/DefaultTextField.vue'
import DefaultTimeField from '../../components/fields/DefaultTimeField.vue'
import { DataType } from '../../configurations/DataType'
import { defaultDateFormatter } from '../../configurations/defaultFormatters/defaultDateFormatter'
import { defaultDateTimeFormatter } from '../../configurations/defaultFormatters/defaultDateTimeFormatter'
import { defaultNumberFormatter } from '../../configurations/defaultFormatters/defaultNumberFormatter'
import { defaultStringFormatter } from '../../configurations/defaultFormatters/defaultStringFormatter'
import { defaultTimeFormatter } from '../../configurations/defaultFormatters/defaultTimeFormatter'
import type { DuiAction } from '../actions/DuiAction'
import type { DuiActionOptions } from '../actions/DuiActionOptions'
import type { DuiActionOptionsValues } from '../actions/DuiActionOptionValues'
import { DuiApiAction } from '../actions/DuiApiAction'
import type { DuiApiActionOptions } from '../actions/DuiApiActionOptions'
import { DuiCompositeAction } from '../actions/DuiCompositeAction'
import type { DuiCompositeActionOptions } from '../actions/DuiCompositeActionOptions'
import { DuiRedirectAction } from '../actions/DuiRedirectAction'
import type { DuiRedirectActionOptions } from '../actions/DuiRedirectActionOptions'
import { DuiButtonField } from '../DuiButtonField'
import { DuiField } from '../DuiField'
import type { DuiFieldOptions } from '../DuiFieldOptions'
import { DuiLookupField } from '../DuiLookupField'
import { DuiPageType } from '../DuiPageType'
import type { DuiConfigOptions } from './DuiConfigOptions'

const locale = 'da-dk'

//TODO make smarter
export type ComponentType = any

export interface IDuiConfigComponent {
  default: ComponentType
  [key: string]: ComponentType
}

export interface IDuiConfigValueFormatter<V = any, O = any> {
  format: (value: V, options: O) => string
  defaultOptions: () => O
}

export interface IDuiConfig {
  components: {
    actions: ComponentType
    dashboard: ComponentType
    fields: {
      [DataType.BUTTON]: IDuiConfigComponent
      [DataType.DATE]: IDuiConfigComponent
      [DataType.DATE_TIME]: IDuiConfigComponent
      [DataType.TIME]: IDuiConfigComponent
      [DataType.NUMBER]: IDuiConfigComponent
      [DataType.BOOLEAN]: IDuiConfigComponent
      [DataType.STRING]: IDuiConfigComponent
      [DataType.LOOKUP]: IDuiConfigComponent
    }
    [DuiPageType.createForm]: IDuiConfigComponent
    [DuiPageType.list]: IDuiConfigComponent
    [DuiPageType.record]: IDuiConfigComponent
    [DuiPageType.updateForm]: IDuiConfigComponent
  }

  defaultValueFormatter: IDuiConfigValueFormatter
  valueFormatters: {
    [key: PropertyKey]: IDuiConfigValueFormatter
  }

  actionFactory: <T extends IDuiConfig>(options: DuiActionOptionsValues[], config: T) => DuiAction[]
  fieldFactory: <T extends IDuiConfig>(options: DuiFieldOptions<T>[], config: T) => DuiField[]
}

export class DuiConfig implements IDuiConfig {
  actionFactory<T extends IDuiConfig>(options: DuiActionOptionsValues[] | undefined, config: T) {
    if (!options) return []

    return options.map((x) => {
      switch (x.type) {
        case 'api':
          return new DuiApiAction(x as DuiApiActionOptions)
        case 'redirect':
          return new DuiRedirectAction(x as DuiRedirectActionOptions)
        case 'composite':
          return new DuiCompositeAction(x as DuiCompositeActionOptions, config)
        default:
          throw new Error(`Action type '${x.type}' is not supported`)
      }
    })
  }
  fieldFactory<T extends IDuiConfig>(options: DuiFieldOptions<T>[], config: T): DuiField[] {
    return options.map((x) => {
      switch (x.type) {
        case DataType.BUTTON:
          return new DuiButtonField<T>(x, config)
        case DataType.LOOKUP:
          return new DuiLookupField(x, config)
        default:
          return new DuiField(x, config)
      }
    })
  }

  components = {
    actions: DefaultActions,
    dashboard: DefaultDashboard,
    fields: {
      [DataType.BUTTON]: {
        default: NuxtLink
      },
      [DataType.DATE]: {
        default: DefaultDateField
      },
      [DataType.STRING]: {
        default: DefaultTextField
      },
      [DataType.DATE_TIME]: {
        default: DefaultDateTimeField
      },
      [DataType.TIME]: {
        default: DefaultTimeField
      },
      [DataType.NUMBER]: {
        default: DefaultNumberField
      },
      [DataType.BOOLEAN]: {
        default: DefaultBooleanField
      },
      [DataType.LOOKUP]: {
        default: DefaultLookupField
      }
    },
    [DuiPageType.list]: {
      default: DefaultTable
    },
    [DuiPageType.createForm]: {
      default: DefaultCreateForm
    },
    [DuiPageType.record]: {
      default: DefaultViewRecord
    },
    [DuiPageType.updateForm]: {
      default: DefaultEditForm
    }
  }

  defaultValueFormatter = {
    format: defaultStringFormatter,
    defaultOptions: () => ({})
  }

  valueFormatters = {
    number: {
      format: defaultNumberFormatter,
      defaultOptions: () => ({
        locale: locale,
        options: {
          compactDisplay: 'short',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
          // minimumIntegerDigits: 0,
          // minimumSignificantDigits: 2,
          // maximumSignificantDigits: 8,
          // compactDisplay?: "short" | "long" | undefined;
          // notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
          // signDisplay?: "auto" | "never" | "always" | "exceptZero" | undefined;
          // unit?: string | undefined;
          // unitDisplay?: "short" | "long" | "narrow" | undefined;
          // currencyDisplay?: string | undefined;
          // currencySign?: string | undefined;
        }
      })
    },
    boolean: {
      format: (value: boolean) => (value ? 'yes' : 'no'),
      defaultOptions: () => ({})
    },
    string: {
      format: defaultStringFormatter,
      defaultOptions: () => ({})
    },
    lookup: {
      format: defaultStringFormatter,
      defaultOptions: () => ({})
    },
    date: {
      format: defaultDateFormatter,
      defaultOptions: () => ({
        locale: locale,
        options: {
          dateStyle: 'short'
        }
      })
    },
    dateTime: {
      format: defaultDateTimeFormatter,
      defaultOptions: () => ({
        locale: locale,
        options: {
          timeStyle: 'short',
          dateStyle: 'short'
        }
      })
    },
    time: {
      format: defaultTimeFormatter,
      defaultOptions: () => ({
        locale: locale,
        options: {
          timeStyle: 'short'
        }
      })
    }
  }
  // defaultOptions: {
  //   locale: 'da-dk',
  //   number: {
  //     compactDisplay: 'short',

  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 2
  //     // minimumIntegerDigits: 0,
  //     // minimumSignificantDigits: 2,
  //     // maximumSignificantDigits: 8,
  //     // compactDisplay?: "short" | "long" | undefined;
  //     // notation?: "standard" | "scientific" | "engineering" | "compact" | undefined;
  //     // signDisplay?: "auto" | "never" | "always" | "exceptZero" | undefined;
  //     // unit?: string | undefined;
  //     // unitDisplay?: "short" | "long" | "narrow" | undefined;
  //     // currencyDisplay?: string | undefined;
  //     // currencySign?: string | undefined;
  //   },
  //   date: {
  //     // formatMatcher: 'basic', // "basic" | "best fit" | "best fit" | undefined;
  //     // dateStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // timeStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // dayPeriod: "narrow", // "narrow" | "short" | "long" | undefined;
  //     fractionalSecondDigits: undefined // 1 | 2 | 3 | undefined;
  //   },
  //   dateTime: {
  //     // formatMatcher: 'basic', // "basic" | "best fit" | "best fit" | undefined;
  //     // dateStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // timeStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // dayPeriod: "narrow", // "narrow" | "short" | "long" | undefined;
  //     // fractionalSecondDigits: undefined // 1 | 2 | 3 | undefined;
  //   },
  //   time: {
  //     // formatMatcher: 'basic', // "basic" | "best fit" | "best fit" | undefined;
  //     // dateStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // timeStyle: "full", // "full" | "long" | "medium" | "short" | undefined;
  //     // dayPeriod: "narrow", // "narrow" | "short" | "long" | undefined;
  //     // fractionalSecondDigits: undefined // 1 | 2 | 3 | undefined;
  //   }
  // }

  // TODO use options to allow modifications
  constructor(options: DuiConfigOptions) {}
}
