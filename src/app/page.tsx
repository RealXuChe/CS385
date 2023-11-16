import Image from "next/image";

export default function Home() {
    return <>
        <div className="flex flex-wrap justify-center bg-gray-100 dark:bg-gray-900">
            <div
                className="m-4 transform transition-transform ease-in-out duration-200 hover:scale-105 hover:shadow-lg rounded-3xl border-2 border-gray-300 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="w-64 h-36 relative">
                    <Image
                        alt="Card image"
                        layout="fill"
                        src="/next.svg"
                        style={{
                            aspectRatio: "16/9",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <p className="p-2 text-center">Card 1</p>
            </div>
        </div>
    </>;
}
