import React, { useMemo } from "react";

function defaultPaginationModel(page, totalPages) {
    const N = totalPages;

    if (N <= 1) return [1];
    if (N <= 5) return Array.from({ length: N }, (_, i) => i + 1);

    if (page <= 3) {
        const end = page === 1 ? 2 : page === 2 ? 3 : 4;
        return [1, 2, ...(end >= 3 ? [3] : []), ...(end >= 4 ? [4] : []), "…", N].filter(Boolean);
    }

    if (page === 4) return [1, "…", 3, 4, 5, "…", N];

    if (page >= N - 2) {
        const start = page === N ? N - 1 : page === N - 1 ? N - 2 : N - 3;
        const pages = [];
        for (let p = start; p <= N; p++) pages.push(p);
        return [1, "…", ...pages];
    }

    return [1, "…", page - 1, page, page + 1, "…", N];
}

export default function Pagination({
    page,
    totalPages,
    disabled = false,
    onPageChange,
    modelBuilder = defaultPaginationModel,
    className = "",
}) {
    const items = useMemo(() => modelBuilder(page, totalPages), [modelBuilder, page, totalPages]);

    const canPrev = page > 1 && !disabled;
    const canNext = page < totalPages && !disabled;

    if (!totalPages || totalPages <= 1) return null;

    return (
        <div className={`pagination ${disabled ? "is-disabled" : ""} ${className}`} aria-busy={disabled ? "true" : "false"}>
            <button
                type="button"
                className="pagination-page pagination-prev-page"
                onClick={() => onPageChange(page - 1)}
                disabled={!canPrev}
            >
                {"<"}
            </button>

            {items.map((item, idx) => {
                if (item === "…") {
                    return (
                        <span key={`dots-${idx}`} className="pagination-divider">
                            …
                        </span>
                    );
                }

                const p = item;
                const isActive = p === page;

                if (isActive) {
                    return (
                        <span key={p} className="pagination-page pagination-active-page" aria-current="page">
                            {p}
                        </span>
                    );
                }

                return (
                    <button
                        key={p}
                        type="button"
                        className="pagination-page"
                        onClick={() => onPageChange(p)}
                        disabled={disabled}
                    >
                        {p}
                    </button>
                );
            })}

            <button
                type="button"
                className="pagination-page pagination-next-page"
                onClick={() => onPageChange(page + 1)}
                disabled={!canNext}
            >
                {">"}
            </button>
        </div>
    );
}
