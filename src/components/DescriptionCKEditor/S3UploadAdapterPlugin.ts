import { FileLoader } from '@ckeditor/ckeditor5-upload/src/filerepository';
import { isUploadingVar } from '../../reactiveState';
import { fileUpload } from '../../services/fileUpload';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

class S3UploadAdapter {
  private loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  // Unused, should be working if needed
  getVideoDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement('video');

      video.addEventListener(
        'loadedmetadata',
        function () {
          const height = this.videoHeight;
          const width = this.videoWidth;

          resolve({ height, width });
        },
        false
      );

      video.src = url;
    });
  }

  async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();

      img.onload = function () {
        const { width, height } = img;
        resolve({ width, height });
        URL.revokeObjectURL(img.src);
      };

      img.src = url;
    });
  }

  async upload() {
    try {
      isUploadingVar(true);

      const file = await this.loader.file;

      if (!file) return {};

      const imageDimensions = file.type.includes('image')
        ? await this.getImageDimensions(file)
        : {};

      const { url } = await fileUpload.upload(file);

      const result: Record<string, any> = {
        urls: {
          default: url
        },
        ...imageDimensions
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

  editor.plugins
    .get('ImageUploadEditing')
    .on('uploadComplete', (evt, { data, imageElement }: any) => {
      editor.model.change((writer) => {
        if (data.width) writer.setAttribute('width', data.width, imageElement);
        if (data.height) writer.setAttribute('height', data.height, imageElement);
      });
    });

  editor.conversion.for('downcast').add((dispatcher) => {
    dispatcher.on(
      'insert:imageBlock',
      (evt, data, conversionApi) => {
        const viewWriter = conversionApi.writer;
        const element = conversionApi.mapper.toViewElement(data.item)?.getChild(0);

        if (!element) return;

        const width = data.item.getAttribute('width');
        const height = data.item.getAttribute('height');

        if (!width || !height) return;

        viewWriter.setAttribute('width', width, element as any);
        viewWriter.setAttribute('height', height, element as any);
      },
      { priority: 'low' }
    );
  });

  editor.conversion.for('downcast').add((dispatcher) => {
    dispatcher.on(
      'insert:videoBlock',
      (evt, data, conversionApi) => {
        const viewWriter = conversionApi.writer;
        const video = conversionApi.mapper.toViewElement(data.item)?.getChild(0);

        viewWriter.setAttribute('controls', 'true', video as any);
        viewWriter.setAttribute('height', '512', video as any);
      },
      { priority: 'low' }
    );
  });
}
