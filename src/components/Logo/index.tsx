import Image from 'next/image';
import logo from '@/../public/logo.png';
interface Props {
  title: string;
}
function Logo({ title }: Props) {
  return (
    <a href='/' className='flex items-center gap-4 z-10'>
      <Image
        src={logo}
        height='60'
        quality={100}
        width='60'
        alt='The Wild Oasis logo'
      />
      <span className='text-xl font-semibold text-primary-100'>{title}</span>
    </a>
  );
}

export default Logo;
