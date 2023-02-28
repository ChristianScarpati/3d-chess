import { Flex, Text, Link, Button } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex>
      <Text>Chris wish u an excellent game!</Text>
      <Link
        href="https://github.com/ChristianScarpati/3d-chess/"
        target="_blank"
      >
        <Button
          size="sm"
          colorScheme="teal"
          variant="ghost"
          // leftIcon={<FaGithub />}
        >
          click here
        </Button>
      </Link>
    </Flex>
  );
};

export default Footer;
