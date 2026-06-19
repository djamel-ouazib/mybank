import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
    const navigate = useNavigate()
    return (
        <>
            <nav className="flex w-full max-w-6xl py-4 px-4 items-center m-auto justify-between">
                <div className="font-bold">
                    <span>
                        <strong className="text-accent py-1 px-2 rounded-lg bg-primary">
                            M
                        </strong>
                    </span>{' '}
                    myBank
                </div>
                <div className="flex gap-2 sm:gap-3 p-2 hover:bg-zinc-50">
                    <button className="text-sm sm:text-base">Sign in</button>
                    <button
                        className="py-2 rounded-lg text-white px-3 sm:px-4 text-sm sm:text-base bg-primary"
                        onClick={() => {
                            navigate('/app')
                        }}
                    >
                        Get started free
                    </button>
                </div>
            </nav>

            <section className="min-h-screen lg:h-screen flex bg-zinc-50 px-4 py-10 lg:py-0">
                <div className="w-full max-w-6xl h-auto lg:h-[70%] m-auto">
                    <div className="border w-fit border-accent py-2 px-2 mb-2 rounded-2xl">
                        <p className="text-sm text-accent font-semibold">
                            Personal finance. Made simple
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row h-full gap-10 lg:gap-0">
                        <div className="flex-1 flex flex-col h-auto lg:h-[80%] justify-between py-5 gap-6 lg:gap-0">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl">
                                <span className="font-light">
                                    Take control of
                                </span>{' '}
                                <br /> <strong>your money</strong>
                            </h1>
                            <p className="text-pretty text-zinc-400">
                                Track every expense, understand your spending
                                patterns, and take control of your financial
                                future with our simple, powerful expense
                                tracker.
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <button className="py-2 rounded-lg text-white px-4 bg-primary">
                                    Start for free
                                </button>
                                <a href="#" className="text-accent px-2">
                                    see how it work{' '}
                                </a>
                            </div>
                            <div className="flex items-center gap-1 flex-wrap">
                                <span className="bg-accent-2 p-2 text-sm font-bold text-primary rounded-full">
                                    CB
                                </span>
                                <span className="bg-accent-2 p-2 text-sm rounded-full font-bold text-primary">
                                    AB
                                </span>
                                <span className="bg-accent-2 p-2 text-sm rounded-full font-bold text-primary">
                                    MK
                                </span>
                                <p className="text-zinc-400 text-sm px-2">
                                    trusted by 12,000+ users
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:block flex-1 h-[80%] relative">
                            <div className="h-[80%] shadow-2xl rounded-lg w-[65%] bg-white absolute right-0">
                                <div className="h-[20%] w-[97%] px-4 py-1 rounded-l-lg bg-primary">
                                    <p className=" text-xs text-zinc-300">
                                        Total balance
                                    </p>
                                    <p className="text-white  text-2xl">
                                        <strong> $ 2,480.50</strong>
                                    </p>
                                </div>
                                <div className="flex flex-col mt-4 justify-between ">
                                    <div>
                                        <div className=" rounded-lg border-primary m-auto w-[90%] border-l-6 right-0 bg-white py-4  items-center flex  ">
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold">
                                                    Carrefour
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    01 Aug salary
                                                </p>
                                            </div>
                                            <div className="flex-1 text-success text-end">
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
                                            <div className="flex-1 text-end">
                                                <strong className="text-error ">
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
                                            <div className="flex-1 text-end">
                                                <strong className="text-error ">
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

            <section className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16">
                <span className="mb-3 text-accent text-sm sm:text-base">
                    Why my bank
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-9 text-center">
                    Evrything you need, nothing you don't.
                </h2>
                <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
                    <div className="flex-1 flex justify-between flex-col p-4 h-auto md:h-62.5 border border-gray-200 rounded-lg gap-4">
                        <div className="w-8.5 h-8.5 text-primary text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
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
                    <div className="p-4 flex-1 flex justify-between flex-col h-auto md:h-62.5 border border-gray-200 rounded-lg gap-4">
                        <div className="w-8.5 h-8.5 text-primary text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
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
                    <div className="flex-1 p-4 flex flex-col justify-between h-auto md:h-62.5 border border-gray-200 rounded-lg gap-4">
                        <div className="w-8.5 h-8.5 text-primary text-xl flex items-center justify-center bg-zinc-100 rounded-lg">
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

            <section className="bg-zinc-50 flex flex-col py-10 lg:py-0 lg:h-[200vh]">
                <div className="flex-1 flex justify-center items-center py-10 lg:py-0">
                    <div className="flex flex-col md:flex-row h-auto lg:h-[70%] w-[90%] lg:w-[75%] gap-8 md:gap-0">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex bg-white rounded-lg shadow-sm h-40 md:h-[70%] w-full md:w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col text-center md:text-left">
                            <h3 className="w-full text-xl sm:text-2xl font-semibold mb-2">
                                Creat an acount
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Sign up in seconds with just your email. No
                                credit card required, no commitments.
                            </p>
                            <p className="hidden md:block absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                01
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center py-10 lg:py-0">
                    <div className="flex flex-col md:flex-row-reverse h-auto lg:h-[70%] w-[90%] lg:w-[75%] gap-8 md:gap-0">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex bg-white rounded-lg shadow-sm h-40 md:h-[70%] w-full md:w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col text-center md:text-left">
                            <h3 className="w-full text-xl sm:text-2xl font-semibold mb-2">
                                Add operations
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Log your income and expenses with our simple
                                interface. Tag, categorize, and organize
                                effortlessly.
                            </p>
                            <p className="hidden md:block absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                02
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center py-10 lg:py-0">
                    <div className="flex flex-col md:flex-row h-auto lg:h-[70%] w-[90%] lg:w-[75%] gap-8 md:gap-0">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="flex bg-white rounded-lg shadow-sm h-40 md:h-[70%] w-full md:w-[80%]">
                                carte
                            </div>
                        </div>
                        <div className="flex-1 relative flex items-center justify-center flex-col text-center md:text-left">
                            <h3 className="w-full text-xl sm:text-2xl font-semibold mb-2">
                                Understand spending
                            </h3>
                            <p className="text-zinc-400 z-10">
                                Sign up in seconds with just your email. No
                                credit card required, no commitments.
                            </p>
                            <p className="hidden md:block absolute text-9xl left-1 top-1/2 font-extrabold text-zinc-100">
                                03
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col">
                <div className="bg-primary flex items-center justify-center py-12 lg:py-0 lg:h-[33vh]">
                    <div className="w-[90%] lg:w-[85%] gap-6 flex flex-col md:flex-row">
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full gap-3">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "myBank transformed how I manage <br /> my
                                finances. Simple, powerful, and exactly what I
                                needed."
                            </p>
                            <p className="text-zinc-400">Freelance Designer</p>
                        </div>
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full gap-3">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "Finally, an expense tracker that doesn't
                                overcomplicate things. Clean interface, powerful
                                features."
                            </p>
                            <p className="text-zinc-400">Software enginer</p>
                        </div>
                        <div className="flex-1 flex justify-between flex-col p-3 bg-white rounded-lg h-full w-full gap-3">
                            <div>⭐⭐⭐⭐⭐</div>
                            <p>
                                "I love that I can self-host it. Privacy-first
                                finance tracking that actually works."
                            </p>
                            <p className="text-zinc-400">Product Manager</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary flex flex-col gap-3 justify-center items-center py-16 px-4 text-center">
                    <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-semibold">
                        Start tracking today. It's free.
                    </p>
                    <p className="text-zinc-400 tracking-wide">
                        No credit card. No complexity.
                    </p>
                    <button className="py-2 rounded-lg text-primary px-8 bg-white">
                        Get started free
                    </button>
                    <p className="text-zinc-400 text-xs">
                        Open source · Docker-ready · Self-hostable
                    </p>
                </div>

                <div className="bg-primary py-10 px-4">
                    <div className="flex flex-col h-full w-full max-w-5xl m-auto gap-8">
                        <div className="border-b-2 border-zinc-600 pb-8">
                            <div className="flex flex-col sm:flex-row gap-6 sm:justify-between">
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
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center text-center sm:text-left">
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
