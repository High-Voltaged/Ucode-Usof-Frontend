import { Avatar, Card, Grid, Text } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { AVATAR_PATH } from "~/consts/utils";
import { colors } from "~/theme/config";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Grid.Container
      alignContent="flex-start"
      justify="center"
      css={{ h: "100%" }}
    >
      <Grid xs={12} md={8} xl={6}>
        <Card>
          <Grid.Container gap={4}>
            <Grid xs={12} sm={4} md={3} css={{ pr: 0 }}>
              <Avatar
                size={""}
                css={{ w: 120, h: 120 }}
                squared
                bordered
                borderWeight="black"
                color={colors.feature}
                src={AVATAR_PATH(user.avatar)}
              />
            </Grid>
            <Grid xs={12} sm={8} md={9} css={{ d: "flex", fd: "column" }}>
              <Grid css={{ p: 0 }}>
                <Text
                  size={36}
                  weight="bold"
                  css={{
                    textGradient: "45deg, $yellow600, $purple600 30%",
                  }}
                >
                  {user.login}
                </Text>
              </Grid>
              <Grid css={{ p: 0, d: "flex", ai: "center" }}>
                <Text size={20}>Logged in as</Text>
                <Text
                  size={20}
                  weight="semibold"
                  color={colors.secondary}
                  css={{ ml: 5 }}
                >
                  {user.role}
                </Text>
              </Grid>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={4}>
            <Grid xs={12} css={{ py: 0, d: "flex", ai: "center" }}>
              <Text size={18}>Your rating is </Text>
              <Text
                size={18}
                weight="semibold"
                color={colors.secondary}
                css={{ ml: 5 }}
              >
                {user.rating}
              </Text>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2}>
            <ProfileTabs />
          </Grid.Container>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Profile;
