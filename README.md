# 📡 NetManager — Gerenciador de Documentação de Redes

## 1. O Problema

A documentação de infraestrutura de rede física em empresas, clínicas e agências é frequentemente feita em documentos estáticos como planilhas ou arquivos `.docx`. Este método é descentralizado, difícil de consultar e propenso a desatualização, gerando desafios como:

* **Dificuldade na Manutenção:** Identificar rapidamente qual dispositivo está conectado à porta `LG.01.15` de um patch panel é uma tarefa manual e demorada.
* **Falta de Visão Centralizada:** É impossível ter uma visão geral e em tempo real da ocupação de portas, VLANs em uso ou do "tamanho" da infraestrutura de cada cliente.
* **Ineficiência Operacional:** Técnicos em campo perdem tempo consultando documentos desatualizados, o que pode levar a erros de configuração.

O **NetManager** resolve este problema ao substituir a documentação estática por uma plataforma web dinâmica, centralizada e multiusuário, otimizada para a gestão de racks e patch panels.

## 2. Atores e Decisores

* **Usuários principais**:
    * 👨‍💻 **Administrador (Nível 1)** → Possui visão completa de todos os racks/clientes cadastrados no sistema. Pode criar, editar e remover qualquer dado, além de gerenciar outros usuários.
    * 🛠️ **Técnico (Nível 2)** → Possui uma visão restrita. Pode cadastrar e gerenciar **apenas os seus próprios** racks/clientes, sem visualizar os dados de outros técnicos.

## 3. Casos de Uso

#### Todos os Usuários
* ✅ Fazer login/logout no sistema.
* ✅ Acessar a página de "Meu Perfil" para editar suas próprias informações.
* ✅ Visualizar a página de "Ajuda" com a documentação do sistema.

#### Administrador
* ✅ Visualizar dashboards com estatísticas **globais** de toda a infraestrutura.
* ✅ Criar, visualizar, editar e remover **todos** os racks/clientes.
* ✅ Para cada rack, adicionar novos patch panels, que geram as portas automaticamente.
* ✅ Editar os detalhes de cada porta de rede (uso, localização, VLAN, IP).
* ✅ Acessar a tela de "Gerenciar Usuários" para visualizar e editar os papéis dos usuários cadastrados.

#### Técnico
* ✅ Visualizar dashboards com estatísticas **exclusivas** de seus próprios racks.
* ✅ Criar, visualizar, editar e remover **apenas os seus próprios** racks.
* ✅ Para seus racks, adicionar patch panels e editar os detalhes das portas.

## 4. Arquitetura e Tecnologias

O sistema segue o modelo moderno **SPA (Single Page Application) + API REST**.

### 4.1 Frontend (Interface do Usuário)
* **Framework:** **React** com **JavaScript**.
* **Estilização:** **React Bootstrap** e **Bootstrap**, com um tema escuro customizado inspirado no Gemini.
* **Bibliotecas-chave:**
    * `Vite` como ferramenta de build.
    * `React Router DOM` para navegação e rotas.
    * `Axios` para comunicação com a API.
    * `@tanstack/react-query` para gerenciamento de estado assíncrono.
    * `react-pro-sidebar` para o menu lateral.
    * `chart.js` e `react-chartjs-2` para os gráficos do dashboard.
    * `react-awesome-reveal` para animações.

### 4.2 Backend (Servidor)
* **Framework:** **Java 17** com **Spring Boot**.
* **Banco de dados:** **PostgreSQL**.
* **Recursos:** Spring Data JPA para persistência, Spring Security para autenticação e Maven para gerenciamento de dependências.

### 4.3 Segurança
* **Autenticação:** Login com senha hasheada (BCrypt) e controle de sessão via **JWT (JSON Web Tokens)**.
* **Autorização:** Controle de acesso baseado em papéis (`ROLE_ADMIN`, `ROLE_USER`) e propriedade dos dados (técnico só acessa seus próprios racks).

## 5. Plano de Dados (Entidades Finais)

O modelo de dados evoluiu para uma estrutura profissional que reflete a realidade da gestão de redes.

* **Usuario:** Representa a conta de um profissional (Admin ou Técnico).
* **Site:** Representa um "Rack" ou "Cliente", que é um local físico gerenciado. **Cada Site pertence a um Usuário**.
* **PatchPanel:** Representa um patch panel físico dentro de um Site, com um nome (`LG.01`) e um total de portas. **Cada Patch Panel pertence a um Site**.
* **PontoDeRede:** Representa uma porta específica (`1` a `24`) dentro de um Patch Panel. Suas propriedades (uso, localização, VLAN) são editáveis. **Cada Ponto de Rede pertence a um Patch Panel**.

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* JDK (Java 17 ou superior)
* Apache Maven
* PostgreSQL
* Node.js (LTS)
* Git

### 1. Banco de Dados
1.  Garanta que o PostgreSQL esteja rodando.
2.  Crie um usuário e um banco de dados com os comandos abaixo (ou usando uma ferramenta como DBeaver):
    ```sql
    CREATE USER netmanager WITH PASSWORD 'matrix007!';
    CREATE DATABASE netmanager_db OWNER netmanager;
    ```
3.  Execute o script `database.sql` (disponível na raiz do projeto) para criar todas as tabelas e inserir um usuário admin inicial.

### 2. Backend (API Spring Boot)
1.  Abra um terminal e navegue até a pasta `backend`: `cd backend`
2.  Verifique se o arquivo `src/main/resources/application.properties` está com as credenciais corretas do seu banco.
3.  Execute o comando para iniciar o servidor:
    ```bash
    ./mvnw spring-boot:run
    ```
4.  O servidor estará rodando em **`http://localhost:8081`**.

### 3. Frontend (React App)
1.  Abra um **novo terminal** e navegue até a pasta `frontend`: `cd frontend`
2.  Instale todas as dependências: `npm install`
3.  Inicie a aplicação: `npm run dev`
<<<<<<< HEAD
4.  A aplicação abrirá no seu navegador, geralmente em **`http://localhost:
=======
4.  A aplicação abrirá no seu navegador, geralmente em **`http://localhost:
>>>>>>> 1731df3e3dd8b587132ef6e64a471e89eec08198
