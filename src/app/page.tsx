import { Chat } from "@/components/site/chat";
import { Faq } from "@/components/site/faq";
import { Features } from "@/components/site/features";
import { FinalCta, Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Loop } from "@/components/site/loop";
import { Nav } from "@/components/site/nav";
import { Screens } from "@/components/site/screens";
import { SelfHost } from "@/components/site/self-host";
import { Story } from "@/components/site/story";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Story />
        <Loop />
        <Chat />
        <Features />
        <Screens />
        <SelfHost />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
