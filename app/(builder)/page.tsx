import LeftSidebar from "@/app/(builder)/components/LeftSidebar";
import RightSidebar from "@/app/(builder)/components/RightSidebar";

export default function Home() {
    return (
        <main className={"flex flex-row w-full"}>
            <LeftSidebar/>
            <section className={"w-full flex items-center justify-center"}>
                <div className="shadow p-8 rounded-xl bg-white">
                    Test
                </div>
            </section>
            <RightSidebar/>
        </main>
    );
}
