# Cadastro de produtos no Supabase

1. Execute `supabase/schema.sql` no SQL Editor do Supabase.
2. Configure no projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
ADMIN_PASSWORD=Parks@2026
```

`SUPABASE_SERVICE_ROLE_KEY` fica em `Project Settings > API > service_role`. Ela deve existir apenas no servidor/`.env.local`; nunca exponha essa chave em código público.

## Painel administrativo

O painel fica em:

```txt
/admin
```

Ele nao aparece em nenhum botao ou menu publico. A senha padrao configurada no codigo e:

```txt
Parks@2026
```

Para trocar a senha, altere:

```env
ADMIN_PASSWORD=NovaSenhaAqui
```

O painel permite:

```txt
criar categorias
criar produtos
cadastrar links afiliados
ver total de produtos, categorias, cadastros e cliques
ver produtos mais clicados
ver ultimos cliques
ver ultimos cadastros
```

## Onde cadastrar o link afiliado

O link afiliado fica na tabela `affiliate_offers`, no campo `affiliate_url`.

Cada produto pode ter mais de uma oferta/link. Marque a oferta principal com:

```txt
is_primary = true
is_active = true
```

O site usa automaticamente a oferta ativa principal. Se houver mais de uma ativa, ele pega a marcada como principal; se nenhuma estiver marcada, pega a mais recente.

## Fluxo para cadastrar um produto

1. Cadastre a categoria em `categories`.
2. Cadastre o produto em `products`, apontando `category_id` para a categoria.
3. Cadastre imagens extras em `product_images`.
4. Cadastre videos em `product_videos`, se houver.
5. Cadastre o link afiliado em `affiliate_offers`.
6. Cadastre avaliacoes em `product_reviews`, se houver.

## Login, perfil e Minha Caixa

O login/cadastro usa Supabase Auth. Quando um usuario se cadastra, o trigger `handle_new_user_profile` cria automaticamente um registro em `profiles`.

Tabelas usadas:

```txt
profiles
user_saved_products
```

`profiles` guarda:

```txt
user_id
full_name
email
phone
accepted_terms
accepted_terms_at
accepted_terms_version
```

`user_saved_products` guarda os produtos salvos na Minha Caixa:

```txt
user_id
product_id
created_at
```

As policies RLS garantem que cada usuario veja apenas o proprio perfil e a propria Minha Caixa.

Campos principais de `products`:

```txt
name
slug
short_description
full_description
category_id
department_slug
main_image_url
old_price
price
installment
discount_percentage
rating
reviews_count
clicks_count
tags
specs
pros
cons
featured
is_active
```

Campos principais de `affiliate_offers`:

```txt
product_id
marketplace_name
affiliate_url
price
old_price
installment
discount_percentage
is_primary
is_active
starts_at
ends_at
```
