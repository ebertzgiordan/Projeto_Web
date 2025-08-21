# 📡 NetManager — Gerenciador de IPs e Dispositivos

## 1) Problema
Equipes de TI em empresas e laboratórios enfrentam dificuldades para **gerenciar endereços IP** de forma organizada.  
Hoje, muitas usam **planilhas manuais**, o que leva a:
- Conflitos de IP difíceis de detectar.  
- Falta de visibilidade sobre quais endereços estão livres ou reservados.  
- Dificuldade em mapear equipamentos (computadores, impressoras, IoT, roteadores).  

Isso gera **retrabalho, falhas de rede e perda de tempo**.  
O **NetManager** busca resolver isso com um sistema simples de **gestão de IPs e dispositivos em rede local**.  

---

## 2) Atores e Decisores
- **Usuários principais**:  
  - 👨‍💻 Administradores de rede → controlam e configuram todos os dispositivos/IPs.  
  - 🛠️ Técnicos de suporte → consultam e atualizam equipamentos.  
- **Decisores/Apoiadores**:  
  - 📊 Gestores de TI → acompanham relatórios e aprovam o uso do sistema.  

---

## 3) Casos de Uso
- **Todos**  
  - Fazer login/logout.  
  - Editar dados cadastrais pessoais.  

- **Administrador**  
  - Criar/editar/remover dispositivos e IPs.  
  - Categorizar equipamentos (computador, impressora, roteador, IoT).  
  - Consultar relatórios de uso: IPs livres, reservados, conflitos.  

- **Técnico**  
  - Listar dispositivos da rede.  
  - Atualizar status de um dispositivo (ativo/inativo).  

- **Gestor**  
  - Visualizar dashboards e gráficos de utilização de IPs.  

---

## 4) Limites e Suposições
- **Limites**:  
  - Entrega final até **30/11/2025**.  
  - Rodar em navegadores modernos.  
  - Sem uso de serviços pagos.  

- **Suposições**:  
  - Internet disponível para acessar API e repositório.  
  - Usuários têm Chrome/Firefox atualizados.  

- **Plano B**:  
  - Sem internet → rodar localmente com banco SQLite.  
  - Sem tempo de validação em turma → testar com no mínimo 2 colegas.  

---

## 5) Hipóteses + Validação
- **Hipótese de Valor (H-Valor):**  
  Se o administrador visualizar IPs livres e conflitos automaticamente, o tempo de resolução de falhas de rede **reduz em ≥30%**.  
  - **Validação:** teste com 5 técnicos → meta: ≥4 confirmam utilidade.  

- **Hipótese de Viabilidade (H-Viabilidade):**  
  Usando **React + FastAPI + SQLite**, cadastro e listagem de IPs ocorre em **≤1 segundo**.  
  - **Validação:** medir 30 ações → meta: ≥27 em até 1s.  

---

## 6) Fluxo Principal + Primeira Fatia
**Fluxo principal (MVP):**  
1. Usuário faz login.  
2. Registra dispositivo com IP, MAC e tipo.  
3. Sistema salva no banco.  
4. Lista mostra dispositivo com status do IP (livre/ocupado/conflito).  

**Primeira fatia vertical (MVP):**  
- Login.  
- Cadastro de dispositivo/IP.  
- Listagem de dispositivos.  

**Critérios de aceite:**  
- Novo dispositivo aparece na lista após cadastro.  
- Lista mostra apenas dispositivos do usuário logado.  
- Logout encerra sessão.  

---

## 7) Esboços de Telas (wireframes)
Sugestões de telas:  
- Tela de **Login**.  
- Tela inicial com **dashboard (gráfico de IPs livres/ocupados)**.  
- Tela “Lista de Dispositivos” com tabela: IP, MAC, categoria, status.  
- Formulário “Novo Dispositivo” (com campos: IP, MAC, categoria, gateway).

---

## 8) Arquitetura

### 8.1 Front-end
- **Framework:** React + TailwindCSS.  
- **Hospedagem:** Vercel / GitHub Pages.  
- **Recursos:** SPA (Single Page Application), consumo de API REST.  

### 8.2 Back-end
- **Framework:** FastAPI (Python).  
- **Banco de dados:** SQLite (inicial, podendo migrar para PostgreSQL).  
- **Deploy:** Railway / Render.  
- **Segurança:** JWT para autenticação, cookies `HttpOnly` + `SameSite`.  

### 8.3 Diagramas
- **C4 nível 1 (Contexto):** mostra usuário → app web → API → banco.  
- **C4 nível 2 (Contêineres):** divide em front-end, back-end, DB.  
- **ERD:** entidades (Usuário, Dispositivo, Categoria).  
- **Sequência:** fluxo do login e fluxo do cadastro de dispositivo.  

---

## 9) Plano de Dados (Dia 0)

### 9.1 Entidades
- **Usuario** → pessoa que acessa o sistema.  
- **Dispositivo** → equipamento conectado à rede.  
- **Categoria** → tipo de dispositivo (computador, impressora, roteador, IoT).  

---

### 9.2 Campos por Entidade

#### Usuario
| Campo           | Tipo       | Obrigatório | Exemplo             |
|-----------------|-----------|-------------|---------------------|
| id              | número    | sim         | 1                   |
| nome            | texto     | sim         | "Carlos Silva"      |
| email           | texto     | sim (único) | "carlos@empresa.com"|
| senha_hash      | texto     | sim         | "$2a$10$..."        |
| papel           | número    | sim         | 0=tecnico, 1=admin  |
| dataCriacao     | data/hora | sim         | 2025-08-21 10:20    |
| dataAtualizacao | data/hora | sim         | 2025-08-21 10:50    |

#### Dispositivo
| Campo           | Tipo       | Obrigatório | Exemplo             |
|-----------------|-----------|-------------|---------------------|
| id              | número    | sim         | 2                   |
| usuario_id      | número FK | sim         | 1                   |
| ip_address      | texto     | sim         | "192.168.0.12"      |
| mac_address     | texto     | sim         | "00:1A:2B:3C:4D:5E" |
| categoria_id    | número FK | sim         | 3 (impressora)      |
| status          | texto     | sim         | "ocupado"           |
| gateway         | texto     | opcional    | "192.168.0.1"       |
| dataCriacao     | data/hora | sim         | 2025-08-21 10:30    |

#### Categoria
| Campo | Tipo    | Obrigatório | Exemplo       |
|-------|--------|-------------|---------------|
| id    | número | sim         | 1             |
| nome  | texto  | sim         | "Impressora"  |

---

### 9.3 Relações
- Um **Usuario** tem muitos **Dispositivos** (1:N).  
- Um **Dispositivo** pertence a um **Usuario** (N:1).  
- Um **Dispositivo** pertence a uma **Categoria** (N:1).  
- Uma **Categoria** tem muitos **Dispositivos** (1:N).  

---

## 🔒 Segurança
- **Autenticação:** login com senha hasheada (bcrypt).  
- **Sessão:** JWT + cookies `HttpOnly` e `SameSite=Strict`.  
- **Proteção:** CSRF nos formulários.  
- **Validação:** IPs e MACs validados via regex antes de salvar.  

---

## ✅ Conclusão
O **NetManager** será uma aplicação web completa para gerenciar IPs e dispositivos em redes locais, com:  
- CRUD de usuários + autenticação segura.  
- CRUD de dispositivos + categorias.  
- Dashboards de status de IPs.  
- Segurança mínima implementada.  
- Arquitetura documentada com C4, ERD e sequência.  

---