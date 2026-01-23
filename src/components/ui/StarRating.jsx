import styled from "styled-components";

const Stars = styled.span`
  color: var(--brand-gold);
  font-size: ${(props) => props.size || "1rem"};
  line-height: 1;
`;

const EmptyStars = styled.span`
  opacity: 0.3;
`;

export default function StarRating({ rating = 0, size }) {
  const r = Math.max(0, Math.min(5, Number(rating) || 0));

  return (
    <Stars size={size} aria-label={`Rating ${r} out of 5`}>
      {"★".repeat(r)}
      <EmptyStars>{"★".repeat(5 - r)}</EmptyStars>
    </Stars>
  );
}