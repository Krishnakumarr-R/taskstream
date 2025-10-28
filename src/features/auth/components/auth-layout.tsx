import Image from "next/image";
import Link from "next/link";

const Authlayout = ({ children }: { children: React.ReactNode} ) => {
  return (
     <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link href="/" className="flex items-center  self-center font-medium">
          <Image
            alt="taskstream"
            src="/logos/logo.svg"
            width={40}
            height={40}
          />
          TaskStream
        </Link>
         {children }
      </div>
    </div>
  )
}

export default Authlayout