"use client";

import { useEffect, useMemo, useState } from "react";
import { ChartNoAxesColumn, FolderPlus, LinkIcon, PackagePlus, UsersRound } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";

type DashboardData = {
  counts: {
    productCount: number;
    categoryCount: number;
    profileCount: number;
    clickCount: number;
  };
  topProducts: Array<{ id: string; name: string; slug: string; clicks: number; price: number }>;
  products: Array<{ id: string; name: string; slug: string }>;
  categories: Array<{ id: string; name: string; slug: string }>;
  recentClicks: Array<{ id: string; product_id: string | null; source: string | null; created_at: string }>;
  recentProfiles: Array<{ id: string; full_name: string; email: string; created_at: string }>;
};

const adminPasswordStorageKey = "techparks-admin-password";

async function adminFetch<T>(path: string, password: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-password": password,
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error ?? "Operação administrativa falhou.");
  return payload as T;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminPanel() {
  const [password, setPassword] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.sessionStorage.getItem(adminPasswordStorageKey) ?? "";
  });
  const [draftPassword, setDraftPassword] = useState("");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isUnlocked = password.length > 0;

  async function loadDashboard(nextPassword = password) {
    if (!nextPassword) return;
    const data = await adminFetch<DashboardData>("/api/admin/dashboard", nextPassword);
    setDashboard(data);
  }

  useEffect(() => {
    const stored = window.sessionStorage.getItem(adminPasswordStorageKey);
    if (!stored) return;
    adminFetch<DashboardData>("/api/admin/dashboard", stored).then(setDashboard).catch(() => {
      window.sessionStorage.removeItem(adminPasswordStorageKey);
      setPassword("");
    });
  }, []);

  async function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    try {
      await loadDashboard(draftPassword);
      setPassword(draftPassword);
      window.sessionStorage.setItem(adminPasswordStorageKey, draftPassword);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Senha inválida.");
    }
  }

  async function submitJsonForm(event: React.FormEvent<HTMLFormElement>, path: string, successMessage: string) {
    event.preventDefault();
    setError("");
    setMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    if (path.includes("products")) {
      try {
        payload.specs = JSON.parse(String(payload.specs || "{}"));
      } catch {
        setError("Especificações precisa ser um JSON válido.");
        return;
      }
    }

    if (path.includes("offers")) {
      payload.startsAt = payload.startsAt ? new Date(String(payload.startsAt)).toISOString() : "";
      payload.endsAt = payload.endsAt ? new Date(String(payload.endsAt)).toISOString() : "";
    }

    try {
      await adminFetch(path, password, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessage(successMessage);
      form.reset();
      await loadDashboard();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Não foi possível salvar.");
    }
  }

  const productOptions = useMemo(() => dashboard?.products ?? [], [dashboard]);
  const categoryOptions = useMemo(() => dashboard?.categories ?? [], [dashboard]);

  if (!isUnlocked) {
    return (
      <Card className="mx-auto w-full max-w-md rounded-xl border-white/10 bg-white/[0.04] p-5">
        <form className="flex flex-col gap-4" onSubmit={unlock}>
          <h1 className="text-2xl font-black text-white">Admin TechParks</h1>
          <Input
            type="password"
            value={draftPassword}
            onChange={(event) => setDraftPassword(event.target.value)}
            className="h-12 rounded-lg border-white/10 bg-white/10 text-white placeholder:text-slate-400"
            placeholder="Senha administrativa"
            autoFocus
          />
          {error ? <p className="rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">{error}</p> : null}
          <Button className="h-12 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Acessar</Button>
        </form>
      </Card>
    );
  }

  return (
    <div className="admin-panel mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white md:text-4xl">Admin TechParks</h1>
          <p className="mt-1 text-slate-300">Cadastro de produtos, categorias, links afiliados e visão operacional.</p>
        </div>
        <Button
          variant="outline"
          className="h-10 border-white/10 bg-white/5 text-white"
          onClick={() => {
            window.sessionStorage.removeItem(adminPasswordStorageKey);
            setPassword("");
          }}
        >
          Bloquear painel
        </Button>
      </div>

      {message ? <p className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-sm font-bold text-emerald-100">{message}</p> : null}
      {error ? <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-sm font-bold text-red-100">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={<PackagePlus className="size-5" />} label="Produtos" value={dashboard?.counts.productCount ?? 0} />
        <MetricCard icon={<FolderPlus className="size-5" />} label="Categorias" value={dashboard?.counts.categoryCount ?? 0} />
        <MetricCard icon={<UsersRound className="size-5" />} label="Cadastros" value={dashboard?.counts.profileCount ?? 0} />
        <MetricCard icon={<ChartNoAxesColumn className="size-5" />} label="Cliques registrados" value={dashboard?.counts.clickCount ?? 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminFormCard title="Criar categoria" icon={<FolderPlus className="size-5" />}>
          <InfoBox
            items={[
              "Tabela categories: name, slug, description, icon_name, accent_from, accent_to, sort_order, is_active.",
              "Automáticos no banco: id, created_at e updated_at.",
              "Slug é usado na URL, exemplo headset.",
              "Ícone aceito pelo site: headphones, monitor, laptop, tag, gamepad, keyboard, smartphone.",
            ]}
          />
          <form className="grid gap-3" onSubmit={(event) => submitJsonForm(event, "/api/admin/categories", "Categoria criada com sucesso.")}>
            <Input name="name" placeholder="Nome: Headset" required onBlur={(event) => {
              const form = event.currentTarget.form;
              const slug = form?.elements.namedItem("slug") as HTMLInputElement | null;
              if (slug && !slug.value) slug.value = slugify(event.currentTarget.value);
            }} />
            <Input name="slug" placeholder="Slug: headset" required />
            <Input name="description" placeholder="Descrição" required />
            <Input name="iconName" placeholder="Ícone: headphones, monitor, laptop..." defaultValue="tag" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="accentFrom" placeholder="from-blue-400" defaultValue="from-cyan-400" />
              <Input name="accentTo" placeholder="to-purple-600" defaultValue="to-blue-600" />
            </div>
            <Input name="sortOrder" type="number" placeholder="Ordem" defaultValue="0" />
            <label className="flex items-center gap-2 text-sm font-bold text-white"><input name="isActive" type="checkbox" value="true" defaultChecked /> Categoria ativa no site</label>
            <Button className="h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Salvar categoria</Button>
          </form>
        </AdminFormCard>

        <AdminFormCard title="Criar produto" icon={<PackagePlus className="size-5" />}>
          <InfoBox
            items={[
              "Tabela products: name, slug, short_description, full_description, category_id, department_slug, main_image_url, old_price, price, installment, discount_percentage, rating, reviews_count, clicks_count, tags, specs, pros, cons, featured, is_active.",
              "Automáticos no banco: id, created_at e updated_at.",
              "Category ID: copie o ID da lista de categorias abaixo.",
              "Department slug: use o slug da categoria, exemplo headset.",
              "Specs: precisa ser JSON valido, exemplo {\"Conexao\":\"Bluetooth\",\"Bateria\":\"40 horas\"}.",
              "Pros/Cons: informe um item por linha.",
              "O link afiliado é cadastrado no card Link afiliado, depois que o produto existir.",
            ]}
          />
          <ReferenceBox title="Categorias cadastradas" items={categoryOptions.map((category) => `${category.name} | slug: ${category.slug} | id: ${category.id}`)} />
          <form className="grid gap-3" onSubmit={(event) => submitJsonForm(event, "/api/admin/products", "Produto criado com sucesso.")}>
            <Input name="name" placeholder="Nome do produto" required onBlur={(event) => {
              const form = event.currentTarget.form;
              const slug = form?.elements.namedItem("slug") as HTMLInputElement | null;
              if (slug && !slug.value) slug.value = slugify(event.currentTarget.value);
            }} />
            <Input name="slug" placeholder="slug-do-produto" required />
            <Input name="categoryId" placeholder="ID da categoria" list="admin-categories" required />
            <datalist id="admin-categories">
              {categoryOptions.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </datalist>
            <Input name="departmentSlug" placeholder="Slug da categoria: headset" required />
            <Input name="shortDescription" placeholder="Descrição curta" required />
            <textarea name="fullDescription" placeholder="Descrição completa" required className="min-h-24 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400" />
            <Input name="mainImageUrl" placeholder="URL da imagem principal" required />
            <div className="grid grid-cols-2 gap-3">
              <Input name="oldPrice" type="number" step="0.01" placeholder="Preço antigo" required />
              <Input name="price" type="number" step="0.01" placeholder="Preço atual" required />
            </div>
            <Input name="installment" placeholder="10x de R$ 99,99" />
            <div className="grid grid-cols-3 gap-3">
              <Input name="discountPercentage" type="number" placeholder="% off" defaultValue="0" />
              <Input name="rating" type="number" step="0.1" placeholder="Nota" defaultValue="0" />
              <Input name="reviewsCount" type="number" placeholder="Reviews" defaultValue="0" />
            </div>
            <Input name="clicksCount" type="number" placeholder="Cliques iniciais" defaultValue="0" />
            <Input name="tags" placeholder="tags separadas por virgula" />
            <textarea name="specs" defaultValue={'{"Tela":"27 polegadas"}'} className="min-h-20 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400" />
            <textarea name="pros" placeholder="Um ponto positivo por linha" className="min-h-20 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400" />
            <textarea name="cons" placeholder="Um ponto de atenção por linha" className="min-h-20 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-400" />
            <label className="flex items-center gap-2 text-sm font-bold text-white"><input name="featured" type="checkbox" value="true" /> Destaque</label>
            <label className="flex items-center gap-2 text-sm font-bold text-white"><input name="isActive" type="checkbox" value="true" defaultChecked /> Produto ativo no site</label>
            <Button className="h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Salvar produto</Button>
          </form>
        </AdminFormCard>

        <AdminFormCard title="Link afiliado" icon={<LinkIcon className="size-5" />}>
          <InfoBox
            items={[
              "Tabela affiliate_offers: product_id, marketplace_name, affiliate_url, price, old_price, installment, discount_percentage, is_primary, is_active, starts_at, ends_at.",
              "Automáticos no banco: id, created_at e updated_at.",
              "Product ID: copie o ID do produto na lista abaixo ou selecione pelo datalist.",
              "Affiliate URL: cole aqui o link completo gerado na plataforma de afiliados.",
              "Oferta principal: deixe marcado quando este for o link/preço principal do produto.",
              "Preço e desconto aqui sobrescrevem os valores exibidos do produto enquanto a oferta estiver ativa e dentro do período.",
            ]}
          />
          <ReferenceBox title="Produtos cadastrados" items={productOptions.map((product) => `${product.name} | slug: ${product.slug} | id: ${product.id}`)} />
          <form className="grid gap-3" onSubmit={(event) => submitJsonForm(event, "/api/admin/offers", "Link afiliado cadastrado com sucesso.")}>
            <Input name="productId" placeholder="ID do produto" list="admin-products" required />
            <datalist id="admin-products">
              {productOptions.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
            </datalist>
            <Input name="marketplaceName" placeholder="Marketplace: Amazon" required />
            <Input name="affiliateUrl" placeholder="Link de afiliado completo" required />
            <div className="grid grid-cols-2 gap-3">
              <Input name="oldPrice" type="number" step="0.01" placeholder="Preço antigo" />
              <Input name="price" type="number" step="0.01" placeholder="Preço atual" />
            </div>
            <Input name="installment" placeholder="10x de R$ 99,99" />
            <Input name="discountPercentage" type="number" placeholder="% off" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="startsAt" type="datetime-local" placeholder="Início da oferta" />
              <Input name="endsAt" type="datetime-local" placeholder="Fim da oferta" />
            </div>
            <label className="flex items-center gap-2 text-sm font-bold text-white"><input name="isPrimary" type="checkbox" value="true" defaultChecked /> Oferta principal</label>
            <label className="flex items-center gap-2 text-sm font-bold text-white"><input name="isActive" type="checkbox" value="true" defaultChecked /> Oferta ativa no site</label>
            <Button className="h-11 bg-cyan-400 font-black text-slate-950 hover:bg-cyan-300">Salvar link afiliado</Button>
          </form>
        </AdminFormCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminList title="Produtos mais clicados" items={(dashboard?.topProducts ?? []).map((product) => `${product.name} - ${product.clicks ?? 0} cliques`)} />
        <AdminList title="Últimos cliques" items={(dashboard?.recentClicks ?? []).map((click) => `${new Date(click.created_at).toLocaleString("pt-BR")} - ${click.product_id ?? "produto não informado"}`)} />
        <AdminList title="Últimos cadastros" items={(dashboard?.recentProfiles ?? []).map((profile) => `${profile.full_name || profile.email} - ${new Date(profile.created_at).toLocaleDateString("pt-BR")}`)} />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card className="rounded-xl border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3 text-cyan-200">{icon}<span className="text-sm font-bold">{label}</span></div>
      <strong className="mt-3 block text-3xl font-black text-white">{value.toLocaleString("pt-BR")}</strong>
    </Card>
  );
}

function AdminFormCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="rounded-xl border-white/10 bg-white/[0.04] p-4">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-black text-white">{icon}{title}</h2>
      {children}
    </Card>
  );
}

function InfoBox({ items }: { items: string[] }) {
  return (
    <div className="mb-4 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3">
      <strong className="text-xs font-black uppercase tracking-wide text-cyan-100">Informações necessárias</strong>
      <ul className="mt-2 grid gap-1.5 text-xs leading-5 text-sky-100/80">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </div>
  );
}

function ReferenceBox({ title, items }: { title: string; items: string[] }) {
  return (
    <details className="mb-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <summary className="cursor-pointer text-xs font-black uppercase tracking-wide text-white">{title}</summary>
      <div className="mt-3 grid max-h-40 gap-2 overflow-y-auto">
        {items.length > 0 ? items.map((item) => (
          <code key={item} className="rounded-lg bg-slate-800 p-2 text-[11px] leading-4 text-slate-100">{item}</code>
        )) : <span className="text-xs text-slate-400">Nenhum item cadastrado ainda.</span>}
      </div>
    </details>
  );
}

function AdminList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="rounded-xl border-white/10 bg-white/[0.04] p-4">
      <h2 className="text-lg font-black text-white">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.length > 0 ? items.map((item) => (
          <span key={item} className="rounded-lg bg-white/5 p-3 text-sm text-slate-300">{item}</span>
        )) : <span className="text-sm text-slate-400">Sem dados ainda.</span>}
      </div>
    </Card>
  );
}
