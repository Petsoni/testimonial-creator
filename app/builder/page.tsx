import DesktopScreenshotLayout from "./components/DesktopScreenshotLayout";

export default function Builder() {

    return (
        <main>
            <div className={"h-[100dvh] flex items-center lg:hidden"}>
                {/*<MobileLayout/>*/}
                <h3 className={"w-full text-center"}>Customization on desktop is easier, trust me 😉</h3>
            </div>
            <div className={"hidden lg:block"}>
                <DesktopScreenshotLayout/>
            </div>
        </main>
    );
}
