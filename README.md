[README_NetManager.md](https://github.com/user-attachments/files/22465483/README_NetManager.md)
# **📡 NetManager — Gerenciador de IPs e Dispositivos**

## **1\. O Problema**

Equipes de TI em empresas e laboratórios enfrentam dificuldades para

**gerenciar endereços IP** de forma organizada. Hoje, muitas usam **planilhas manuais**, o que leva a:

* Conflitos de IP difíceis de detectar.  
* Falta de visibilidade sobre quais endereços estão livres ou reservados.  
* Dificuldade em mapear equipamentos (computadores, impressoras, IoT, roteadores).

Isso gera **retrabalho, falhas de rede e perda de tempo**. O **NetManager** busca resolver isso com um sistema simples de **gestão de IPs e dispositivos em rede local**.

---

## **2\. Atores e Decisores**

* **Usuários principais**:  
  * 👨‍💻  
     **Administradores de rede** → controlam e configuram todos os dispositivos/IPs.  
  * 🛠️  
     **Técnicos de suporte** → consultam e atualizam equipamentos.

---

## **3\. Casos de Uso**

#### **Todos os Usuários**

* ✅ Fazer login/logout.  
* ✅ Editar dados cadastrais pessoais.

#### **Administrador**

* ✅ Criar/editar/remover dispositivos e IPs.  
* ✅ Categorizar equipamentos (computador, impressora, roteador, IoT).  
* ✅ Consultar relatórios de uso: IPs livres, reservados, conflitos.

#### **Técnico**

* ✅ Listar dispositivos da rede.  
* ✅ Atualizar status de um dispositivo (ativo/inativo).

---

## **4\. Arquitetura e Tecnologias**

O sistema segue o modelo moderno

**SPA (Single Page Application) \+ API REST**, com uma separação clara entre o frontend e o backend.

### **4.1 Frontend (Interface do Usuário)**

* **Framework:** **React** com **TailwindCSS**.  
* **Recursos:** SPA (Single Page Application) que consome a API REST.  
* **Hospedagem:** GitHub Pages.

### **4.2 Backend (Servidor)**

* **Framework:** **Java 17** com **Spring Boot**.  
* **Banco de dados:** **PostgreSQL**.  
* **Recursos:** Spring Data JPA para persistência, Spring Security para autenticação e Maven para gerenciamento de dependências.  
* **Deploy:** Railway / Render.

### **4.3 Segurança**

* **Autenticação:** Login com senha hasheada (BCrypt) e controle de sessão via **JWT (JSON Web Tokens)**.  
* **Validação:** Validação de dados (IPs, MACs) no backend antes de persistir no banco.

---

## **5\. Fluxo Principal (MVP)**

1. Usuário faz login.  
2. Registra um novo dispositivo com IP, MAC e tipo.  
3. O sistema salva a informação no banco de dados.  
4. A lista principal é atualizada, mostrando o novo dispositivo.

**Critérios de aceite do MVP:**

* O novo dispositivo aparece na lista imediatamente após o cadastro.  
* A lista mostra apenas os dispositivos relevantes para o usuário logado.  
* O logout encerra a sessão do usuário de forma segura.

---

## **6\. Plano de Dados**

### **6.1 Entidades**

* **Usuario** → pessoa que acessa o sistema (técnico, admin).  
* **Dispositivo** → equipamento conectado à rede.  
* **Categoria** → tipo de dispositivo (computador, impressora, etc.).

### **6.2 Relações**

* Um  
   **Usuario** tem muitos **Dispositivos** (1:N).  
* Um  
   **Dispositivo** pertence a um **Usuario** (N:1).  
* Um  
   **Dispositivo** pertence a uma **Categoria** (N:1).  
* Uma  
   **Categoria** tem muitos **Dispositivos** (1:N).

---

## **⚙️ Como Executar o Projeto Localmente**

### **Pré-requisitos**

* JDK (Java Development Kit) (versão 17 ou superior)  
* Apache Maven  
* PostgreSQL  
* Node.js (para o frontend)  
* Git

### **1\. Banco de Dados**

1. Crie um banco de dados no PostgreSQL (ex:  
    `netmanager_db`).  
2. Execute o script  
    `database.sql` para criar todas as tabelas e inserir os dados iniciais.

### **2\. Backend (API Spring Boot)**

1. Navegue até a pasta  
    `backend`: `cd backend`.  
2. Abra o arquivo  
    `src/main/resources/application.properties` e **atualize as credenciais do seu banco de dados** (`spring.datasource.username` e `spring.datasource.password`).

Compile e inicie o servidor com o Maven:  
Bash  
./mvnw spring-boot:run

3.   
4. O servidor estará rodando em  
    `http://localhost:8080`.

### **3\. Frontend (React App)**

1. Abra um  
    **novo terminal** e navegue até a pasta `frontend`: `cd frontend`.  
2. Instale as dependências:  
    `npm install`.  
3. Inicie a aplicação React:  
    `npm start`.  
4. A aplicação abrirá no seu navegador em  
    `http://localhost:3000`.

### **👨‍💻 Usuário de Teste**

Para facilitar a demonstração, utilize o usuário abaixo:

* **Email:** `admin@netmanager.com`  
* **Senha:** `admin123`

---

## **📂 System Design**

A documentação detalhada do System Design (diagramas C4, ERD e de Sequência) pode ser encontrada na pasta

`/docs` do repositório.

* [Diagrama de Contexto (C4 \- Nível 1\)](https://www.google.com/search?q=)  
* [Diagrama de Contêineres (C4 \- Nível 2\)](https://www.google.com/search?q=)  
* [Modelo Entidade-Relacionamento (ERD)](https://www.google.com/search?q=)  
* [Diagramas de Sequência](https://www.google.com/search?q=)

---

## **📋 Endpoints Principais da API**

A seguir, a lista dos principais endpoints da API. As rotas que manipulam dados (

`/api/devices`, `/api/categories`) são protegidas e exigem um token de autenticação.

| Método | Rota | Descrição |
| :---- | :---- | :---- |
| `POST` | `/api/auth/register` | Registra um novo usuário. |
| `POST` | `/api/auth/login` | Autentica um usuário e retorna um JWT. |
| `GET` | `/api/devices` | Lista todos os dispositivos. |
| `POST` | `/api/devices` | Cria um novo dispositivo. |
| `PUT` | `/api/devices/{id}` | Atualiza um dispositivo existente. |
| `DELETE` | `/api/devices/{id}` | Exclui um dispositivo. |
| `GET` | `/api/categories` | Lista todas as categorias. |

\-- Apaga tabelas existentes para garantir um ambiente limpo (opcional)  
DROP TABLE IF EXISTS pontos\_de\_rede, sites, usuarios;

\-- Tabela para armazenar os usuários do sistema  
CREATE TABLE usuarios (  
    id SERIAL PRIMARY KEY,  
    nome VARCHAR(100) NOT NULL,  
    email VARCHAR(100) NOT NULL UNIQUE,  
    senha\_hash VARCHAR(255) NOT NULL,  
    papel SMALLINT NOT NULL CHECK (papel IN (0, 1)), \-- 0: Técnico, 1: Administrador  
    data\_criacao TIMESTAMP WITH TIME ZONE DEFAULT now()  
);

COMMENT ON TABLE usuarios IS 'Armazena os usuários do sistema (técnicos e administradores).';  
COMMENT ON COLUMN usuarios.papel IS 'Define o nível de permissão do usuário (0 para Técnico, 1 para Administrador).';

\-- Tabela para armazenar os locais (filiais, agências, clientes)  
CREATE TABLE sites (  
    id SERIAL PRIMARY KEY,  
    nome VARCHAR(100) NOT NULL UNIQUE,  
    endereco VARCHAR(255),  
    data\_criacao TIMESTAMP WITH TIME ZONE DEFAULT now()  
);

COMMENT ON TABLE sites IS 'Armazena os sites físicos (filiais, clientes) cuja infraestrutura é documentada.';

\-- Tabela principal para documentar cada ponto da infraestrutura de rede  
CREATE TABLE pontos\_de\_rede (  
    id SERIAL PRIMARY KEY,  
    site\_id INTEGER NOT NULL REFERENCES sites(id) ON DELETE CASCADE,  
    usuario\_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE SET NULL, \-- Mantém o registro mesmo se o usuário for deletado  
    patch\_panel\_porta VARCHAR(50) NOT NULL,  
    tipo\_uso VARCHAR(50) NOT NULL,  
    localizacao VARCHAR(100),  
    vlan INTEGER,  
    ip\_address VARCHAR(45),  
    notas TEXT,  
    data\_modificacao TIMESTAMP WITH TIME ZONE DEFAULT now()  
);

COMMENT ON TABLE pontos\_de\_rede IS 'Armazena cada ponto de rede documentado, associado a um site.';  
COMMENT ON COLUMN pontos\_de\_rede.patch\_panel\_porta IS 'Identificador da porta no patch panel (ex: LG.01.15).';  
COMMENT ON COLUMN pontos\_de\_rede.tipo\_uso IS 'O tipo de dispositivo ou finalidade (ex: PC, Impressora, Reserva).';  
COMMENT ON COLUMN pontos\_de\_rede.localizacao IS 'Descrição física da localização do ponto (ex: Mesa Atendimento 07).';

\-- INSERÇÃO DE DADOS DE EXEMPLO

\-- Inserir usuários  
INSERT INTO usuarios (nome, email, senha\_hash, papel) VALUES  
('Admin DocuNet', 'admin@docunet.com', '$2b$10$your\_bcrypt\_hash\_here\_for\_admin123', 1), \-- Lembre-se de gerar um hash real\!  
('Tecnico Fulano', 'fulano.tech@docunet.com', '$2b$10$your\_bcrypt\_hash\_here\_for\_user123', 0);

\-- Inserir um site  
INSERT INTO sites (nome, endereco) VALUES  
('Agência São Joaquim', 'Av. Central, 456, Centro, São Joaquim \- SC');

\-- Inserir pontos de rede baseados no relatório  
INSERT INTO pontos\_de\_rede (site\_id, usuario\_id, patch\_panel\_porta, tipo\_uso, localizacao, vlan, ip\_address) VALUES  
(1, 1, 'LG.01.01', 'Impressora', 'Atendimento', 104, '10.88.4.61'),  
(1, 1, 'LG.01.02', 'PC', 'Mesa Atendimento 05', 104, NULL),  
(1, 1, 'LG.01.03', 'PC', 'Mesa Gerente', 104, NULL),  
(1, 1, 'LG.01.04', 'PC', 'Mesa Atendimento 07', 104, NULL),  
(1, 2, 'LG.01.08', 'Reserva', '–', NULL, NULL),  
(1, 2, 'LG.01.15', 'PC', 'Senha Caixas', 106, NULL),  
(1, 2, 'LG.01.19', 'ATMR Novo', 'Entrada', 100, NULL),  
(1, 1, 'LG.02.13', 'PC', 'Caixa 1', 104, NULL),  
(1, 1, 'LG.02.24', 'Impressora', 'Caixa', 104, '10.88.4.62');

\-- CONSULTAS DE VERIFICAÇÃO

\-- 1\. Listar todos os pontos de rede da Agência São Joaquim  
SELECT  
    p.patch\_panel\_porta,  
    p.tipo\_uso,  
    p.localizacao,  
    p.vlan,  
    p.ip\_address,  
    u.nome AS modificado\_por  
FROM  
    pontos\_de\_rede p  
JOIN  
    sites s ON p.site\_id \= s.id  
JOIN  
    usuarios u ON p.usuario\_id \= u.id  
WHERE  
    s.nome \= 'Agência São Joaquim'  
ORDER BY  
    p.patch\_panel\_porta;

\-- 2\. Encontrar o que está conectado na porta LG.01.15  
SELECT tipo\_uso, localizacao, vlan FROM pontos\_de\_rede WHERE patch\_panel\_porta \= 'LG.01.15';  
