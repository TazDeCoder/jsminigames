import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import { useTimer } from '../../../../hooks';
import { Editor } from '../../../ui';
import Prompt from './Prompt';
import CodeSandbox from './CodeSandbox';
import ChatBox from './ChatBox';
import HelperText from './HelperText';
import type { IClientMessage, IGame } from '../../../interfaces';

type Props = {
  minigame: IGame;
  maxTimer: number;
  messages: IClientMessage[];
  onSendMessage: (message: string) => void;
  onSubmit: (js: string) => void;
};

const DEFAULT_VALUE = `function foo() {
  // Write your solution here
}`;

const Minigame: React.FC<Props> = ({
  minigame,
  maxTimer,
  messages,
  onSendMessage,
  onSubmit,
}) => {
  const { html, css, prompt, validator, helperText } = minigame;

  const { timer } = useTimer({});

  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
          <script>${validator}</script>
        </html>
      `);
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [html, css, js, validator]);

  const checkSolutionHandler = () => {
    setJs((prevJs) => {
      onSubmit(prevJs);
      return prevJs;
    });
  };

  const codeChangeHandler = (newJs: string) => {
    setJs(newJs);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Prompt prompt={prompt} timer={timer} duration={maxTimer} />
      <CodeSandbox srcDoc={srcDoc} onCheckSolution={checkSolutionHandler} />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <Box sx={{ width: 650 }}>
          <Editor defaultValue={DEFAULT_VALUE} onChange={codeChangeHandler} />
        </Box>
        <Box sx={{ flexGrow: 1, height: 500 }}>
          <ChatBox messages={messages} onSendMessage={onSendMessage} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <HelperText text={helperText} />
      </Box>
    </Box>
  );
};

export default Minigame;
