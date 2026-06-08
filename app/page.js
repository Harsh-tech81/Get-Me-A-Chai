import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="flex min-h-[44vh] flex-col items-center justify-center gap-4 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-center font-bold text-4xl sm:flex-row sm:gap-3 sm:text-5xl">
          Get Me a Chai{" "}
          <span>
            <img className="invertImg h-16 w-16 sm:h-20 sm:w-20" src="/tea.gif" width={88} alt="tea" />
          </span>
        </div>
        <p className="max-w-2xl text-center text-sm leading-6 text-white/80 sm:text-base">
          A crowdfunding platform for creators. Get funded by your fans and
          followers. Start your campaign and share it with your audience to
          receive support and contributions.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-linear-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Start Here
          </Link>
          <Link
            href="/about"
            className="rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-linear-to-bl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Read More
          </Link>

  
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>
      <div className="container mx-auto my-14 px-4 text-white sm:px-6 lg:px-8">
        <h1 className="my-10 text-center text-2xl font-bold sm:my-14 sm:text-3xl">
          Your Fans can buy you a Chai.
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img
              className="bg-slate-400 rounded-full p-2 text-black "
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center text-sm leading-6 text-white/80">
              Your Fans are available for you to help you{" "}
            </p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3">
            <img
              className="bg-slate-400 rounded-full p-2 text-black "
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center text-sm leading-6 text-white/80">
              Your Fans are available for you to help you{" "}
            </p>
          </div>
          <div className="item flex flex-col items-center justify-center space-y-3 sm:col-span-2 lg:col-span-1">
            <img
              className="bg-slate-400 rounded-full p-2 text-black "
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold">Fans want to help</p>
            <p className="text-center text-sm leading-6 text-white/80">
              Your Fans are available for you to help you{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className="container mx-auto my-14 flex flex-col items-center justify-center gap-5 px-4 text-white sm:px-6 lg:px-8">
        <h1 className="my-5 text-center text-2xl font-bold sm:text-3xl">
          Learn more about us
        </h1>
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/30">
          <div className="relative w-full pb-[56.25%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full"
              src="https://www.youtube.com/embed/OQ1_3K_SUkc?si=tkO9rqgr0gXZOrkn&autoplay=1&mute=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
