from pathlib import Path
import sys

from pypdf import PdfReader


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python example-pdf-reader.py <path-to-pdf>")

    pdf_path = Path(sys.argv[1]).expanduser().resolve()
    reader = PdfReader(str(pdf_path))
    text = "\n".join(page.extract_text() or "" for page in reader.pages)
    print(text)


if __name__ == "__main__":
    main()
