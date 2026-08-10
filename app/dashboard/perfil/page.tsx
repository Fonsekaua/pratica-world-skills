import Perfil from "@/pages/Perfil/Perfil";
import ProtectRouter from "@/src/components/ProtectRouter/ProtectRouter";

const Home = () => {
    return (
        <ProtectRouter>
            <div>
                <Perfil/>
            </div>
        </ProtectRouter>
    )
}

export default Home;