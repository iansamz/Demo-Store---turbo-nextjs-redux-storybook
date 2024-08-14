import { SectionWrapper } from "@repo/ui/components/section-wrapper";
import { useMemo } from "react";
import { Products } from "@components/products";

interface PageProps {
  params: {
    category: string;
  };
}

export default function Page({ params: { category } }: PageProps): JSX.Element {
  const decodedCategory = useMemo(() => decodeURI(category), [category]);

  return (
    <SectionWrapper>
      <h1 className="text-3xl text-center capitalize mb-6">
        {decodedCategory}
      </h1>
      <Products category={decodedCategory} />
    </SectionWrapper>
  );
}
