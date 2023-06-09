import useAuth from "@/hooks/useAuth"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
interface Props {}
interface Inputs {
  email: string
  password: string
}
const Login = (props: Props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [showHidePassword, setShowHidePassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const { signIn, signUp } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (isLogin) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }
  return (
    <div className="relative flex h-screen w-screen flex-col items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522811/Netflix/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large_vsfgtw.jpg"
        alt="bgi"
        fill
        style={{ objectFit: "cover" }}
        className="-z-10  opacity-60 "
      />
      <Link href={"/"}>
        <Image
          src="https://res.cloudinary.com/dwgwlmu6i/image/upload/v1685522790/Netflix/Netflix_2015_logo_regcgg.svg"
          alt="Logo"
          width={150}
          height={150}
          className="cursor-pointer object-contain absolute left-4 top-4 md:left-10 md:top-6"
        />
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="inline-block w-full">
            <div className="flex items-center relative">
              <input
                type={showHidePassword ? "text" : "password"}
                placeholder="Password"
                className="input"
                {...register("password", { required: true })}
              />
              {showHidePassword ? (
                <AiOutlineEye
                  onClick={() => setShowHidePassword(!showHidePassword)}
                  className="absolute right-3 cursor-pointer"
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowHidePassword(!showHidePassword)}
                  className="absolute right-3 cursor-pointer"
                />
              )}
            </div>
            {errors.password && (
              <p className="p-1 text-[13px] font-light  text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        {!isRegister ? (
          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
        ) : (
          <button
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        )}

        {isRegister ? (
          <div className="text-[gray]">
            Have an account?{" "}
            <button
              className="text-white hover:underline"
              onClick={(e) => {
                setIsRegister(false)
                e.preventDefault()
              }}
            >
              Sign in now
            </button>
          </div>
        ) : (
          <div className="text-[gray]">
            New to Netflix?{" "}
            <button
              className="text-white hover:underline"
              onClick={(e) => {
                setIsRegister(true)
                e.preventDefault()
              }}
            >
              Sign up now
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
