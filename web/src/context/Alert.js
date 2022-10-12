import { Card, Grid, Text, useTheme } from "@nextui-org/react";
import { createContext, useCallback, useState } from "react";
import styles from "./Alert.styles";

const ALERT_TIME = 5000;

export const AlertContext = createContext({
  setAlert: (_text, _color) => {},
});

export const AlertProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const {
    theme: { colors },
  } = useTheme();

  const setAlert = useCallback(
    (text, color) => {
      setText(text);
      setColor(colors[`${color}LightActive`].value);
      setIsVisible(true);

      setTimeout(() => {
        setText("");
        setColor("");
        setIsVisible(false);
      }, ALERT_TIME);
    },
    [colors]
  );
  const opacityStyles = isVisible ? styles.visible : styles.hidden;

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      <div style={{ ...styles.container, ...opacityStyles }}>
        <Grid.Container justify="center" alignItems="center">
          <Grid xs={6} md={3}>
            <Card variant="flat" css={{ bg: color }}>
              <Card.Body css={styles.cardBody}>
                <Text h5 color="white" css={styles.text}>
                  {text}
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
      </div>
    </AlertContext.Provider>
  );
};
