import { FaSearch } from "react-icons/fa";
import InputField from "~/components/InputField/InputField";

const SearchInput = () => {
  return (
    <InputField
      placeholder="Search..."
      aria-label="search"
      contentLeft={<FaSearch size={16} />}
      isLast
      clearable
      css={{
        mw: "200px",
      }}
    ></InputField>
  );
};

export default SearchInput;
