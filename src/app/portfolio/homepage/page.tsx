import { getMetadata } from '@/config/seo';
import HomepageClient from './HomepageClient';

export const metadata = getMetadata('/portfolio/homepage/');

export default function HomepagePortfolioPage() {
  return <HomepageClient />;
}
