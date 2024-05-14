# Arquitetura da aplicação

## Backend
O backend segue o padrão **Arquitetura Hexagonal** (também conhecido como Ports and Adapters).

O backend é dividido em vários diretórios:

- `adapters`: Este módulo contém o código que adapta a lógica de negócios central para o mundo exterior. Inclui os endpoints da API (`api`), controladores (`controllers`) e operações de banco de dados (`database`).
- `core`: Este módulo contém a lógica de negócios central do aplicativo. Inclui os modelos de domínio (`domain`) e interfaces (`interfaces`).
- `tests`: Este módulo contém testes unitários para o aplicativo.

O backend também inclui um Dockerfile para a contêinerização e um arquivo `requirements.txt` para gerenciar as dependências do Python.

```

├── architecture.md
├── coverage.xml
├── docker-compose.yml
├── README.md
└── backend
    ├── adapters
    │   ├── api
    │   │   ├── app.py
    │   │   └── routes.py
    │   ├── controllers
    │   │   ├── controller.py
    │   ├── database
    │   │   ├── database.py
    │   │   └── repositories.py
    ├── core
    │   ├── domain
    │   │   ├── models.py
    │   │   └── services.py
    │   └── interfaces
    │       └── repositories.py
    ├── Dockerfile
    ├── populate_database.py
    ├── requirements.txt
    └── tests
        ├── database_mock.py
        ├── test_controller.py
        └── test_services.py
```

## Frontend
O frontend da aplicação é construído com React e TypeScript. Ele inclui vários diretórios:

- `cypress`: Este módulo contém testes de ponta a ponta escritos com Cypress.
- `src`: Este módulo contém o código fonte da aplicação. Ele inclui o componente principal App (`App.tsx`), páginas (`pages`), serviços (`services`) e componentes compartilhados (`shared-components`).
- `public`: Este módulo contém arquivos estáticos como imagens e ícones.

O frontend também inclui um Dockerfile para contêinerização e `package.json` para gerenciar as dependências do JavaScript.

