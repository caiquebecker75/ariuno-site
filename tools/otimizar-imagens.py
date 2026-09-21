#!/usr/bin/env python3
"""
Gera as imagens que o site publica a partir dos prints capturados.

  assets/prints/<id>.png   (origem, 3200x2000, nao vai para o ar)
      -> public/produto/<id>.webp     1400px de largura, para desktop
      -> public/produto/<id>-sm.webp   760px de largura, para celular

Uso: python3 tools/otimizar-imagens.py
"""
from PIL import Image
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "assets" / "prints"
DESTINO = RAIZ / "public" / "produto"

# so estes vao para o ar; os demais ficam de reserva em assets/prints
PUBLICAR = [
    "kanban", "gantt", "lista", "calendario", "visao-geral", "produtividade",
    "relatorio-cliente", "solicitacoes", "formularios", "financeiro", "ia",
    "arena", "projetos", "clientes", "equipe", "mural", "social",
]

def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    total = 0
    for nome in PUBLICAR:
        origem = ORIGEM / f"{nome}.png"
        if not origem.exists():
            print("faltando:", origem.name)
            continue
        base = Image.open(origem).convert("RGB")
        for sufixo, largura, qualidade in (("", 1400, 82), ("-sm", 760, 78)):
            img = base.copy()
            img.thumbnail((largura, largura * 2), Image.LANCZOS)
            saida = DESTINO / f"{nome}{sufixo}.webp"
            img.save(saida, "WEBP", quality=qualidade, method=6)
            total += saida.stat().st_size
            print(f"{saida.name:28} {img.width}x{img.height}  {saida.stat().st_size // 1024} KB")
    print(f"\ntotal publicado: {total // 1024} KB")

if __name__ == "__main__":
    main()
