import { useCallback, useEffect, useRef, useState } from "react";

function updateUrlParam(paramName, page) {
    const url = new URL(window.location.href);

    if (page > 1) url.searchParams.set(paramName, String(page));
    else url.searchParams.delete(paramName);

    window.history.pushState({}, "", url.toString());
}

function safeInt(v, fallback) {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function useServerPagination({
    endpoint,              // string, напр. booksServerPath
    paramName = "page",    // string, напр. "book_page"
    setList,               // function, напр. setBookList
    buildList,             // function(rows, page, perPage) => list
    scrollRef,             // ref на top елемент списку
    scrollOffset = 0,      // number, напр. 150
    requestInitHeaders = { Accept: "application/json" },
}) {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [booting, setBooting] = useState(true);
    const [loading, setLoading] = useState(false);

    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
    const didInitialLoadRef = useRef(false);

    const scrollToTop = useCallback(() => {
        const el = scrollRef?.current;
        if (!el) return;

        // 1) М'який скрол
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // 2) Жорсткий offset/fallback (як у тебе, робочий)
        setTimeout(() => {
            const rect = el.getBoundingClientRect();
            const scrollTop =
                window.scrollY ??
                window.pageYOffset ??
                document.documentElement.scrollTop ??
                document.body.scrollTop ??
                0;

            const target = rect.top + scrollTop - (scrollOffset || 0);

            window.scrollTo({ top: target, behavior: "auto" });
            document.documentElement.scrollTop = target;
            document.body.scrollTop = target;
        }, 0);
    }, [scrollRef, scrollOffset]);

    const applyPayload = useCallback((payload, fallbackPage) => {
        const meta = payload?.meta ?? {};
        const rows = Array.isArray(payload?.data) ? payload.data : [];

        const metaPage = safeInt(meta.page, fallbackPage);
        const metaPerPage = safeInt(meta.per_page, perPage);
        const metaTotalPages = safeInt(meta.total_pages, totalPages);

        setPage(metaPage);
        setPerPage(metaPerPage);
        setTotalPages(metaTotalPages);

        updateUrlParam(paramName, metaPage);

        const list = buildList(rows, metaPage, metaPerPage);
        setList(list);
    }, [buildList, setList, paramName, perPage, totalPages]);

    const initialLoad = useCallback(async () => {
        setBooting(true);
        setLoading(true);

        try {
            const requestUrl = `${endpoint}${window.location.search || ""}`;
            const r = await fetch(requestUrl, { method: "POST", headers: requestInitHeaders });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);

            const payload = await r.json();
            applyPayload(payload, 1);
        } catch (e) {
            console.error("Initial load error:", e);
        } finally {
            setLoading(false);
            setBooting(false);
        }
    }, [endpoint, requestInitHeaders, applyPayload]);

    const loadPage = useCallback(async (nextPage) => {
        if (loading || booting) return;

        const safePage = Math.min(Math.max(nextPage, 1), totalPages || 1);

        scrollToTop();

        setList(null);
        setLoading(true);

        await nextFrame();

        try {
            const requestUrl = `${endpoint}${window.location.search || ""}`;

            const r = await fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ [paramName]: safePage }),
            });

            if (!r.ok) throw new Error(`HTTP ${r.status}`);

            const payload = await r.json();
            applyPayload(payload, safePage);
        } catch (e) {
            console.error("Pagination load error:", e);
        } finally {
            setLoading(false);
        }
    }, [loading, booting, totalPages, endpoint, paramName, setList, applyPayload, scrollToTop]);

    useEffect(() => {
        if (didInitialLoadRef.current) return;
        didInitialLoadRef.current = true;
        initialLoad();
    }, [initialLoad]);

    return {
        page,
        perPage,
        totalPages,
        booting,
        loading,
        initialLoad,
        loadPage,
        canPrev: page > 1 && !loading && !booting,
        canNext: page < totalPages && !loading && !booting,
        disabled: loading || booting,
    };
}
