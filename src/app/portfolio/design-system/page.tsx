import { getMetadata } from '@/config/seo';
import DesignSystemClient from './DesignSystemClient';

export const metadata = getMetadata('/portfolio/design-system/');

export default function DesignSystemPage() {
  return <DesignSystemClient />;
}
