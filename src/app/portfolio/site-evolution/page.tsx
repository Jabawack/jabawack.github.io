import { Suspense } from 'react';
import { getMetadata } from '@/config/seo';
import SiteEvolutionClient from './SiteEvolutionClient';

export const metadata = getMetadata('/portfolio/site-evolution/');

export default function SiteEvolutionPage() {
  return (
    <Suspense>
      <SiteEvolutionClient />
    </Suspense>
  );
}
