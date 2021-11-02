import DOMPurify from 'dompurify';

const domPurify = DOMPurify(window);

export const sanitizeHtml = (htmlString: string) => domPurify.sanitize(htmlString);
