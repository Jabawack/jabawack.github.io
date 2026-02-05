import { getMetadata } from '@/config/seo';
import AskPrismClient from './AskPrismClient';

export const metadata = getMetadata('/portfolio/ask-prism/');

export default function AskPrismPage() {
  return <AskPrismClient />;
}
