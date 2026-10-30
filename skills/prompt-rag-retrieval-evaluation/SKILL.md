---
name: prompt-rag-retrieval-evaluation
description: Use when implementing retrieval-augmented generation, embeddings, prompt changes, model routing or search-assisted answers.
---

# Prompt, RAG and retrieval evaluation

**When activated:** Apply this only if the actual task matches the description. First inspect available evidence and select relevant references; do not infer project details from the skill name.

## Workflow
1. Define target questions, corpus permissions, quality goals, costs and hallucination/error risks.
2. Choose chunking, metadata filters, embedding/rerank strategies and permissions-aware retrieval design.
3. Build representative labeled examples including no-answer, contradictory and stale documents; separate training and test data.
4. Measure retrieval relevance, grounded answer quality, abstention, latency, cost and failure slices.
5. Keep data provenance and human review for consequential outputs; compare to baseline before shipping.

## Deliverable
Evaluation dataset plan, retrieval diagnostics and release thresholds.

## Quality gate
Report what was **observed**, what is **proposed**, which checks **passed/failed/were not run**, and any remaining risks. Use tools only when available and authorised. For destructive, financial, production or customer-data changes, require explicit approval. Never claim a test, screenshot, design file, deployment or tool action exists without evidence.
