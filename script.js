const lengthGroup = document.getElementById("length-group");
const input = document.getElementById("input-text");
const wordCount = document.getElementById("word-count");
const output = document.getElementById("output-box");
const summarizeBtn = document.getElementById("summarize-btn");
 
const MAX_TOKENS_BY_LENGTH = { short: 150, medium: 400, long: 800 };

// Select summary length
lengthGroup.addEventListener("click", (e) => {
    const btn = e.target.closest("button");

    if (!btn) return;

    [...lengthGroup.children].forEach((b) => {
        b.setAttribute("aria-pressed", "false");
    });

    btn.setAttribute("aria-pressed", "true");
});

// Count words
input.addEventListener("input", () => {
    const words = input.value
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    wordCount.textContent = `${words} word${words === 1 ? "" : "s"}`;
});

// Loading state
function setLoading(isLoading) {
    summarizeBtn.disabled = isLoading;
    summarizeBtn.textContent = isLoading
        ? "Summarizing..."
        : "Summarize";
}

// Get selected length
function getSummaryLength() {
    const selected = lengthGroup.querySelector(
        '[aria-pressed="true"]'
    );

    return selected ? selected.dataset.length : "medium";
}
   // Summarize
 async function summarize() {
    const text = input.value.trim();

    if (!text) {
        output.textContent = "Please enter some text to summarize.";
        return;
    }

    const length = getSummaryLength();

    setLoading(true);

    try {
        const response = await fetch("https://worker.shrimtyagi.workers.dev", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text, length })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Request failed (${response.status})`);
        }

        output.textContent = data.summary;
        output.classList.add("has-result");

    } catch (error) {
        console.error(error);
        output.textContent = "Error: " + (error.message || "Something went wrong.");
    }

    setLoading(false);
}
 
// Summarize button
summarizeBtn.addEventListener("click", summarize);

// Copy button
document.getElementById("copy-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(output.textContent);
});

// Clear button
document.getElementById("clear-btn").addEventListener("click", () => {
    input.value = "";
    wordCount.textContent = "0 words";
    output.textContent = "Your summary will appear here.";
    output.classList.remove("has-result");
});