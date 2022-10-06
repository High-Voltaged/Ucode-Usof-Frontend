import { FaSearch } from "react-icons/fa";
import InputField from "~/components/Form/InputField";

const SearchInput = () => {
  return (
    <InputField
      placeholder="Search..."
      aria-label="search"
      contentLeft={<FaSearch size={16} />}
      isLast
      clearable
      css={{
        w: "100%",
        "@xsMax": {
          mw: "300px",
        },
      }}
    ></InputField>
  );
};

export default SearchInput;
