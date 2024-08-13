import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { PageContainer } from "../../components/shared/containers/pageContainer";
import { MystraAPI } from "../../services/mystra-api";

export const VerifyPage = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [queryParameters] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    const token = queryParameters.get("token");

    if (token) {
      MystraAPI.verifyEmail(token)
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {}, 2000);
        })
        .catch(() => {
          setSuccess(false);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <Flex h="100vh" align="center" justify="center">
      {success ? (
        "Account successfully verified. Redirecting shortly..."
      ) : error ? (
        "Invalid token. Redirecting shortly..."
      ) : (
        <Flex gap="20px">
          Veryfying account <Spinner />
        </Flex>
      )}
    </Flex>
  );
};
