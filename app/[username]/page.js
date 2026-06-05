// This is how we make a Dynamic Routes in NextJS 13
export default async function Username({ params }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  return (
    <>
      <div className="cover w-[100%] bg-red-50 relative">
        <img className="w-full h-[650] object-cover" src="/Home1.avif" />
        <div className="absolute -bottom-20 right-[46%] border-white border-2 rounded-full">
          <img
            className="rounded-full object-cover w-[150px] h-[150px]"
            width={150}
            height={150}
            src="/HarshImage.jpeg"
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 mb-32 flex-col gap-2">
        <div className="font-bold text-lg">@{decodedUsername} Developer</div>
        <div className="text-slate-400">Creating Animated art for VIT's</div>
        <div className="text-slate-400">
          9,719 members . 82 posts . $10,005/release
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-5 text-sm">
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
                <span>
                  John Doe donated <span className="font-bold">$30</span> with a
                  message "I support you bro!"
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
                <span>
                  John Doe donated <span className="font-bold">$30</span> with a
                  message "I support you bro!"
                </span>
              </li>
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
                <span>
                  John Doe donated <span className="font-bold">$30</span> with a
                  message "I support you bro!"
                </span>
              </li>
            </ul>
          </div>
          <div className="makePayment w-1/2 bg-slate-900 rounded-lg text-white p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              <div>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800 "
                  placeholder="Enter Name"
                />
              </div>
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 "
                placeholder="Enter Message"
              />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800 "
                placeholder="Enter Amount"
              />
              <button
                type="button"
                className=" text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center me-2 mb-2"
              >
                Pay
              </button>
            </div>

            <div className="flex gap-2 mt-5">
              <button className="bg-slate-800 p-3 rounded-lg ">Pay $10</button>
              <button className="bg-slate-800 p-3 rounded-lg ">Pay $25</button>
              <button className="bg-slate-800 p-3 rounded-lg ">Pay $50</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
