# Iago Pinheiro Estudio

Site de fotografia com paginas HTML, CSS, JavaScript e suporte em PHP para formulario de contato e comentarios do blog.

## Estrutura

- `HTML/index.html`: pagina inicial
- `HTML/sobre.html`, `HTML/ensaios.html`, `HTML/dicas.html`, `HTML/blog.html`, `HTML/depoimentos.html`, `HTML/contato.html`, `HTML/formatura.html`: paginas internas
- `HTML/css/style.css`: estilos do projeto
- `HTML/js/main.js`: scripts principais
- `HTML/vendor/`: bibliotecas de terceiros
- `HTML/mail.php`: envio do formulario de contato
- `HTML/blog-comments.php`: backend dos comentarios do blog

## Como executar localmente

Para visualizar apenas o front-end, voce pode abrir `HTML/index.html` no navegador.

Se quiser testar os arquivos PHP, use um servidor local com PHP:

```bash
php -S localhost:8000 -t HTML
```

Depois acesse:

```text
http://localhost:8000
```

## Publicacao no GitHub

O front-end pode ser enviado normalmente para um repositorio no GitHub.

Importante: `mail.php` e `blog-comments.php` nao funcionam no GitHub Pages, porque o GitHub Pages hospeda apenas arquivos estaticos.

Se voce pretende publicar no GitHub Pages, tem duas opcoes:

- publicar apenas a parte estatica do site
- mover o backend para outro servico com suporte a PHP ou para uma API separada

## Configuracao do formulario

O arquivo `HTML/mail.php` aceita estas variaveis de ambiente:

- `SITE_CONTACT_EMAIL`
- `SITE_FROM_EMAIL`
- `SITE_FROM_NAME`

Se elas nao forem definidas, o projeto usa os valores padrao configurados no proprio arquivo.

## Observacoes

- Os arquivos `vendor` foram formatados para leitura, mas continuam sendo bibliotecas externas.
- Os arquivos com nome `*.min.js` nao estao mais minificados visualmente.

