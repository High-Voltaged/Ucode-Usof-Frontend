import { Badge } from "@nextui-org/react";

const CategoryBadges = ({ categories }) => {
  return (categories || []).map((c) => (
    <Badge variant="flat" key={c.title} size="md">
      {c.title}
    </Badge>
  ));
};

export default CategoryBadges;
