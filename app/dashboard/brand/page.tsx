import { CirclePlus } from "lucide-react"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { BrandList } from "@/components/dashboard/brand/brand-list"

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};
 
const Brand = async ({ searchParams }: Props) => {
    const {search, sort} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const brands = await db.brand.findMany({
        where: {
            ...(search && {
                name: {
                    contains: search, mode: "insensitive"
                }
            })
        },
        orderBy: {
            ...(sort === 'asc' && { name: 'asc' }),
            ...(sort === 'desc' && { name: 'desc' }),
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalBrands = await db.brand.count({
        where: {
            ...(search && {
                name: {
                    contains: search, mode: "insensitive"
                }
            })
        }
    }) 

    const totalPage = Math.ceil(totalBrands / itemsPerPage)

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Brand</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/brand/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <CirclePlus className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>

            <BrandList brands={brands} totalPage={totalPage} />
        </div>
    )
}

export default Brand