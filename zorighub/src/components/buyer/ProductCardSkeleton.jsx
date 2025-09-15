import React from "react";
import { Placeholder } from "rsuite";

export default function ProductCardSkeleton() {
    return (
        <article className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <Placeholder.Graph active style={{ width: "100%", height: 192 }} />
            <div className="p-4 space-y-2">
                <Placeholder.Paragraph rows={1} style={{ width: "70%" }} active />
                <Placeholder.Paragraph rows={1} style={{ width: "40%" }} active />
                <Placeholder.Paragraph rows={1} style={{ width: "55%" }} active />
                <div className="mt-3 flex items-center justify-between">
                    <Placeholder.Paragraph rows={1} style={{ width: 120 }} active />
                    <Placeholder.Paragraph rows={1} style={{ width: 90 }} active />
                </div>
            </div>
        </article>
    );
}
