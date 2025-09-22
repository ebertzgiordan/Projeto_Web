-- Apaga tabelas existentes para garantir um ambiente limpo (opcional)
DROP TABLE IF EXISTS pontos_de_rede, sites, usuarios;

CREATE USER netmanager WITH PASSWORD '123456';
ALTER USER netmanager WITH PASSWORD 'matrix007!';

-- Tabela para armazenar os usuários do sistema
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    papel SMALLINT NOT NULL CHECK (papel IN (0, 1)), -- 0: Técnico, 1: Administrador
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT now()
);

COMMENT ON TABLE usuarios IS 'Armazena os usuários do sistema (técnicos e administradores).';
COMMENT ON COLUMN usuarios.papel IS 'Define o nível de permissão do usuário (0 para Técnico, 1 para Administrador).';

-- Tabela para armazenar os locais (filiais, agências, clientes)
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    endereco VARCHAR(255),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT now()
);

COMMENT ON TABLE sites IS 'Armazena os sites físicos (filiais, clientes) cuja infraestrutura é documentada.';

-- Tabela principal para documentar cada ponto da infraestrutura de rede
CREATE TABLE pontos_de_rede (
    id SERIAL PRIMARY KEY,
    site_id INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE SET NULL, -- Mantém o registro mesmo se o usuário for deletado
    patch_panel_porta VARCHAR(50) NOT NULL,
    tipo_uso VARCHAR(50) NOT NULL,
    localizacao VARCHAR(100),
    vlan INTEGER,
    ip_address VARCHAR(45),
    notas TEXT,
    data_modificacao TIMESTAMP WITH TIME ZONE DEFAULT now()
);

COMMENT ON TABLE pontos_de_rede IS 'Armazena cada ponto de rede documentado, associado a um site.';
COMMENT ON COLUMN pontos_de_rede.patch_panel_porta IS 'Identificador da porta no patch panel (ex: LG.01.15).';
COMMENT ON COLUMN pontos_de_rede.tipo_uso IS 'O tipo de dispositivo ou finalidade (ex: PC, Impressora, Reserva).';
COMMENT ON COLUMN pontos_de_rede.localizacao IS 'Descrição física da localização do ponto (ex: Mesa Atendimento 07).';


-- INSERÇÃO DE DADOS DE EXEMPLO

-- Inserir usuários
INSERT INTO usuarios (nome, email, senha_hash, papel) VALUES
('Admin DocuNet', 'admin@docunet.com', '$2b$10$your_bcrypt_hash_here_for_admin123', 1), -- Lembre-se de gerar um hash real!
('Tecnico Fulano', 'fulano.tech@docunet.com', '$2b$10$your_bcrypt_hash_here_for_user123', 0);

-- Inserir um site
INSERT INTO sites (nome, endereco) VALUES
('Agência São Joaquim', 'Av. Central, 456, Centro, São Joaquim - SC');

-- Inserir pontos de rede baseados no relatório
INSERT INTO pontos_de_rede (site_id, usuario_id, patch_panel_porta, tipo_uso, localizacao, vlan, ip_address) VALUES
(1, 1, 'LG.01.01', 'Impressora', 'Atendimento', 104, '10.88.4.61'),
(1, 1, 'LG.01.02', 'PC', 'Mesa Atendimento 05', 104, NULL),
(1, 1, 'LG.01.03', 'PC', 'Mesa Gerente', 104, NULL),
(1, 1, 'LG.01.04', 'PC', 'Mesa Atendimento 07', 104, NULL),
(1, 2, 'LG.01.08', 'Reserva', '–', NULL, NULL),
(1, 2, 'LG.01.15', 'PC', 'Senha Caixas', 106, NULL),
(1, 2, 'LG.01.19', 'ATMR Novo', 'Entrada', 100, NULL),
(1, 1, 'LG.02.13', 'PC', 'Caixa 1', 104, NULL),
(1, 1, 'LG.02.24', 'Impressora', 'Caixa', 104, '10.88.4.62');


-- CONSULTAS DE VERIFICAÇÃO

-- 1. Listar todos os pontos de rede da Agência São Joaquim
SELECT
    p.patch_panel_porta,
    p.tipo_uso,
    p.localizacao,
    p.vlan,
    p.ip_address,
    u.nome AS modificado_por
FROM
    pontos_de_rede p
JOIN
    sites s ON p.site_id = s.id
JOIN
    usuarios u ON p.usuario_id = u.ids
WHERE
    s.nome = 'Agência São Joaquim'
ORDER BY
    p.patch_panel_porta;

-- 2. Encontrar o que está conectado na porta LG.01.15
SELECT tipo_uso, localizacao, vlan FROM pontos_de_rede WHERE patch_panel_porta = 'LG.01.15';





-- Reassign ownership of the database to your application's user
ALTER DATABASE netmanager_db OWNER TO netmanager;

-- Reassign ownership of the 'public' schema (where tables live) to your user
ALTER SCHEMA public OWNER TO netmanager;

-- Reassign ownership of ALL tables within the public schema to your user
DO $$
DECLARE
    t_name TEXT;
BEGIN
    FOR t_name IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'ALTER TABLE ' || t_name || ' OWNER TO netmanager;';
    END LOOP;
END$$;

-- Grant all standard usage permissions on the schema to your user
GRANT ALL ON SCHEMA public TO netmanager;