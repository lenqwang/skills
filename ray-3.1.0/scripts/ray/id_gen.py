#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""FEAT-ID generation."""

import hashlib
import re

from . import VALID_TYPES


def generate_feat_id(feat_type, title, date_str=None):
    """
    Generate a FEAT-ID: {TYPE}-{4hex}-{slug}

    Hash is computed from date + title for idempotency.
    Slug is 2-3 words extracted from title, kebab-case.
    """
    feat_type = feat_type.upper()
    if feat_type not in VALID_TYPES:
        raise ValueError(f"Invalid type: {feat_type}. Must be one of {VALID_TYPES}")

    # Hash: SHA256 of date+title, take first 4 hex chars
    hash_input = f"{date_str or ''}{title}".encode("utf-8")
    short_hash = hashlib.sha256(hash_input).hexdigest()[:4]

    # Slug: extract keywords, kebab-case, max 3 words
    slug = re.sub(r"[^\w\s]", "", title.lower())
    # Remove common stop words
    stop_words = {"the", "a", "an", "is", "are", "was", "were", "be", "been",
                  "in", "on", "at", "to", "for", "of", "with", "and", "or",
                  "not", "no", "but", "if", "do", "does", "did", "will",
                  "would", "could", "should", "may", "might", "can",
                  "this", "that", "these", "those", "it", "its"}
    words = [w for w in slug.split() if w and w not in stop_words]
    slug = "-".join(words[:3])

    if not slug:
        slug = short_hash

    return f"{feat_type}-{short_hash}-{slug}"