```
└── frontend
    ├── babel.config.js
    ├── cypress.config.ts
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── tsconfig.json
    ├── cypress
    │   ├── e2e
    │   │   ├── cadastro_aluno
    │   │   │   └── gui_cadastro_aluno.cy.ts
    │   │   ├── cadastro_evento
    │   │   │   └── cadstro_evento.cy.ts
    │   │   ├── deletar_aluno
    │   │   │   └── gui_deletar_aluno.cy.ts
    │   │   ├── editar_aluno
    │   │   │   └── gui_editar_aluno.cy.ts
    │   │   ├── login
    │   │   │   └── gui_login.cy.ts
    │   │   ├── periodo_letivo
    │   │   │   └── periodo_letivo.cy.ts
    │   │   └── ver_descricao_evento
    │   │       └── ver_descricao_evento.cy.ts
    │   ├── support
    │   │   ├── commands.ts
    │   │   └── e2e.ts
    │   └── videos
    │       ├── cadastro_aluno
    │       │   └── gui_cadastro_aluno.cy.ts.mp4
    │       ├── cadastro_evento
    │       │   └── cadstro_evento.cy.ts.mp4
    │       ├── deletar_aluno
    │       │   └── gui_deletar_aluno.cy.ts.mp4
    │       ├── editar_aluno
    │       │   └── gui_editar_aluno.cy.ts.mp4
    │       ├── login
    │       │   └── gui_login.cy.ts.mp4
    │       ├── periodo_letivo
    │       │   └── periodo_letivo.cy.ts.mp4
    │       └── ver_descricao_evento
    │           └── ver_descricao_evento.cy.ts.mp4
    ├── mock
    │   ├── database.json
    │   ├── nextEvents.json
    │   ├── oldEvents.json
    │   └── README.md
    ├── public
    │   └── ...
    └── src
        ├── App.tsx
        ├── assets
        │   └── svgs
        │       ├── CadastroAlunoIcon.tsx
        │       ├── EventosIcon.tsx
        │       ├── ListaDePresencaIcon.tsx
        │       ├── LogoIcon.tsx
        │       └── RelatorioIcon.tsx
        ├── data-front
        │   ├── data.js
        │   ├── nextEvent.js
        │   └── oldEvent.js
        ├── images
        │   └── ...
        ├── index.tsx
        ├── pages
        │   ├── attendance-report
        │   │   ├── AttendanceReport.tsx
        │   │   ├── styles.ts
        │   │   └── views
        │   │       └── AttendanceBarChart.tsx
        │   ├── events-add-photos
        │   │   ├── EventsAddPhotos.test.tsx
        │   │   ├── EventsAddPhotos.tsx
        │   │   └── styles.ts
        │   ├── events-description
        │   │   ├── EventsDescription.tsx
        │   │   └── styles.ts
        │   ├── events-next
        │   │   ├── EventsNext.test.tsx
        │   │   ├── EventsNext.tsx
        │   │   └── styles.ts
        │   ├── events-old
        │   │   ├── EventsOld.test.tsx
        │   │   ├── EventsOld.tsx
        │   │   └── styles.ts
        │   ├── events-register
        │   │   ├── EventsRegister.test.tsx
        │   │   ├── EventsRegister.tsx
        │   │   └── styles.ts
        │   ├── home
        │   │   ├── Home.test.tsx
        │   │   ├── Home.tsx
        │   │   ├── styles.ts
        │   │   └── views
        │   ├── login
        │   │   ├── Login.tsx
        │   │   ├── styles.ts
        │   │   └── views
        │   ├── no-class-days
        │   │   ├── EditNoClassDay.tsx
        │   │   ├── NoClassDays.tsx
        │   │   ├── RegisterNoClassDay.tsx
        │   │   └── styles.ts
        │   ├── no-page
        │   │   ├── NoPage.tsx
        │   │   └── styles.ts
        │   ├── periodo-letivo
        │   │   ├── EditPeriodoLetivo.tsx
        │   │   ├── PeriodoLetivo.tsx
        │   │   ├── RegisterPeriodoLetivo.tsx
        │   │   └── styles.ts
        │   ├── presential-list
        │   │   ├── AttendanceList.tsx
        │   │   └── styles.ts
        │   ├── register-student
        │   │   ├── RegisterStudent.test.tsx
        │   │   ├── RegisterStudent.tsx
        │   │   ├── styles.ts
        │   │   └── views
        │   ├── scheduled-events
        │   │   ├── ScheduledEvents.test.tsx
        │   │   ├── ScheduledEvents.tsx
        │   │   └── styles.ts
        │   └── student-list
        │       ├── EditRegisterStudent.tsx
        │       ├── ListStudent.tsx
        │       └── styles.ts
        ├── routes
        │   └── index.tsx
        ├── services
        │   ├── alunos
        │   │   └── AlunosServices.ts
        │   ├── api.ts
        │   ├── axios-config
        │   │   ├── index.ts
        │   │   └── interceptors
        │   │       ├── Errorinterceptor.ts
        │   │       ├── index.ts
        │   │       └── ResponseInterceptor.ts
        │   ├── no-class-days
        │   │   └── NoClassDaysServices.ts
        │   └── periodo-letivo
        │       └── PeriodoLetivoServices.ts
        ├── shared-components
        │   ├── contexts
        │   │   ├── DrawerContext.tsx
        │   │   └── index.ts
        │   ├── environment
        │   │   └── index.ts
        │   ├── footer
        │   │   ├── Footer.tsx
        │   │   └── styles.ts
        │   ├── header
        │   │   ├── Header.test.tsx
        │   │   ├── Header.tsx
        │   │   └── styles.ts
        │   ├── hooks
        │   │   ├── index.ts
        │   │   └── UseDebounce.ts
        │   └── login-header
        │       ├── LoginHeader.tsx
        │       └── styles.ts
        └── utils
            ├── enums.ts
            ├── helpers.ts
            └── storageKeys.ts
```
