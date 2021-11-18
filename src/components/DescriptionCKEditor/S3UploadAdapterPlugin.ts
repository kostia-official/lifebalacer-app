import { FileLoader } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { isUploadingVar } from '../../reactiveState';
import { fileUpload } from '../../services/fileUpload';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

class S3UploadAdapter {
  private loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  async upload() {
    try {
      isUploadingVar(true);

      const file = await this.loader.file;
      const url = await fileUpload.upload(file);

      const result: Record<string, string> = {
        default: url
      };

      return result;
    } finally {
      isUploadingVar(false);
    }
  }

  abort() {
    isUploadingVar(false);
  }
}

export function S3UploadAdapterPlugin(editor: ClassicEditor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new S3UploadAdapter(loader);
  };
}
