# broJS Hugo theme

> [!NOTE]
> A minimal, no-JavaScript theme for the [Hugo][hugo] static site generator. \
> Check out the demo at <https://nextredo.github.io/brojs>

![broJS theme screenshot][brojs-sc]

## Credit
This repo is based off the "noJS" theme by Andy Sukowski-Bang. \
Find that theme here: <https://gitlab.com/andy.sb/nojs> \
Find a demo of that theme here: <https://nojs.andy.sb>

## Feature Summary
* no JavaScript
* dark mode via [`prefers-color-scheme`][prefers-color-scheme]
* [syntax highlighting](#syntax-highlighting)
* [LaTeX via `transform.ToMath`](#latex-via-transformtomath)

## Installation
For more information read the official [quick start guide][hugo-quickstart] of Hugo.

In your `themes/` directory, run:
```sh
git clone https://github.com/nextredo/brojs.git
```

Set the theme in `hugo.toml` at the base of the Hugo site:
```toml
theme = "brojs"
```

Add menu entries:
```toml
[menus]
  [[menus.main]]
    name = 'Home'
    pageRef = '/'
    weight = 1

  [[menus.main]]
    name = 'Posts'
    pageRef = '/posts'
    weight = 2

  [[menus.main]]
    name = 'Tags'
    pageRef = '/tags'
    weight = 3
```

## Development
```bash
# Flags are optional, but useful
hugo server --buildDrafts --cleanDestinationDir \
    --disableFastRender --noHTTPCache --logLevel info
```

### Tag Issues
Running with `--disableFastRender` is recommended, as it avoids
random site glitches, such as the following:
1. Begin the dev server with `hugo server`
1. Change the value of a tag in a post's front matter
1. The "Tags" menu item is now broken (after a partial rebuild)

## Features
### Image captions
You can add captions to images (technically using `<figcaption>` HTML tags) by adding titles, like so:
```md
![Alt text here](/path/to/image.png "Put your caption here!")
```

### Syntax highlighting
Disable [`noClasses`][hugo-syntax-highlighting] to use [this modified algol_nu theme][syntax.css].
```toml
[markup]
  [markup.highlight]
    noClasses = false
```

### LaTeX via [transform.ToMath][hugo-tomath]
Instead of client-side JavaScript rendering of mathematical markup using [MathJax][mathjax] or [KaTeX][katex],
use [this passthrough render hook][render-ps.html] which calls the [transform.ToMath][hugo-tomath] function.
```toml
[markup]
  [markup.goldmark]
    [markup.goldmark.extensions]
      [markup.goldmark.extensions.passthrough]
        enable = true
        [markup.goldmark.extensions.passthrough.delimiters]
          block = [['\[', '\]'], ['$$', '$$']]
          inline = [['\(', '\)']]
```

Now add some mathematical markup to your content.

```md
Calculate the cohomology \(H^n(C;G)\) using the _universal coefficient theorem_:

\[H^n(C;G) \cong \operatorname{Ext}(H_{n-1}(C),G) \oplus \operatorname{Hom}(H_n(C),G)\]
```

Note that the [external `katex.css`][katex] is loaded in the [`head.html` partial][render-ps.html].

## License
This theme is released under [the MIT License][mit-license].
[View the license file here][./LICENSE].

<!----------------------------------------------------------------------------->
<!-- # Links -->
<!-- ## Internal -->
[hugo]: https://gohugo.io/
[brojs]: https://nextredo.github.io/brojs/
[brojs-sc]: https://github.com/nextredo/brojs/raw/gh-pages/images/screenshot.png
[syntax.css]: ./assets/css/syntax.css
[head.html]: ./layouts/_partials/head.html
[rpt.html]: ./layouts/_markup/render-passthrough.html

<!-- ## Other -->
[hugo-quickstart]: https://gohugo.io/getting-started/quick-start/
[hugo-syntax-hl]: https://gohugo.io/content-management/syntax-highlighting/#noclasses
[hugo-tomath]: https://gohugo.io/functions/transform/tomath/
[prefers-color-scheme]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
[mathjax]: https://www.mathjax.org/
[katex]: https://katex.org/
[katex-cdn]: https://cdn.jsdelivr.net/npm/katex/dist/katex.css
[mit-license]: https://opensource.org/license/mit
