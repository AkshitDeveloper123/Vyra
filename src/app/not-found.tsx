import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center pb-24 pt-40">
      <SectionLabel index="404">Signal lost</SectionLabel>
      <h1 className="display mt-8 text-[clamp(3rem,11vw,9rem)] leading-[0.88]">
        OUTSIDE
        <br />
        THE FRAME.
      </h1>
      <p className="copy mt-6 max-w-md">
        The page you were looking for is not part of this composition. Return to the studio, or
        explore VYRA ONE.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn">
          Return home
        </Link>
        <Link href="/product" className="btn btn-ghost">
          Explore VYRA ONE
        </Link>
      </div>
    </section>
  );
}
