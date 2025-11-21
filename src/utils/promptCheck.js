// Simple function to check if the prompt is a coding question/description
// This can be improved with more advanced NLP or keyword checks
export function isCodingPrompt(prompt) {
  // Basic keywords that usually indicate a coding request
  const codingKeywords = [
    'function', 'class', 'array', 'object', 'variable', 'loop', 'sort', 'API', 'component',
    'write code', 'generate code', 'create', 'build', 'implement', 'algorithm', 'script',
    'React', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
    'regex', 'SQL', 'database', 'query', 'endpoint', 'UI', 'frontend', 'backend', 'server', 'client',
    'test', 'unit test', 'mock', 'hook', 'state', 'props', 'render', 'fetch', 'axios', 'express', 'node',
    'tailwind', 'css', 'html', 'jsx', 'ts', 'js', 'py', 'java', 'cpp', 'csharp', 'php', 'rb', 'go', 'rs'
  ];
  const lowerPrompt = prompt.toLowerCase();
  // If any keyword is found, consider it a coding prompt
  return codingKeywords.some(keyword => lowerPrompt.includes(keyword));
}
