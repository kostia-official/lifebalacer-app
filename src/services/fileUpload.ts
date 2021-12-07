import { apolloClient } from '../apollo';
import { PrepareUploadRequestDocument, PrepareUploadRequestMutation } from '../generated/apollo';
import FormData from 'form-data';
import { config } from '../common/config';

export interface UploadRequestResult {
  url: string;
  fields: UploadRequestFields;
}

export interface UploadRequestFields {
  'X-Amz-Algorithm': string;
  'X-Amz-Credential': string;
  'X-Amz-Date': string;
  'X-Amz-Signature': string;
  Policy: string;
  acl: string;
  bucket: string;
  key: string;
}

class FileUpload {
  async prepareUploadRequest(): Promise<UploadRequestResult> {
    const { data } = await apolloClient.mutate<PrepareUploadRequestMutation>({
      mutation: PrepareUploadRequestDocument,
      fetchPolicy: 'network-only'
    });
    if (!data?.prepareUploadRequest) throw new Error();

    const { url, fields } = data.prepareUploadRequest;

    return { url, fields: JSON.parse(fields) };
  }

  async upload(file: File) {
    const { url, fields } = await this.prepareUploadRequest();

    const form = new FormData();
    Object.entries(fields).forEach(([field, value]) => {
      form.append(field, value);
    });
    form.append('file', file);

    await fetch(url, {
      method: 'POST',
      body: form as any
    });

    return {
      url: `${config.fileServer.url}/${fields.key}`,
      key: fields.key
    };
  }
}

export const fileUpload = new FileUpload();
