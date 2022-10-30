import { Badge } from "@nextui-org/react";

const CategoryBadges = ({ categories }) => {
  return categories.length ? (
    categories.map((c) => (
      <Badge variant="flat" key={c.title} size="md">
        {c.title}
      </Badge>
    ))
  ) : (
    <Badge variant="points" />
  );
};

export default CategoryBadges;
