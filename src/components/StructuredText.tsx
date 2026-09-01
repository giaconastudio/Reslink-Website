import React from 'react';
import type { DastNode, ContentBlock } from '@/app/blog/queries';

/** Slugify a heading into a stable anchor id for the table of contents. */
export const toId = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Flatten a node's descendant text — used for heading anchors and the TOC. */
export function nodeText(node: DastNode): string {
  if (typeof node.value === 'string') return node.value;
  return (node.children ?? []).map(nodeText).join('');
}

/** Top-level headings, in document order, for the table of contents.
 *  CMS authors use both h1 and h2 as top-level sections, so treat them alike. */
export function collectHeadings(doc: DastNode | null): { id: string; text: string }[] {
  if (!doc) return [];
  const out: { id: string; text: string }[] = [];
  const walk = (n: DastNode) => {
    if (n.type === 'heading' && (n.level === 1 || n.level === 2)) {
      const text = nodeText(n).trim();
      if (text) out.push({ id: toId(text), text });
    }
    (n.children ?? []).forEach(walk);
  };
  walk(doc);
  return out;
}

/* The article already renders the post title as the page's only <h1>, so a
 * level-1 heading inside the body is demoted to <h2> — keeps the document
 * outline valid without changing how it looks. */
const HEADING_TAG: Record<number, 'h2' | 'h3' | 'h4'> = { 1: 'h2', 2: 'h2', 3: 'h3', 4: 'h4' };

function renderSpan(node: DastNode, key: React.Key): React.ReactNode {
  let el: React.ReactNode = node.value ?? '';
  for (const mark of node.marks ?? []) {
    if (mark === 'strong') el = <strong>{el}</strong>;
    else if (mark === 'emphasis') el = <em>{el}</em>;
    else if (mark === 'underline') el = <u>{el}</u>;
    else if (mark === 'code') el = <code>{el}</code>;
  }
  return <React.Fragment key={key}>{el}</React.Fragment>;
}

function renderBlock(block: ContentBlock | undefined, key: React.Key): React.ReactNode {
  if (!block) return null;

  if (block.__typename === 'VideoBlockRecord') {
    const url = block.videoInContent?.url;
    if (!url) return null;
    return (
      <video key={key} className="article-video" src={url} controls playsInline preload="metadata" />
    );
  }

  const img = block.image;
  if (!img?.url) return null;
  /* eslint-disable-next-line @next/next/no-img-element */
  const picture = <img className="article-img" src={img.url} alt={img.alt ?? ''} loading="lazy" />;

  if (block.__typename === 'LinkImageBlockRecord' && block.href) {
    return (
      <a key={key} href={block.href} target="_blank" rel="noopener noreferrer" className="article-img-link">
        {picture}
      </a>
    );
  }
  return <React.Fragment key={key}>{picture}</React.Fragment>;
}

function renderNode(node: DastNode, key: React.Key, blocks: Map<string, ContentBlock>): React.ReactNode {
  const kids = (node.children ?? []).map((c, i) => renderNode(c, i, blocks));

  switch (node.type) {
    case 'root':
      return <React.Fragment key={key}>{kids}</React.Fragment>;

    case 'paragraph':
      return <p key={key}>{kids}</p>;

    case 'span':
      return renderSpan(node, key);

    case 'heading': {
      const Tag = HEADING_TAG[node.level ?? 2] ?? 'h2';
      const text = nodeText(node).trim();
      // Only top-level headings are TOC targets, so only they need anchors.
      const id = Tag === 'h2' && text ? toId(text) : undefined;
      return <Tag key={key} id={id}>{kids}</Tag>;
    }

    case 'link':
      return (
        <a key={key} href={node.url} target="_blank" rel="noopener noreferrer">
          {kids}
        </a>
      );

    case 'list':
      return node.style === 'numbered' ? <ol key={key}>{kids}</ol> : <ul key={key}>{kids}</ul>;

    case 'listItem':
      return <li key={key}>{kids}</li>;

    case 'thematicBreak':
      return <hr key={key} />;

    case 'blockquote':
      return <blockquote key={key}>{kids}</blockquote>;

    case 'code':
      return <pre key={key}><code>{node.value}</code></pre>;

    case 'block':
      return renderBlock(node.item ? blocks.get(node.item) : undefined, key);

    default:
      // Unknown node types still render their children rather than vanishing.
      return <React.Fragment key={key}>{kids}</React.Fragment>;
  }
}

export default function StructuredText({
  document,
  blocks = [],
}: {
  document: DastNode | null;
  blocks?: ContentBlock[];
}) {
  if (!document) return null;
  const byId = new Map(blocks.map(b => [b.id, b] as const));
  return <>{renderNode(document, 'root', byId)}</>;
}
