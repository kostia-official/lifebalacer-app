import { apolloClient } from '../apollo';
import { PrepareUploadRequestDocument, PrepareUploadRequestQuery } from '../generated/apollo';
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
    const { data } = await apolloClient.query<PrepareUploadRequestQuery>({
      query: PrepareUploadRequestDocument,
      fetchPolicy: 'network-only'
    });
    const { url, fields } = data.prepareUploadRequest;

    return { url, fields: JSON.parse(fields) };
  }

  async upload(file: any) {
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

    return `${config.fileServer.url}/${fields.key}`;
  }
}

export const fileUpload = new FileUpload();
