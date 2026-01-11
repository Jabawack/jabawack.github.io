import { getMetadata } from '@/config/seo';
import DonationMentoringClient from './DonationMentoringClient';

export const metadata = getMetadata('/portfolio/donation-mentoring/');

export default function DonationMentoringPage() {
  return <DonationMentoringClient />;
}
