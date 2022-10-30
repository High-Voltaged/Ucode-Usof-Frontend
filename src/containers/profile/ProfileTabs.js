import { Button, Grid } from "@nextui-org/react";
import { useState } from "react";
import { profileTabs } from "~/consts/labels";
import { colors } from "~/theme/config";
import PostsTab from "./tabs/PostsTab";
import SettingsTab from "./tabs/SettingsTab";

const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [PostsTab, SettingsTab];
  const CurrentTab = tabs[selectedTab];

  return (
    <>
      <Grid xs={12} css={{ d: "flex", jc: "center" }}>
        <Button.Group color={colors.feature}>
          {profileTabs.map((t) => (
            <Button
              key={t.id}
              onPress={() => setSelectedTab(t.id)}
              flat={t.id !== selectedTab}
              css={{ w: 100, "@xs": { w: 140 } }}
            >
              {t.label}
            </Button>
          ))}
        </Button.Group>
      </Grid>
      <Grid xs={12} css={{ pt: 0 }}>
        <CurrentTab />
      </Grid>
    </>
  );
};

export default ProfileTabs;
