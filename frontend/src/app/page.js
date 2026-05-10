import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import InstagramGallery from '@/components/home/InstagramGallery';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <Testimonials />
      <Newsletter />
      <InstagramGallery />
    </div>
  );
}
