### Styling structure
<pre>
styles/
├── design-tokens.css
├── theme.css
├── base.css
├── layout.css
└── components/
    ├── buttons.css
    ├── cards.css
    └── forms.css
</pre>

1. ### design-tokens
Contains raw, brand-agnostic primitives (colors, spacing, font sizes, radii, durations).

2. ### theme
- Here design tokens are mapped to meaning
- Handles light-dark-mode
- All other styling files use its tokens before they should use design-tokens
  (except simple value design-tokens like --semko-space-012 and --semko-radius-round)

3. ### base
- Global reset for HTML elements
- Uses tokens from theme and design-tokens
- Typography

4. ### layout
- Here the page layout is set
- Some helper / modification for page-layout related styling

5. ### components/
- Must not use design-tokens directly, instead tokens from either: theme or layout
- May make its own tokens
- Design tokens > theme > base/layout > components


Components should prefer design-tokens for:
- spacing
- radius
- font sizes
- 


Components should use theme tokens only for:
- colors (text, status, surface, actions, shadows)
- focus / accessibility semantics
- borders
- motion durations
- font weight