import { Box, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "../../services/api";

export default function CreateUser() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      api.get(`/primary/invite/${id}`).then((response) => {
        if (response.data.inviteCode) {
          window.location.assign(
            `https://chat.whatsapp.com/${response.data.inviteCode}`
          );
        }
      });
    }
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner />
    </Box>
  );
}
