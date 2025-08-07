import { NextIntlClientProvider, useMessages, useLocale } from 'next-intl';
import NoMatch from '@/components/NoMatch/NoMatch';

export default function NotFound() {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NoMatch />
    </NextIntlClientProvider>
  );
}
