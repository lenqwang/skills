#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Search functions and output formatting."""

from pathlib import Path

from . import CSV_TABLES
from .bm25 import BM25
from .csv_ops import load_csv


def search(traces_dir, query, domain="index", max_results=5, filters=None):
    """
    BM25 search across a CSV table.

    Args:
        traces_dir: Path to docs/traces/
        query: Search query string
        domain: CSV table to search (index, files, tests, apis, tech_debt)
        max_results: Max results to return
        filters: Dict of column->value filters applied post-search
    """
    filters = filters or {}
    config = CSV_TABLES.get(domain)
    if not config:
        return {"error": f"Unknown domain: {domain}. Available: {', '.join(CSV_TABLES.keys())}"}

    filepath = Path(traces_dir) / config["file"]
    data = load_csv(filepath)
    if not data:
        return {"domain": domain, "query": query, "count": 0, "results": []}

    # Apply pre-filters
    if filters:
        filtered_data = []
        for row in data:
            match = True
            for col, val in filters.items():
                if col in row and row[col].lower() != val.lower():
                    match = False
                    break
            if match:
                filtered_data.append(row)
        data = filtered_data

    if not data:
        return {"domain": domain, "query": query, "count": 0, "results": [], "filters": filters}

    # BM25 search (or return all if no query)
    if query:
        documents = [
            " ".join(str(row.get(col, "")) for col in config["search_cols"])
            for row in data
        ]
        bm25 = BM25()
        bm25.fit(documents)
        ranked = bm25.score(query)

        results = []
        for idx, score in ranked[:max_results]:
            if score > 0:
                row = data[idx]
                results.append({col: row.get(col, "") for col in config["output_cols"] if col in row})
    else:
        # No query, return filtered results (up to max)
        results = [
            {col: row.get(col, "") for col in config["output_cols"] if col in row}
            for row in data[:max_results]
        ]

    return {
        "domain": domain,
        "query": query or "(all)",
        "count": len(results),
        "results": results,
        "filters": filters if filters else None,
    }


def format_output(result):
    """Format search results for terminal display."""
    if "error" in result:
        return f"Error: {result['error']}"

    output = [f"## Ray Artifact Search"]
    output.append(f"**Domain:** {result['domain']} | **Query:** {result['query']}")
    if result.get("filters"):
        output.append(f"**Filters:** {result['filters']}")
    output.append(f"**Found:** {result['count']} results\n")

    for i, row in enumerate(result["results"], 1):
        output.append(f"### Result {i}")
        for key, value in row.items():
            value_str = str(value)
            if len(value_str) > 300:
                value_str = value_str[:300] + "..."
            output.append(f"- **{key}:** {value_str}")
        output.append("")

    return "\n".join(output)
