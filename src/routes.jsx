import { Home } from "./components/Home"
import { Habilidades } from "./components/Habilidades"
import { SobreMi } from "./components/SobreMi"
import { Educacion } from "./components/Educacion"


export const routes = [
    {path: '/', element: <Home/>},
    {path: "/habilidades", element: <Habilidades />},
    {path: "/sobre-mi", element: <SobreMi />},
    {path: "/educacion", element: <Educacion />},
]