const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
