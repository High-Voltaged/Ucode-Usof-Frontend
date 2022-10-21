import { colors } from "~/theme/config";
import { mainRoutes, postNav } from "~/consts/routes";

const links = [
  { id: "link_1", label: "Posts", href: postNav.posts },
  { id: "link_2", label: "Categories", href: mainRoutes.categories },
];

const dropdownLabels = [
  { id: "dropdown_label_1", label: "Profile" },
  { id: "dropdown_label_2", label: "Log out", color: colors.error },
];

const sortLabels = [
  { label: "Likes Count", sortBy: "likes" },
  { label: "Publish Date", sortBy: "date" },
];

export { links, dropdownLabels, sortLabels };
