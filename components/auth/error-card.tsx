import { Routes } from '@/routes';

import { CardWrapper } from './card-wrapper';

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='Oops! Something went wrong.'
      backButtonLabel='Back to login'
      backButtonHref={Routes.auth.login}
    />
  );
}
