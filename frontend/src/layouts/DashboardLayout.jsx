import { Outlet, NavLink } from 'react-router-dom'

export default function DashboardLayout() {
    return (
        <div className="flex-col bg-zinc-100 h-screen ">
            <aside className="flex justify-between bg-[#00C49A] py-2 px-4 mb-6">
                <NavLink to="">
                    <div className="font-bold">
                        <span>
                            <strong className="text-[#] py-1 px-2 rounded-lg bg-[#156064]">
                                M
                            </strong>
                        </span>{' '}
                        myBank
                    </div>
                </NavLink>
                <NavLink to="settings">
                    <p className="bg-[#F8E16C] grid items-center text-center text-[#156064] w-8 h-8 rounded-full">
                        JD
                    </p>
                </NavLink>
            </aside>
            <main className="px-8 ">
                <Outlet /> {/* ← les pages s'affichent ici */}
            </main>
        </div>
    )
}
