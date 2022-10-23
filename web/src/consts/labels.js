import { colors } from "~/theme/config";
import { mainRoutes, postNav } from "~/consts/routes";

const links = [
  { label: "Posts", href: postNav.posts },
  { label: "Categories", href: mainRoutes.categories },
  { label: "Ask a question", href: postNav.create },
];

const dropdownLabels = [
  { id: "dropdown_label_1", label: "Profile" },
  { id: "dropdown_label_2", label: "Log out", color: colors.error },
];

const sortLabels = [
  { label: "Publish Date", sortBy: "date" },
  { label: "Likes Count", sortBy: "likes" },
];

export { links, dropdownLabels, sortLabels };
