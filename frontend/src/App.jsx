import './App.css'

function App() {
    return (
        <>
            <nav className="flex w-6xl py-4 items-center m-auto justify-between">
                <div className="font-bold">
                    <span>
                        <strong className="text-[#00C49A] py-1 px-2 rounded-lg bg-[#156064]">
                            M
                        </strong>
                    </span>{' '}
                    myBank
                </div>
                <div className="flex gap-3 p-2 hover:bg-zinc-50">
                    <button>Sign in</button>
                    <button className="py-2 rounded-lg text-white px-4 bg-[#156064]">
                        Get started free
                    </button>
                </div>
            </nav>
            <section className="h-screen flex  bg-zinc-50">
                <div className="w-6xl h-[70%] m-auto ">
                    <div className="border w-59.5 border-[#00C49A] py-2 px-2 mb-2 rounded-2xl">
                        <p className="text-sm text-[#00C49A] font-semibold">
                            Personal finance. Made simple
                        </p>
                    </div>
                    <div className="flex h-full">
                        <div className="flex-1 flex flex-col h-[80%] justify-between py-5">
                            <h1 className="text-6xl ">
                                <span className="font-light">
                                    Take control of
                                </span>{' '}
                                <br /> <strong>your money</strong>
                            </h1>
                            <p className="text-pretty text-zinc-400 ">
                                Track every expense, understand your spending
                                patterns, and take control of your financial
                                future with our simple, powerful expense
                                tracker.
                            </p>
                            <div>
                                <button className="py-2 rounded-lg text-white px-4 bg-[#156064]">
                                    Start for free
                                </button>
                                <a href="#" className="text-[#00C49A] px-2">
                                    see how it work{' '}
                                </a>
                            </div>
                            <div className="flex  items-center gap-1">
                                <span className="bg-amber-300 p-2 text-sm font-bold text-[#156064] rounded-full">
                                    CB
                                </span>
                                <span className="bg-amber-300 p-2 text-sm rounded-full font-bold text-[#156064]">
                                    AB
                                </span>
                                <span className="bg-amber-300 p-2 text-sm rounded-full font-bold text-[#156064]">
                                    MK
                                </span>
                                <p className="text-zinc-400 text-sm px-2">
                                    trusted by 12,000+ users
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 h-[80%]  relative">
                            <div className="h-[80%] shadow-2xl rounded-lg w-[65%] bg-white absolute right-0">
                                <div className="h-[20%] w-[97%] px-4 py-1 rounded-l-lg bg-[#156064]">
                                    <p className=" text-xs text-zinc-300">
                                        Total balance
                                    </p>
                                    <p className="text-white  text-2xl">
                                        <strong> $ 2,480.50</strong>
                                    </p>
                                </div>
                                <div className="flex flex-col mt-4 justify-between ">
                                    <div>
                                        <div className=" rounded-lg border-[#156064] m-auto w-[90%] border-l-6 right-0 bg-white py-4  items-center flex  ">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">
                                                    Carrefour
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    01 Aug salary
                                                </p>
                                            </div>
                                            <div className="flex-1 text-[#156064] text-end">
                                                <strong> +$ 3,200.00</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className=" rounded-lg border-orange-400 m-auto w-[90%] border-l-6 right-0 bg-white py-4  items-center flex  ">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">
                                                    Carrefour
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    05 Aug food
                                                </p>
                                            </div>
                                            <div className="flex-1 text-[#156064] text-end">
                                                <strong className="text-red-500 ">
                                                    {' '}
                                                    -$ 87,40
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className=" rounded-lg border-blue-400 m-auto w-[90%] border-l-6 right-0 bg-white py-4  items-center flex  ">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">
                                                    Navigo Pass
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    07 Aug Transport
                                                </p>
                                            </div>
                                            <div className="flex-1 text-[#156064] text-end">
                                                <strong className="text-red-500 ">
                                                    {' '}
                                                    -$ 87,40
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-screen bg-white flex flex-col items-center justify-center">
                <span className="mb-3 text-[#00C49A]">Why my bank</span>
                <h2 className="text-4xl font-semibold  mb-9">
                    Evrything you need, nothing you don't.
                </h2>
                <div className=" flex gap-6 w-[80%] ">
                    <div className="flex-1 flex justify-between flex-col p-4 h-62.5 border border-gray-200 rounded-lg ">
                        <div className="w-8.5 h-8.5 text-[#156064] text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
                            +
                        </div>
                        <p>
                            <strong>Full CRUD operations</strong>
                        </p>
                        <p className="text-zinc-400">
                            {' '}
                            Track every transaction instantly with complete
                            control to create, read, update, and delete all your
                            financial records.
                        </p>
                    </div>
                    <div className=" p-4 flex-1 flex justify-between flex-col h-62.5 border border-gray-200 rounded-lg ">
                        <div className="w-8.5 h-8.5 text-[#156064] text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
                            +
                        </div>
                        <p>
                            <strong>Smart categories</strong>
                        </p>
                        <p className="text-zinc-400">
                            {' '}
                            Organize and filter your spending with custom
                            categories that help you understand where your money
                            goes.
                        </p>
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between h-62.5 border border-gray-200 rounded-lg ">
                        <div className="w-8.5 h-8.5 text-[#156064] text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
                            +
                        </div>
                        <p>
                            <strong>Instant overview</strong>
                        </p>
                        <p className="text-zinc-400 text-start">
                            {' '}
                            Balance, income and expenses at a glance with
                            real-time updates and clear financial <br />
                            insights.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-zinc-50 flex flex-col h-[200vh]">
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex  h-[70%] w-[75%]">
                        <div className="flex-1 flex items-center justify-center ">
                            <div className="flex bg-white rounded-lg shadow-sm h-[70%] w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col ">
                            <h3 className=" w-full text-2xl font-semibold mb-2">
                                Creat an acount
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Sign up in seconds with just your email. No
                                credit card required, no commitments.
                            </p>
                            <p className="absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                01
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex flex-row-reverse  h-[70%] w-[75%]">
                        <div className="flex-1 flex items-center justify-center ">
                            <div className="flex bg-white rounded-lg shadow-sm h-[70%] w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col ">
                            <h3 className=" w-full text-2xl font-semibold mb-2">
                                Add operations
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Log your income and expenses with our simple
                                interface. Tag, categorize, and organize
                                effortlessly.
                            </p>
                            <p className="absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                02
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex  h-[70%] w-[75%]">
                        <div className="flex-1 flex items-center justify-center ">
                            <div className="flex bg-white rounded-lg shadow-sm h-[70%] w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col ">
                            <h3 className=" w-full text-2xl font-semibold mb-2">
                                Understand spending
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Sign up in seconds with just your email. No
                                credit card required, no commitments.
                            </p>
                            <p className="absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                03
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="h-[200vh] flex flex-col">
                <div className="bg-[#0D1F1F] flex items-center justify-center flex-1">
                    <div className="h-[50%]  w-[85%] gap-6 flex">
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "myBank transformed how I manage <br /> my
                                finances. Simple, powerful, and exactly what I
                                needed."
                            </p>
                            <p className="text-zinc-400">Freelance Designer</p>
                        </div>
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "Finally, an expense tracker that doesn't
                                overcomplicate things. Clean interface, powerful
                                features."
                            </p>
                            <p className="text-zinc-400">Software enginer</p>
                        </div>
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "I love that I can self-host it. Privacy-first
                                finance tracking that actually works."
                            </p>
                            <p className="text-zinc-400">Product Manager</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#156064] flex-1 flex flex-col gap-3 justify-center items-center">
                    <p className="text-white text-5xl font-semibold">
                        Start tracking today. It's free.
                    </p>
                    <p className="text-zinc-400 tracking-wide">
                        No credit card. No complexity.
                    </p>
                    <button className="py-2 rounded-lg text-[#156064] px-8 bg-white">
                        Get started free
                    </button>
                    <p className="text-zinc-400 text-xs">
                        Open source · Docker-ready · Self-hostable
                    </p>
                </div>
                <div className="bg-[#0D1F1F] flex-1 ">
                    <div className=" flex flex-col h-full w-[90%] m-auto">
                        {' '}
                        <div className="flex-3 border-b-2 border-zinc-600">
                            <div></div>
                            <div className="flex gap-3 justify-between items-center border border-zinc-50">
                                <ul>
                                    <li className="text-white font-semibold mb-1">
                                        Product
                                    </li>
                                    <li className="text-zinc-400">Features</li>
                                    <li className="text-zinc-400">Pricing</li>
                                    <li className="text-zinc-400">Roadmap</li>
                                </ul>
                                <ul>
                                    <li className="text-white font-semibold mb-1">
                                        Compagny
                                    </li>
                                    <li className="text-zinc-400">Features</li>
                                    <li className="text-zinc-400">Pricing</li>
                                    <li className="text-zinc-400">Roadmap</li>
                                </ul>
                                <ul>
                                    <li className="text-white font-semibold mb-1">
                                        Ressources
                                    </li>
                                    <li className="text-zinc-400">Features</li>
                                    <li className="text-zinc-400">Pricing</li>
                                    <li className="text-zinc-400">Roadmap</li>
                                </ul>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                            <p className="text-zinc-400">
                                © 2025 myBank. All rights reserved.
                            </p>
                            <p className="text-zinc-400">
                                Built with React & Symfony
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
