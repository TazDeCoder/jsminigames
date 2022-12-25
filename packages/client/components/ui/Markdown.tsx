import ReactMarkdown from 'react-markdown';
import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';

export interface MarkdownProps extends TypographyProps {
  text: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ text, ...props }) => (
  <Typography component={ReactMarkdown} {...props}>
    {text}
  </Typography>
);
