// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import styled from 'styled-components';
import { MainColors } from '../../common/colors';
import grey from '@material-ui/core/colors/grey';
import { sentryService } from '../../services/sentry';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { FlexBox } from '../FlexBox';
import { useToggle } from 'react-use';
import { Icon } from '@iconify/react';
import editSettings24Filled from '@iconify/icons-fluent/edit-settings-24-filled';
import Writer from '@ckeditor/ckeditor5-engine/src/model/writer';
import { AutoSaveInputLabel } from '../../containers/EntriesForm/components/EntryModalContent/components/AutoSaveInputLabel';
import { useReactiveVar } from '@apollo/client';
import { isUploadingVar } from '../../reactiveState';
import { S3UploadAdapterPlugin } from './S3UploadAdapterPlugin';

export interface DescriptionEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isFocusDescription?: boolean;
  isSaving?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledToggle = styled(ToggleButton)`
  padding: 5px;
`;

const EditorWrapper = styled.div<{ $isShowToolbar: boolean }>`
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
  --ck-color-image-upload-icon-background: ${MainColors.Primary};

  & .ck-tooltip {
    display: block;

    @media (hover: none) {
      display: none;
    }
  }

  .ck-content .todo-list .todo-list__label > input:before {
    border: 1px solid ${MainColors.White};
  }

  .ck-content .todo-list .todo-list__label > input[checked]:before {
    background: ${MainColors.Primary};
    border-color: ${MainColors.Primary};
  }

  .ck.ck-editor {
    display: flex;
    flex-direction: column-reverse;
  }

  .ck-editor__top {
    display: ${(p) => (p.$isShowToolbar ? 'block' : 'none')};
  }
`;

export const DescriptionCKEditor: React.FC<DescriptionEditorProps> = ({
  value,
  onChange,
  label,
  isFocusDescription,
  isSaving
}) => {
  const [isShowToolbar, toggleIsShowToolbar] = useToggle(false);
  const isFileUploading = useReactiveVar(isUploadingVar);

  return (
    <Wrapper>
      <FlexBox row justifyContent="space-between" centerY>
        <AutoSaveInputLabel label={label} isLoading={isSaving || isFileUploading} />

        <StyledToggle
          value="check"
          size="small"
          selected={isShowToolbar}
          onChange={() => toggleIsShowToolbar()}
        >
          <Icon icon={editSettings24Filled} width={18} />
        </StyledToggle>
      </FlexBox>

      <EditorWrapper $isShowToolbar={isShowToolbar}>
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
              S3UploadAdapterPlugin,
              Undo,
              BlockToolbar
            ],
            toolbar: [
              'undo',
              'redo',
              '|',
              'imageUpload',
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
          onChange={(e: unknown, editor: ClassicEditor) => {
            const data = editor.getData();
            onChange(data);
          }}
          onError={(error: Error, errorDetails: any) => {
            sentryService.captureException(error, { extra: errorDetails });
          }}
          onReady={(editor: ClassicEditor) => {
            if (isFocusDescription) editor.editing.view.focus();
          }}
          onFocus={(e: unknown, editor: ClassicEditor) => {
            if (!isFocusDescription) return;

            editor.model.change((writer: Writer) => {
              const rootElement = editor.model.document.getRoot();
              if (rootElement) {
                writer.setSelection(writer.createPositionAt(rootElement, 'end'));
              }
            });
          }}
        />
      </EditorWrapper>
    </Wrapper>
  );
};
