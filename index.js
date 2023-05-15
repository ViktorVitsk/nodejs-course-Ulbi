const PORT = process.env.PORT || 5000;
const Application = require('./framework/Application');
const userRouter = require('../framework/src/user-router');
const app = new Application();


app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
