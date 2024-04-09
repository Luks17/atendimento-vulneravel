import React from "react";

function FormCarousel({ children }: { children: React.ReactNode }) {
  return <div className="carousel py-1 w-full">{children}</div>;
}

function CarouselSection({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) {
  return (
    <section
      className="carousel-item w-full"
      id={`form-carousel-section-${id}`}
    >
      <div className="flex flex-col items-start gap-y-4 p-10">{children}</div>
    </section>
  );
}

export default {
  Root: FormCarousel,
  Section: CarouselSection,
};
