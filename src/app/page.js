import AdvertisedSection from "@/components/homepage/AdvertisedSection";
import Banner from "@/components/homepage/Banner";
import LatestTicketsSection from "@/components/homepage/LatestTicketsSection";
import PopularRoutesSection from "@/components/homepage/PopularRoutesSection";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AdvertisedSection></AdvertisedSection>
      <LatestTicketsSection></LatestTicketsSection>
      <PopularRoutesSection></PopularRoutesSection>
      <WhyChooseUsSection></WhyChooseUsSection>
    </div>
  );
}
