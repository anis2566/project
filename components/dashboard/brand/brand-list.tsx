"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import {Brand} from "@prisma/client"
import { EllipsisVertical, Eye, Pen,Trash2 } from "lucide-react"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Header } from "@/components/dashboard/brand/header"
import { PaginationComp } from "@/components/pagination-comp"
import { DELETE_BRAND } from "@/actions/brand.action"

interface BrandListProps {
    brands: Brand[];
    totalPage: number
}

export const BrandList = ({brands, totalPage}:BrandListProps) => {

    const pathname = usePathname()
    const router = useRouter()
    const brandId = useSearchParams().get("brandId")

    const handleClick = (brandId: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                brandId
            }
        }, { skipEmptyString: true, skipNull: true })
        
        router.push(url)
    }

    const hanldeClose = () => {
        router.push(pathname)
    }

    const {mutate: deleteBrand, isPending} = useMutation({
        mutationFn: DELETE_BRAND,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "delete-brand"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-brand"
            });
        }
    })

    const hanldeDelete = () => {
        toast.loading("Brand deleting...", {
            id: "delete-brand"
        })
        if (brandId) {
            deleteBrand(brandId)
        } else {
            toast.error("Brand ID is missing", {
                id: "delete-brand"
            });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Brand List</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 w-[300px] sm:w-full">
                <Header />
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Products</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            brands.map(brand => (
                            <TableRow key={brand.id}>
                                <TableCell className="py-2">
                                    <Avatar className="w-9 h-9">
                                        <AvatarImage src={brand.imageUrl} />
                                        <AvatarFallback>{brand.name}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-2">{brand.name}</TableCell>
                                <TableCell className="py-2">10</TableCell>
                                <TableCell className="py-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <EllipsisVertical className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/brand/products/${brand.id}`} className="flex items-center gap-x-3">
                                                    <Eye className="w-4 h-4" />
                                                    View Product
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/brand/edit/${brand.id}`} className="flex items-center gap-x-3">
                                                    <Pen className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => handleClick(brand.id)}>
                                                <Trash2 className="text-rose-500 w-4 h-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <PaginationComp totalPage={totalPage} />
                <AlertDialog open={!!brandId} onOpenChange={hanldeClose}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will delete the brand permanantly.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={hanldeDelete} disabled={isPending}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}