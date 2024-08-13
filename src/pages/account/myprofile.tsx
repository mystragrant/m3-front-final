import { Grid, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { useUserProvider } from "../../providers/User/userProvider";

export const MyProfilePage = () => {
  const { id } = useUserProvider();

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate("/users/" + id);
    } else {
      navigate("/");
    }
  }, [id]);

  return (
    <PageContainer noBottomMargin noTopMargin>
      <Grid
        alignItems="center"
        justifyContent="center"
        h="calc(100vh - 74px)"
        w="100%"
      >
        <Spinner />
      </Grid>
    </PageContainer>
  );
};
