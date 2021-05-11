import { As, HStack, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';

interface SidebarLinkProps {
  icon: As;
  onClick?();
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  onClick,
  children,
}) => {
  return (
    <HStack
      cursor="pointer"
      color="rgba(255, 255, 255, 0.7)"
      _hover={{ color: 'white' }}
      transition="all 0.1s ease-in"
      onClick={onClick}
    >
      <Icon as={icon} />
      <Text as="span">{children}</Text>
    </HStack>
  );
};
