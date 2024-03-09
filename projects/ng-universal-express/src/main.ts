import {app} from './index';

const port = process.env.PORT || 4000;
app().listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
