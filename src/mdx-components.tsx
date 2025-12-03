import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="max-w-max text-2xl font-bold mb-4 mt-8 after:block after:w-2/3 after:h-1 after:rounded-full after:bg-foreground first:mt-0"
    />
  ),
  h3: (props) => <h2 {...props} className="text-xl font-bold mb-2 mt-4" />,
  p: (props) => (
    <p
      {...props}
      className="prose max-w-full text-pretty font-sans text-sm/relaxed text-muted-foreground dark:prose-invert"
    />
  ),
  ul: (props) => (
    <ul
      {...props}
      className="list-disc list-outside pl-4 my-2 marker:text-foreground prose text-pretty font-sans text-sm/relaxed text-foreground dark:prose-invert"
    />
  ),
  blockquote: (props) => (
    <div className="px-4 py-2 bg-muted rounded-md border border-border max-w-max my-2">
      <blockquote
        {...props}
        className="italic font-sans text-lg [&>p]:text-foreground"
      />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
