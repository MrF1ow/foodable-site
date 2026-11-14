import { Chat } from "@/components/site/chat";
import { Faq } from "@/components/site/faq";
import { Features } from "@/components/site/features";
import { FinalCta, Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { Loop } from "@/components/site/loop";
import { Nav } from "@/components/site/nav";
import { SelfHost } from "@/components/site/self-host";
import { Story } from "@/components/site/story";
import { Tour } from "@/components/site/tour";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Tour />
        <Story />
        <Loop />
        <Chat />
        <Features />
        <SelfHost />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
