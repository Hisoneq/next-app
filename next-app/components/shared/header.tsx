import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({className}) => {
    return(
        <header className={cn('border border-b', className)}>
           <Container className="flex justify-between py-8">
            {/*left part*/}
            <div className="flex items-center gap-2">
                <Image src="/assets/images/dodoLogo.png" alt="logo" width={50} height={50}/>
        
                <div className="flex flex-col">
                    <h1 className="text-2xl uppercase font-black">Dodo Pizza</h1>
                    <p className="text-sm text-gray-400 leading-3">Есть то, что нас объединяет</p>
                </div>
            </div>

            {/*right part*/}
            <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-1">
                    <User size={16}/>
                    Войти
                </Button>

                <div>
                    <Button className="group relative">
                        <b>20 BYN</b>
                        <span className="h-full w-[1px] bg-white/30 mx-3" />

                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart className="h-4 w-4 relative" strokeWidth={2}/>
                            <b>3</b>
                        </div>
                        <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
                    </Button>
                </div>
            </div>

            </Container>
        </header>
    )
}