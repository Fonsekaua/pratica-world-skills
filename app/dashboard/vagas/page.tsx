import Perfil from "@/pages/Perfil/Perfil";
import Vacancy from "@/pages/Vacancy/Vacancy";
import ProtectRouter from "@/src/components/ProtectRouter/ProtectRouter";

const Home = () => {
    return (
        <ProtectRouter>
            <div>
                <Vacancy/>
            </div>
        </ProtectRouter>
    )
}

export default Home;