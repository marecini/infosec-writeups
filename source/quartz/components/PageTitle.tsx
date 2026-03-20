import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>~ / writeups</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  color: var(--purple);
  letter-spacing: 0.05em;
}

.page-title a {
  color: var(--purple) !important;
}

.page-title a:hover {
  text-shadow: 0 0 8px var(--purple);
  opacity: 0.85;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
