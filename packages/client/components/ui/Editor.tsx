/* eslint-disable global-require */
import dynamic from 'next/dynamic';
import type { IAceEditorProps } from 'react-ace';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Forces component to not SSR (default behaviour)
const AceEditor = dynamic(
  async () => {
    const reactAce = await import('react-ace');
    require('ace-builds/src-min-noconflict/ext-language_tools');
    require('ace-builds/src-noconflict/mode-javascript');
    require('ace-builds/src-noconflict/theme-monokai');
    return reactAce;
  },
  {
    loading: () => (
      <Box sx={{ height: 520 }}>
        <Typography>Loading Editor...</Typography>
      </Box>
    ),
    ssr: false,
  },
);

export type EditorProps = IAceEditorProps;

export const Editor: React.FC<EditorProps> = (props) => (
  <AceEditor
    width="auto"
    mode="javascript"
    theme="monokai"
    name="game-editor"
    fontSize={14}
    wrapEnabled
    showPrintMargin
    showGutter
    highlightActiveLine
    setOptions={{ useWorker: false }}
    editorProps={{
      useWorker: false,
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    }}
    {...props}
  />
);
