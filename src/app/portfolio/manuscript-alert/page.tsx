import { getMetadata } from '@/config/seo';
import ManuscriptAlertClient from './ManuscriptAlertClient';

export const metadata = getMetadata('/portfolio/manuscript-alert/');

export default function ManuscriptAlertPage() {
  return <ManuscriptAlertClient />;
}
