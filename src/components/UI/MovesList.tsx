import { Move } from "chess.js";
import { FC } from "react";
import { Flex, Text } from '@chakra-ui/react';

type MovesListProps = {
  moves: Move[];
  whoseMove: "w" | "b";
  isCheck: boolean;
  isCheckmate: boolean;
};

const MovesList: FC<MovesListProps> = () => {
  return <Flex flexDir='column' h='100%' px={2} justify='center' as="aside">
    <Text
      fontSize='sm'
      fontWeight='bold'
      color='gray.500'
      w='min'
      px={2}
      bgColor='gray.100' //this will change if b moves, gray 300, ig white move, orange 200 e.g.
    ></Text>
  </Flex>;
};

export default MovesList;
