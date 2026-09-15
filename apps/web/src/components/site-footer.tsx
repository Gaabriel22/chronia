export function SiteFooter() {
  return (
    <footer className="border-starlight/10 px-page border-t py-10">
      <div className="text-mist flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-starlight font-semibold">Chronia</span> — história em perspectiva.
        </p>
        <a className="hover:text-starlight underline-offset-4 hover:underline" href="#topo">
          Voltar ao início <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  )
}
