import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout"
import Sidebar from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Toaster } from "@/components/ui/toaster"
import { SideLink } from "@/data/sidelink"
import useIsCollapsed from "@/hooks/use-is-collapse"
import { IconAccessPoint, IconDashboard, IconNews, IconPaperBag, IconSettings, IconUser } from "@tabler/icons-react"
import { Outlet } from "react-router-dom"


const links: SideLink[] = [
    {
        title: 'Dashboard',
        href: '/backoffice',
        icon: <IconDashboard />,
    },
    {
        title: 'Surat Tugas',
        href: '/backoffice/assignments',
        icon: <IconPaperBag />,
    },
    {
        title: 'Kegiatan',
        href: '/backoffice/activities',
        icon: <IconAccessPoint />,
    },
    {
        title: 'Berita',
        href: '/backoffice/announcements',
        icon: <IconNews />,
    },
    {
        title: 'Pengguna',
        href: '/backoffice/users',
        icon: <IconUser />,
    },
    {
        title: 'Settings',
        href: '/backoffice/settings',
        icon: <IconSettings />,
    }
]

export const AppLayout = () => {

    const [isCollapsed, setIsCollapsed] = useIsCollapsed()

    return (
        <div className='relative h-full overflow-hidden bg-background'>
            <Toaster />
            <Sidebar links={links} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main
                id='content'
                className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
            >
                <Layout>
                    <LayoutHeader className="border-b" >
                        <div className='ml-auto flex items-center space-x-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='default' className='relative h-8 w-8 rounded-full'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='w-56' align='end' forceMount>
                                    <DropdownMenuLabel className='font-normal'>
                                        <div className='flex flex-col space-y-1'>
                                            <p className='text-sm font-medium leading-none'>admin</p>
                                            <p className='text-xs leading-none text-muted-foreground'>
                                                admin@gmail.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </LayoutHeader>
                    <LayoutBody>
                        <Outlet />
                    </LayoutBody>
                </Layout>
            </main>
        </div>
    )
}