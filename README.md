# Gist — Text Summarizer

Paste in a long piece of text and get back a short, medium, or long summary, powered by Google's Gemini API.

## How it works
- The frontend (`index.html` + `script.js`) sends your text to a Cloudflare Worker.
- The Worker holds the Gemini API key securely and calls Gemini on the frontend's behalf.
- The summary is sent back and displayed — no API key ever touches the browser.

## Features
- Short / Medium / Long summary length options
- Copy and Clear buttons
- Live word count

## Tech stack
- HTML, CSS, JavaScript (vanilla)
- Google Gemini API
- Cloudflare Workers (secure backend proxy)
