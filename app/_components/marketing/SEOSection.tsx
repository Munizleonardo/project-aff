export function SEOSection() {
  return (
    <section className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-3">
      {[
        ["Reviews objetivos", "Conteúdos preparados para buscas como vale a pena, comparar preço e melhor custo-benefício."],
        ["Comparativos claros", "Estrutura pronta para cruzar preço, avaliação, acessos e custo-benefício."],
        ["Transparência comercial", "Links visuais passam por rota interna para futuro rastreamento de cliques."],
      ].map(([title, text]) => (
        <div key={title} className="flex flex-col gap-2">
          <h2 className="text-lg font-black text-white">{title}</h2>
          <p className="text-sm leading-6 text-slate-300">{text}</p>
        </div>
      ))}
    </section>
  );
}
