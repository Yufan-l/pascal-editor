import type { I18nContextValue } from '@pascal-app/i18n'

export function translateRegistryMessage(
  t: I18nContextValue['t'],
  messageKey: string | undefined,
  fallback: string,
): string {
  return messageKey ? t({ id: messageKey, defaultMessage: fallback }) : fallback
}
