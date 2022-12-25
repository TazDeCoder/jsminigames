import RouterLink from 'next/link';
import MuiLink from '@mui/material/Link';
import type { LinkProps as MuiLinkProps } from '@mui/material/Link';

export interface LinkProps extends MuiLinkProps<'div'> {
  href: string;
}

export const Link: React.FC<LinkProps> = ({ children, href, ...props }) => (
  <RouterLink href={href} passHref>
    <MuiLink component="div" {...props}>
      {children}
    </MuiLink>
  </RouterLink>
);
