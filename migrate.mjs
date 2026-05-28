import { createClient } from '@libsql/client';
import 'dotenv/config';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function getColumns(table) {
  const result = await client.execute(`PRAGMA table_info("${table}")`);
  return result.rows.map((r) => r.name);
}

async function addMissingColumns(table, columns) {
  const existing = await getColumns(table);
  for (const [col, type] of columns) {
    if (!existing.includes(col)) {
      await client.execute(`ALTER TABLE "${table}" ADD COLUMN "${col}" ${type}`);
      console.log(`OK: ALTER TABLE ${table} ADD COLUMN ${col}`);
    } else {
      console.log(`--: ${table}.${col} já existe`);
    }
  }
}

async function migrate() {
  console.log('Verificando colunas ausentes...\n');

  await addMissingColumns('professional_profiles', [
    ['descricao', 'TEXT'],
    ['cidade', 'TEXT'],
    ['valor_hora', 'REAL'],
    ['media_estrelas', 'REAL DEFAULT 0'],
    ['total_avaliacoes', 'INTEGER DEFAULT 0'],
    ['telefone', 'TEXT'],
  ]);

  console.log('\nMigracao concluida.');
  client.close();
}

migrate();
