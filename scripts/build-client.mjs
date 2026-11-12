// Сборка генератора для одного клиента:  npm run build:client -- <id>
// Результат: dist-clients/<id>/ (готовые файлы) и dist-clients/<id>.zip для загрузки на хостинг.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';

const id = process.argv[2];
if (!id) { console.error('Укажите id клиента, например: npm run build:client -- bonim'); process.exit(1); }
if (!existsSync(`clients/${id}/client.json`)) { console.error(`Нет файла clients/${id}/client.json. Сначала бриф: python scripts/brief_to_client.py <бриф.xlsx>`); process.exit(1); }

mkdirSync('dist-clients', { recursive: true });
const env = { ...process.env, CLIENT: id };
execSync(`npx vite build --outDir dist-clients/${id} --emptyOutDir`, { stdio: 'inherit', env });
console.log(`\nГотово: dist-clients/${id}/`);
console.log('Загрузить содержимое папки в cp.newformatai.com/' + id + '/ (подробности в FACTORY.md)');
