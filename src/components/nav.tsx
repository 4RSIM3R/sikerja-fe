import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { IconChevronDown } from '@tabler/icons-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Link } from "react-router-dom"
import { SideLink } from "@/data/sidelink"

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean
    links: SideLink[]
    closeNav: () => void
}

export default function Nav({
    links,
    isCollapsed,
    className,
    closeNav,
}: NavProps) {
    const renderLink = ({ sub, ...rest }: SideLink) => {
        const key = `${rest.title}-${rest.href}`
        if (isCollapsed && sub)
            return (
                <NavLinkIconDropdown
                    {...rest}
                    sub={sub}
                    key={key}
                    closeNav={closeNav}
                    isCollapsed={isCollapsed}
                />
            )

        if (isCollapsed)
            return <NavLinkIcon isCollapsed={isCollapsed} {...rest} key={key} closeNav={closeNav} />

        if (sub)
            return (
                <NavLinkDropdown isCollapsed={isCollapsed} {...rest} sub={sub} key={key} closeNav={closeNav} />
            )

        return <NavLink isCollapsed={isCollapsed} {...rest} key={key} closeNav={closeNav} />
    }
    return (
        <div
            data-collapsed={isCollapsed}
            className={cn(
                'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
                className
            )}
        >
            <TooltipProvider delayDuration={0}>
                <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
                    {links.map(renderLink)}
                </nav>
            </TooltipProvider>
        </div>
    )
}

interface NavLinkProps extends SideLink {
    subLink?: boolean
    closeNav: () => void,
    isCollapsed: boolean,
}

function NavLink({
    title,
    icon,
    label,
    href,
    closeNav,
    subLink = false,
}: NavLinkProps) {
    return (
        <Link
            to={href}
            onClick={closeNav}
            className={cn(
                buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                }),
                'h-12 justify-start text-wrap rounded-none px-6',
                subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
            )}
            aria-current={undefined}
        >
            <div className='mr-2'>{icon}</div>
            {title}
            {label && (
                <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
                    {label}
                </div>
            )}
        </Link>
    )
}

function NavLinkDropdown({ title, icon, label, sub, closeNav, isCollapsed }: NavLinkProps) {

    return (
        <Collapsible defaultOpen={false}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'group h-12 w-full justify-start rounded-none px-6'
                )}
            >
                <div className='mr-2'>{icon}</div>
                {title}
                {label && (
                    <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
                        {label}
                    </div>
                )}
                <span
                    className={cn(
                        'ml-auto transition-all group-data-[state="open"]:-rotate-180'
                    )}
                >
                    <IconChevronDown />
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent className='collapsibleDropdown' asChild>
                <ul>
                    {sub!.map((sublink) => (
                        <li key={sublink.title} className='my-1 ml-8'>
                            <NavLink {...sublink} subLink closeNav={closeNav} isCollapsed={isCollapsed} />
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    )
}

function NavLinkIcon({ title, icon, label, href, isCollapsed }: NavLinkProps) {

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    to={href}
                    className={cn(
                        buttonVariants({
                            variant: 'ghost',
                            size: 'icon',
                        }),
                        'h-12 w-12'
                    )}
                >
                    {icon}
                    <span className='sr-only'>{title}</span>
                </Link>
            </TooltipTrigger>
            {
                !isCollapsed ? <TooltipContent side='right' className='flex items-center gap-4'>
                    {title}
                    {label && (
                        <span className='ml-auto text-muted-foreground'>{label}</span>
                    )}
                </TooltipContent> : <></>
            }
        </Tooltip>
    )
}

function NavLinkIconDropdown({ title, icon, label, sub, isCollapsed }: NavLinkProps) {



    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={'ghost'}
                            size='icon'
                            className='h-12 w-12'
                        >
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                {
                    !isCollapsed ? <TooltipContent side='right' className='flex items-center gap-4'>
                        {title}{' '}
                        {label && (
                            <span className='ml-auto text-muted-foreground'>{label}</span>
                        )}
                        <IconChevronDown
                            className='-rotate-90 text-muted-foreground'
                        />
                    </TooltipContent> : <></>
                }
            </Tooltip>
            {
                !isCollapsed ? <DropdownMenuContent side='right' align='start' sideOffset={4}>
                    <DropdownMenuLabel>
                        {title} {label ? `(${label})` : ''}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sub!.map(({ title, icon, label, href }) => (
                        <DropdownMenuItem key={`${title}-${href}`} asChild>
                            <Link
                                to={href}
                                className={''}
                            >
                                {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
                                {label && <span className='ml-auto text-xs'>{label}</span>}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent> : <></>
            }
        </DropdownMenu>
    )
}