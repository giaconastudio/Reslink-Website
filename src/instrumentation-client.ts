import { initBotId } from 'botid/client/core';

/* BotID attaches its challenge to the POST a server action makes, and a server
   action POSTs to whichever page it was called from. The footer newsletter box
   is on nearly every page, 404 included, so this is every path rather than a
   list that would quietly stop covering each new page. A path missing from
   here makes `checkBotId()` treat a real visitor as a bot. */
initBotId({
  protect: [{ path: '/*', method: 'POST' }],
});
