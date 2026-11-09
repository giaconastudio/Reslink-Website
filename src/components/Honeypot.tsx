/* A field people can't see and bots fill in. Moved off-screen rather than
   `display: none`, which form-filling bots know to skip. It's absolutely
   positioned so it takes no part in the flex layouts and gaps of the forms it
   sits in, and it's out of the tab order and hidden from screen readers so
   nobody reaches it by accident. */

const FIELD_NAME = 'website_url';

export default function Honeypot() {
  return (
    <div aria-hidden style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
      <input type="text" name={FIELD_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/** Read during the submit handler, before anything is awaited: React clears
 *  `currentTarget` once the handler yields. */
export function honeypotValue(e: React.FormEvent): string {
  return String(new FormData(e.currentTarget as HTMLFormElement).get(FIELD_NAME) ?? '');
}
