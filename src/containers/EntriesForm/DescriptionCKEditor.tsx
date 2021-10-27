import React from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import List from '@ckeditor/ckeditor5-list/src/list';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';

// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import styled from 'styled-components';
import { MainColors } from '../../common/colors';
import grey from '@material-ui/core/colors/grey';

export interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EditorWrapper = styled.div`
  --ck-color-base-text: white;
  --ck-color-text: white;
  --ck-color-toolbar-background: ${grey[700]};
  --ck-color-base-background: ${grey[700]};
  --ck-color-base-border: ${grey[600]};
  --ck-color-toolbar-border: ${grey[600]};
  --ck-color-focus-border: ${grey[500]};
  --ck-focus-ring: 1px solid var(--ck-color-focus-border);

  --ck-color-button-on-background: ${grey[900]}50;
  --ck-color-button-on-hover-background: ${grey[800]}50;
  --ck-color-button-default-hover-background: ${grey[800]}50;
  --ck-color-button-on-active-background: ${grey[800]}50;
  --ck-color-button-on-active-shadow: ${grey[800]}50;
  --ck-color-button-on-disabled-background: ${grey[900]}50;
  --ck-color-button-default-active-background: ${grey[800]};

  & .ck-tooltip {
    display: block;

    @media (hover: none) {
      display: none;
    }
  }

  .todo-list__label > input:before {
    border: 1px solid #fff;
  }

  .ck-content .todo-list .todo-list__label > input[checked]:before {
    background: ${MainColors.Primary};
    border-color: ${MainColors.Primary};
  }

  .ck.ck-editor {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const DescriptionCKEditor: React.FC<DescriptionEditorProps> = ({ value, onChange }) => {
  return (
    <EditorWrapper>
      <CKEditor
        editor={ClassicEditor}
        config={{
          plugins: [
            Essentials,
            Bold,
            Italic,
            Strikethrough,
            Paragraph,
            List,
            TodoList,
            Image,
            ImageUpload,
            ImageStyle,
            Base64UploadAdapter,
            Undo,
            BlockToolbar
          ],
          toolbar: [
            'imageUpload',
            'undo',
            'redo',
            '|',
            'numberedList',
            'bulletedList',
            'todoList',
            '|',
            'bold',
            'italic',
            'strikethrough'
          ]
        }}
        data={value.replaceAll('\n', '<br />')}
        onChange={(e: unknown, editor: { getData: () => string }) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </EditorWrapper>
  );
};
