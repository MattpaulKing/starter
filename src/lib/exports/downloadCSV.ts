import { json2csv, type Json2CsvOptions } from 'json-2-csv';

export default function({ content, filename, opts = {} }: { content: Record<string, unknown>[], filename: string, opts?: Json2CsvOptions }) {
  let blob = new Blob([
    json2csv(content, {
      checkSchemaDifferences: true,
      useDateIso8601Format: true,
      preventCsvInjection: true,
      ...opts
    })
  ]);
  let a = document.createElement('a');
  a.setAttribute('download', filename);
  a.setAttribute('href', window.URL.createObjectURL(blob));
  a.click();
  a.remove();
}
