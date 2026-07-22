export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset: -16 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
