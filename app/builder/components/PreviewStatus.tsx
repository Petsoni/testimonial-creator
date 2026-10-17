import React from "react";
import {useCanExport} from "@/app/builder/components/ExportButton";
import {ARTBOARD_SIZE, EXPORT_SCALE} from "@/lib/screenshot-service";
import {cn} from "@/lib/utils";

/** One line under the preview: the export size, or what's missing before export works. Same box either way, so nothing shifts. */
function PreviewStatus({className}: { className?: string }) {
    const canExport = useCanExport();
    const size = ARTBOARD_SIZE * EXPORT_SCALE;

    return (
        <div className={cn("grid justify-items-center font-mono text-[11px] tracking-[0.06em] text-ink-2 uppercase tabular-nums", className)}>
            <small
                aria-hidden={!canExport || undefined}
                className={cn("col-start-1 row-start-1 transition-opacity duration-200", !canExport && "opacity-0")}
            >
                {size} × {size} PNG
            </small>
            <small
                aria-hidden={canExport || undefined}
                className={cn("col-start-1 row-start-1 transition-opacity duration-200", canExport && "opacity-0")}
            >
                Add a name and a quote to export.
            </small>
        </div>
    );
}

export default PreviewStatus;
