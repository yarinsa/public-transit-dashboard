import { LuTrainFront } from "react-icons/lu";
import { HStack, Heading } from "@chakra-ui/react";
import { PropsOf } from "@emotion/react";

type Props = {
    size?: PropsOf<typeof LuTrainFront>["size"]
    isMinimal?: boolean
}
export const Logo = ({ size = "24px", isMinimal = false }: Props) => {
  return (
    <HStack>
      <LuTrainFront size={size} />
      {!isMinimal && <Heading size="lg">Transit Metrics</Heading>}
    </HStack>
  );
};
