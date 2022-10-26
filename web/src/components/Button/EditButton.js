const { Grid, Button } = require("@nextui-org/react");
const { FaEdit } = require("react-icons/fa");
const { useNavigate } = require("react-router-dom");
const { colors } = require("~/theme/config");

const EditButton = ({ routeTo }) => {
  const navigate = useNavigate();
  const handler = () => navigate(routeTo);

  return (
    <Grid.Container>
      <Grid>
        <Button
          auto
          color={colors.success}
          onPress={handler}
          icon={<FaEdit size={12} />}
        />
      </Grid>
    </Grid.Container>
  );
};

export default EditButton;
