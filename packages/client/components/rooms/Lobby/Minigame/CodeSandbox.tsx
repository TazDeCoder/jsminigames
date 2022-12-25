import { useRef, useEffect, useCallback } from 'react';
import { Container } from '@mui/material';

type Props = {
  srcDoc: string;
  onCheckSolution: () => void;
};

const CodeSandbox: React.FC<Props> = ({ srcDoc, onCheckSolution }) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const postMessageCallback = useCallback(
    (e: MessageEvent) => {
      const isSameOrigin =
        e.source === iFrameRef.current?.contentWindow &&
        typeof e.data === 'boolean';

      if (isSameOrigin) {
        if (e.data === true) {
          onCheckSolution();
        }
      }
    },
    [onCheckSolution],
  );

  useEffect(() => {
    window.addEventListener('message', postMessageCallback);

    return () => {
      window.removeEventListener('message', postMessageCallback);
    };
  }, [postMessageCallback]);

  return (
    <Container
      sx={{
        width: '100%',
        maxWidth: '80vw',
        height: '80vh',
      }}
    >
      <iframe
        ref={iFrameRef}
        srcDoc={srcDoc}
        style={{ border: 0 }}
        title="output"
        sandbox="allow-scripts"
        width="100%"
        height="100%"
      />
    </Container>
  );
};

export default CodeSandbox;
