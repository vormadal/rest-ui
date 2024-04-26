import DefaultTable from '../../components/DefaultTable.vue'
import DefaultViewRecord from '../../components/DefaultViewRecord.vue'
import DefaultCreateForm from '../../components/DefaultCreateForm.vue'
import DefaultDashboard from '../../components/dui/DefaultDashboard.vue'
import { defaultDateFormatter } from '../../configurations/defaultFormatters/defaultDateFormatter'
import { defaultDateTimeFormatter } from '../../configurations/defaultFormatters/defaultDateTimeFormatter'
import { defaultNumberFormatter } from '../../configurations/defaultFormatters/defaultNumberFormatter'
import { defaultStringFormatter } from '../../configurations/defaultFormatters/defaultStringFormatter'
import { defaultTimeFormatter } from '../../configurations/defaultFormatters/defaultTimeFormatter'
import { DuiPageType } from '../DuiPageType'
import type { DuiConfigOptions } from './DuiConfigOptions'
import { DataType } from '../../configurations/DataType'
import DefaultTextField from '../../components/fields/DefaultTextField.vue'
import DefaultDateTimeField from '../../components/fields/DefaultDateTimeField.vue'
import DefaultDateField from '../../components/fields/DefaultDateField.vue'
import DefaultTimeField from '../../components/fields/DefaultTimeField.vue'
import DefaultNumberField from '../../components/fields/DefaultNumberField.vue'
import DefaultEditForm from '../../components/DefaultEditForm.vue'
import type { DuiActionOptions } from '../actions/DuiActionOptions'
import type { DuiAction } from '../actions/DuiAction'
import { DuiApiAction } from '../actions/DuiApiAction'
import { DuiRedirectAction } from '../actions/DuiRedirectAction'
import type { DuiButtonActionOptions } from '../actions/DuiButtonActionOptions'
import { DuiApiButtonAction } from '../actions/DuiApiButtonAction'
import { DuiRedirectButtonAction } from '../actions/DuiRedirectButtonAction'
import DefaultActions from '../../components/DefaultActions.vue'
import type { DuiFieldOptions } from '../DuiFieldOptions'
import { DuiField } from '../DuiField'
import { DuiButtonField } from '../DuiButtonField'
import { NuxtLink } from '#components'
import DefaultBooleanField from '../../components/fields/DefaultBooleanField.vue'
import { DuiCompositeAction } from '../actions/DuiCompositeAction'

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

  actionFactory: <T extends DuiConfig = DuiConfig>(options: DuiActionOptions<T>[], config: T) => DuiAction<T>[]
  buttonActionFactory: <T extends DuiConfig = DuiConfig>(options?: DuiButtonActionOptions<T>[]) => DuiAction<T>[]
  fieldFactory: <T extends DuiConfig = DuiConfig>(options: DuiFieldOptions<T>[], config: T) => DuiField<T>[]
}

export class DuiConfig implements IDuiConfig {
  buttonActionFactory<T extends DuiConfig = DuiConfig>(options?: DuiButtonActionOptions<T>[] | undefined) {
    if (!options) return []

    return options.map((x) => {
      switch (x.type) {
        case 'api':
          return new DuiApiButtonAction<T>(x)
        case 'redirect':
          return new DuiRedirectButtonAction<T>(x)
      }
    })
  }
  actionFactory<T extends DuiConfig = DuiConfig>(options: DuiActionOptions<T>[] | undefined, config: T) {
    if (!options) return []

    return options.map((x) => {
      switch (x.type) {
        case 'api':
          return new DuiApiAction<T>(x)
        case 'redirect':
          return new DuiRedirectAction<T>(x)
        case 'composite':
          return new DuiCompositeAction<T>(x, config)
      }
    })
  }
  fieldFactory<T extends DuiConfig = DuiConfig>(options: DuiFieldOptions<T>[], config: T): DuiField<T>[] {
    return options.map((x) => {
      switch (x.type) {
        case DataType.BUTTON:
          return new DuiButtonField(x, config)
        default:
          return new DuiField<T>(x, config)
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
