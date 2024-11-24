import Cabin from '@/components/Cabin';
import Reservation from '@/components/Reservation';
import Spinner from '@/components/Spinners/Spinner';
import { getCabin, getCabins } from '@/services/data-services';
import { CabinType } from '@/utils/types.t';
import { Metadata, ResolvingMetadata } from 'next';
import { Suspense } from 'react';

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: '001',
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
  image:
    'https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg',
};

interface Props {
  params: { cabinId: number };
}
type MetaProps = {
  params: { cabinId: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // fetch data
  const { name } = (await getCabin(params.cabinId)) as CabinType;

  return {
    title: name,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map(c => ({
    cabinId: String(c.id),
  }));

  console.log(ids);
  return ids;
}

export default async function CabinPage({ params: { cabinId } }: Props) {
  const cabin = await getCabin(cabinId);

  if (!cabin) {
    return null;
  }
  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='text-5xl font-semibold text-center mb-10 text-accent-400'>
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
