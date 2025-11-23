// This module now uses local, language-specific mock snippets only.
// API calls and keys were removed for safety and offline/demo usage.

// Mock code snippets for languages
// Reverse array code for each language
const REVERSE_ARRAY_SNIPPETS = {
    log("User #{@name} created")
  end
end

user = User.new("Alice")`
};

/**
 * Generate code using local mock snippets only (no external API calls).
 * @param {string} prompt - The user's prompt
 * @param {string} language - The target programming language
 * @returns {Promise<{code: string, language: string, prompt: string, isMock: boolean}>}
 */
    // Always return the reverse array code for the selected language (no API, no delay)
    const code = REVERSE_ARRAY_SNIPPETS[language.toLowerCase()] || REVERSE_ARRAY_SNIPPETS['javascript'];
    return {
        code,
        language,
        prompt,
        isMock: true
    };
}
