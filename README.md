<h1 align="center">
    <br>
    Client Account Manager
</h1>

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
</p>

| :placard: Challenge |     |
| -------------  | --- |
| :sparkles: Nome        | **Client Account Manager**
| :label: Tecnologias Front-end | React, Vite, Typescript, Tailwind CSS
| :label: Tecnologias Back-end | Laravel , Sail, Compose, PostgreSQL
| :rocket: URL         | https://app/
| :fire: Desafio     | Cadastro de Clientes e Suporte de Canais de Atendimento

<h3>Tópicos</h3>

<a href="#Descrip">Descrição do projeto</a>

<a href="#modelo">Modelagem do Banco de dados</a>

<a href="#Tec">Tecnologias</a>

<a href="#Pre">Pre-requisitos</a>

<a href="#Dev">Desenvolvedor</a>

<h2 id= Descrip> O que é Client Account Manager?</h2>

O **Client Account Manager** é um site onde você pode se cadastrar, atualizar seus dados, ver seu perfil e excluir.

- Uma página inicial que mostrará informaçoes do site, acceso ao login e cadastro de usarios;

- Uma página de registo , mosntrando um formulario de registro com validaciones feitas no backend;

- Uma página de login , mostrando um formulario para entrar en su perfil; 

**Atenção:** O site é **responsivo** para dar aos usuarios a facilidade de usar através de dispositivos mobiles.

<h2 id= modelo> Modelagem do Banco de Dados</h2>

[clientAccountManager](https://github.com/gilbonett/clientAccountManager/assets/101142283/326c3c39-b00b-4146-881d-cd127b28d99f)

<h2 id= Tec>Tecnologias</h2>

As principais tecnologias utilizadas foram:

**Front-end**
- node v18.14.0;
- npm v9.3.1;
- React v18.2.0;
- jwt-decode 3.1.2;
- axios 1.4.0;
- React Router v6.8.1;

**Back-end**
- laravel v10.10;
- sail v1.18;
- inertiajs/inertia-laravel: v0.6.3;

<h2 id= Pre>Passo a passo para Rodar o Projeto</h2>

## Passo a passo para Instalar o projeto
**È necesario ter WSL instalado na maquina e Docker , ja que o Laravel Sail é compatível com macOS, Linux e Windows (via WSL2 ).**

Clone o projeto desde o terminal WSL
```sh
git clone https://github.com/gilbonett/clientAccountManager.git
```

```sh
cd clientAccountManager/
```

Para iniciar todos os contêineres do Docker em segundo plano, você pode iniciar o Sail no modo "separado":
```sh
./vendor/bin/sail up -d
```

Para parar todos os contêineres, basta pressionar Control + C para interromper a execução do contêiner. Ou, se os contêineres estiverem sendo executados em segundo plano, você pode usar o stop comando:
```sh
sail stop
```

## Instalação Back-End

O projeto foi criado con Laravel, Sail,  Compose, PostgreSQL. 

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta /clientAccountManager e rode o seguinte comando para instalar todas as dependências necessárias:

    ```sh
     sail composer install
    ```
    
## Instalação Front-End

O projeto foi criado com Vite, React 18, TypeScript, TailwindCSS 3, Utilizando IntertiaJs.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta /clientAccountManager e rode o seguinte comando para instalar todas as dependências necessárias:

```sh
sail npm install
```
    
Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    ```sh
    sail npm run dev
    ```
    
A aplicação irá rodar no endereço http://localhost.


È necesario gerar o KEY com esse comodando e prencher no arquivo .env
Gere a key do projeto Laravel
```sh
sail artisan key:generate
```

Acesse o projeto mediante uma IDE, eu usei Visual Studio Code

Atualize essas variáveis de ambiente no arquivo .env 
```dosini
APP_NAME=Laravel
APP_ENV=local
APP_KEY= sail artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=pgsql
DB_HOST=pgsql
DB_PORT=5432
DB_DATABASE=nome-do-banco
DB_USERNAME=username
DB_PASSWORD=password
```

A aplicação irá rodar no endereço https://localhost

<h2 id= Dev>Desenvolvedor</h2>
<table>
  <tr>
    <td>
      <table>
        <tr>
          <td align="center">
            <a href="https://github.com/gilbonett">
              <img src="https://avatars.githubusercontent.com/u/101142283?s=400&u=65a54baa757bd9fd2fc3507447850d1f071002c5&v=4" width="150px;" alt="Pedro Github Photo"/>
            </a>
            <br>
            <a href="https://www.linkedin.com/in/gilbonett/">
              <sub>
                <b>Pedro Gil Bonett</b>
              </sub>
            </a>
          </td>
        </tr>
      </table>
    </td>
    <td>
     
</table>


