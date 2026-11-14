import { Reveal } from "./reveal";

export function Story() {
  return (
    <section
      id="story"
      className="relative border-y border-line bg-panel py-16 md:py-24"
    >
      <Reveal
        inView
        className="mx-auto grid max-w-6xl gap-7 px-4 sm:px-5 md:grid-cols-[280px_1fr] md:gap-14 [&>*]:min-w-0"
      >
        <div>
          <span className="text-[11px] font-medium tracking-[0.12em] text-faint uppercase">
            Why we built it
          </span>
          <h2 className="mt-3 text-[40px] leading-[1.05] font-bold text-balance">
            We got sick of all the apps.
          </h2>
        </div>
        <div className="space-y-[18px] text-lg leading-normal text-muted-foreground md:text-[22px]">
          <p>
            My wife and I had{" "}
            <strong className="font-medium text-foreground">
              an app for counting calories
            </strong>
            , another for the grocery list, a folder of recipe screenshots and a
            fridge full of things we forgot we bought.
          </p>
          <p>
            So we built one app that does all of it, for our house.{" "}
            <strong className="font-medium text-foreground">
              That’s Foodable.
            </strong>{" "}
            We use it every day. It’s free, and it’s yours to run.
          </p>
          <p className="text-[15px] text-faint">Ethan &amp; family</p>
        </div>
      </Reveal>
    </section>
  );
}
