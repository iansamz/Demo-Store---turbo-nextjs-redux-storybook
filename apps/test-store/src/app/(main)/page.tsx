import { SectionWrapper } from "@repo/ui/components/section-wrapper";
import { Products } from "@components/products";

export default function Page(): JSX.Element {
  return (
    <SectionWrapper>
      <Products />
    </SectionWrapper>
  );
}
