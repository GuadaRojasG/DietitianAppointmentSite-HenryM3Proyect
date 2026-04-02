import { AppDataSource } from "./config/data-source"
import server from "./server";
import PORT from "./config/envs"
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch( (err: unknown) => console.log(err))