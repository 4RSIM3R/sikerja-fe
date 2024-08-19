import { useEffect, useState } from "react"
import Nav from "./nav"
import { cn } from "@/lib/utils"
import { Layout, LayoutHeader } from "./custom/layout"
import { Button } from "./ui/button"
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react"
import { SideLink } from "@/data/sidelink"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>,
    links: SideLink[]
}

export default function Sidebar({
    className,
    isCollapsed,
    setIsCollapsed,
    links,
}: SidebarProps) {
    const [navOpened, setNavOpened] = useState(false)

    useEffect(() => {
        if (navOpened) {
            document.body.classList.add('overflow-hidden')
        } else {
            document.body.classList.remove('overflow-hidden')
        }
    }, [navOpened])

    return (
        <aside
            className={cn(
                `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
                className
            )}
        >
            {/* Overlay in mobile */}
            <div
                onClick={() => setNavOpened(false)}
                className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
            />

            <Layout>
                <LayoutHeader className='sticky top-0 justify-between px-4 py-3 md:px-4'>
                    <div className={`flex items-center ${!isCollapsed ? 'gap-2' : ''}`}>

                        {
                            isCollapsed ?
                                (<img className='h-6 w-6 object-cover' src='https://www.trafodiag.my.id/assets/img/trafodiag.png' />) :
                                (<div className="flex space-x-2 items-center" >
                                    <img className='h-6 w-6 object-cover' src='https://www.trafodiag.my.id/assets/img/trafodiag.png' />
                                    <p className="text-lg font-medium text-blue-600" >Trafodiag</p>
                                </div>)
                        }

                    </div>

                    {/* Toggle Button in mobile */}
                    <Button
                        variant='ghost'
                        size='icon'
                        className='md:hidden'
                        aria-label='Toggle Navigation'
                        aria-controls='sidebar-menu'
                        aria-expanded={navOpened}
                        onClick={() => setNavOpened((prev) => !prev)}
                    >
                        {navOpened ? <IconX /> : <IconMenu2 />}
                    </Button>
                </LayoutHeader>

                {/* Navigation links */}
                <Nav
                    id='sidebar-menu'
                    className={`h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
                    closeNav={() => setNavOpened(false)}
                    isCollapsed={isCollapsed}
                    links={links}
                />

                {/* Scrollbar width toggle button */}
                <Button
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    size='icon'
                    variant='outline'
                    className='absolute -right-5 top-1/2 hidden rounded-full md:inline-flex'
                >
                    <IconChevronsLeft
                        stroke={1.5}
                        className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
                    />
                </Button>
            </Layout>
        </aside>
    )
}