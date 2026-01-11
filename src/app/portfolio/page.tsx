import { getMetadata } from '@/config/seo';
import PortfolioClient from './PortfolioClient';

export const metadata = getMetadata('/portfolio/');

export default function PortfolioPage() {
  return <PortfolioClient />;
}
