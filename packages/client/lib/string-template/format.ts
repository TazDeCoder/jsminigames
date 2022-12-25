import format from 'string-template';

export default function templateToString(template: string, data: any) {
  return format(template, data);
}
