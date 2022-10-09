const { Button, Loading } = require("@nextui-org/react");

const BaseButton = ({ text, loading, ...props }) => {
  return (
    <Button type="submit" size="lg" color="warning">
      {loading ? <Loading color="currentColor" size="md" /> : text}
    </Button>
  );
};

export default BaseButton;
