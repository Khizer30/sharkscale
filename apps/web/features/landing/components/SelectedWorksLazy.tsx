"use client";
import dynamic from "next/dynamic";

const SelectedWorks = dynamic(() => import("@features/landing/components/SelectedWorks"), { ssr: false });

export default SelectedWorks;
