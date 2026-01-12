import { getMetadata } from '@/config/seo';
import AboutClient from './AboutClient';

export const metadata = getMetadata('/about/');

export default function AboutPage() {
  return <AboutClient />;
}
