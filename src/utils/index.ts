import { Server, Route, } from 'restify';
import signale from 'signale';
import xlsx from 'node-xlsx';

export const allowOrigins = (): string[] => {
  const origins = process.env.ALLOW_ORIGINS_URLS || '';

  return origins.split(' ').filter((el) => el !== '');
};

export const getDominio = (url: string, port: string | number = '0000'): string => {
  const urlSplit = url.split(':') || 'http://127.0.0.1:0000';
  const [ protocol, host, ] = urlSplit;
  if(host.includes('169.254.0.1'))
    return `${protocol}://127.0.0.1:${port}`;

  return `${protocol}:${host}:${port}`;
};

export const listAllRoutes = (server: Server, dominio: string): void => {
  Object.values(server.router.getRoutes()).forEach((value: Route) =>
    signale.info(`ENDPOINT REGISTERED :: ${value.method} :: ${dominio}${value.path}`)
  );
};

export const readExcelToData = (fileName: string) => {
  const workSheetsFromFile = xlsx.parse(fileName);

  return workSheetsFromFile;
};
