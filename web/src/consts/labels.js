import { colors } from "~/theme/config";
import { mainRoutes } from "~/consts/routes";

const links = [
  { id: "link_1", label: "Posts", href: mainRoutes.posts },
  { id: "link_2", label: "Categories", href: mainRoutes.categories },
];

const dropdownLabels = [
  { id: "dropdown_label_1", label: "Profile" },
  { id: "dropdown_label_2", label: "Log out", color: colors.error },
];

export { links, dropdownLabels };
