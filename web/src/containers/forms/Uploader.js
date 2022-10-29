import { Button, Grid, Image } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import BaseButton from "~/components/Button/Button";
import ErrorTitle from "~/components/ErrorTitle/ErrorTitle";
import { SUCCESS } from "~/consts/messages";
import useRequest from "~/hooks/use-request";
import { useUpdateAvatarMutation } from "~/redux/api/auth-api";
import { colors } from "~/theme/config";

const styles = { d: "flex", jc: "center" };

const UploaderForm = () => {
  const [updateAvatar, { isLoading, error }] = useUpdateAvatarMutation();
  const { request } = useRequest(updateAvatar, SUCCESS.AVATAR_UPDATE);
  const input = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const setFile = ({ target: { files } }) => {
    setPhoto(files[0]);
  };

  const handleSubmit = async (e) => {
    const form = new FormData();
    form.append("photo", photo);
    await request({ body: form });
    setPhoto(null);
    setPreview(null);
  };

  useEffect(() => {
    if (photo) {
      const file = URL.createObjectURL(photo);
      setPreview(file);
      return () => URL.revokeObjectURL(file);
    }
  }, [photo]);

  if (error) {
    <ErrorTitle text={error.data.message} />;
  }

  return (
    <>
      <label htmlFor="upload-file">
        <input
          ref={input}
          id="upload-file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={setFile}
        />
        {!photo && (
          <Button
            onPress={() => input.current.click()}
            color={colors.secondary}
            flat
          >
            Upload an avatar
          </Button>
        )}
      </label>
      {photo && (
        <Grid.Container css={{ mt: 10 }}>
          <Grid xs={12} css={styles}>
            <Image width={200} height={200} objectFit="cover" src={preview} />
          </Grid>
          <Grid xs={12} css={styles}>
            <Button.Group color={colors.secondary}>
              <Button flat onPress={() => setPhoto(null)}>
                Cancel
              </Button>
              <BaseButton
                loading={isLoading}
                text="Upload"
                onPress={handleSubmit}
              />
            </Button.Group>
          </Grid>
        </Grid.Container>
      )}
    </>
  );
};

export default UploaderForm;
