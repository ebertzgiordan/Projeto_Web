DROP TABLE IF EXISTS pontos_de_rede;
DROP TABLE IF EXISTS patch_panels;
DROP TABLE IF EXISTS sites;
DROP TABLE IF EXISTS usuarios;

-- Tabela de Usuários 
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    papel SMALLINT NOT NULL CHECK (papel IN (0, 1)) -- 0: Técnico, 1: Admin
);

-- Tabela de Sites (Racks) 
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    endereco VARCHAR(255),
    notas TEXT, -- Coluna para as notas/observações
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL -- Dono do Rack
);

-- Tabela de Patch Panels 
CREATE TABLE patch_panels (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    total_portas INTEGER NOT NULL,
    site_id INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE -- Liga ao Site
);

-- Tabela de Pontos de Rede 
CREATE TABLE pontos_de_rede (
    id SERIAL PRIMARY KEY,
    patch_panel_id INTEGER NOT NULL REFERENCES patch_panels(id) ON DELETE CASCADE, -- Liga ao Painel
    numero_porta INTEGER NOT NULL, -- O NÚMERO da porta (Ex: 1, 2, 24)
    tipo_uso VARCHAR(50) DEFAULT 'Vaga',
    localizacao VARCHAR(100),
    vlan INTEGER,
    ip_address VARCHAR(45),
    notas TEXT,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE SET NULL -- Último a modificar
);



ALTER DATABASE postgres OWNER TO netmanager;
ALTER TABLE usuario OWNER TO netmanager;
ALTER TABLE sites OWNER TO netmanager;
ALTER TABLE patch_panels OWNER TO netmanager;
ALTER TABLE pontos_de_rede OWNER TO netmanager;