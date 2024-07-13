import Container from "@/@core/components/Container";
import LoginForm from "@/@core/components/Form/Login";
import Image from "next/image";
import mapPic from "/public/images/map-3d.png"

const Login = () => {
    return (
        <Container className="h-screen flex flex-row   items-center justify-center "  >
            <div className=" bg-primary-300/40 h-fit   m-auto  py-8  rounded-lg  px-6 w-[320px]    ">
                {/* <Image alt="dsdsd" src={mapPic} className="lg:w-[50%] w-full -mt-[40%] sm:-mt-[20%] px-8 m-auto" /> */}
                <h1 className="text-3xl mx-auto  font-black text-start  text-neutral-600  mb-6">ورود ادمین</h1>
                <LoginForm />
            </div>
        </Container>

    );
}

export default Login;