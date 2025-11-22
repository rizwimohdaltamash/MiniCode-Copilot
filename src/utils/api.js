import { OpenRouter } from '@openrouter/sdk';

// Initialize OpenRouter with the provided API key
const openRouter = new OpenRouter({
    apiKey: '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',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:5173', // Localhost for development
        'X-Title': 'Mini Code Copilot',
    },
});

// Mock code snippets for fallback (Language Specific)
const MOCK_SNIPPETS = {
    javascript: `// JavaScript: Async Data Fetching
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}`,
    python: `# Python: Fibonacci Generator
def fibonacci_generator(n):
    """Generate first n Fibonacci numbers"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Usage
for num in fibonacci_generator(10):
    print(num)`,
    java: `// Java: Singleton Pattern
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {
        // Private constructor
    }

    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}`,
    cpp: `// C++: Binary Search
#include <vector>
#include <iostream>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    csharp: `// C#: LINQ Example
using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6 };
        
        var evenSquares = numbers
            .Where(n => n % 2 == 0)
            .Select(n => n * n);
            
        foreach (var num in evenSquares) {
            Console.WriteLine(num);
        }
    }
}`,
    go: `// Go: Goroutines and Channels
package main

import (
    "fmt"
    "time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d started job %d\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)

    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
}`,
    rust: `// Rust: Result Handling
use std::fs::File;
use std::io::Read;

fn read_file_contents(path: &str) -> Result<String, std::io::Error> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn main() {
    match read_file_contents("config.txt") {
        Ok(data) => println!("File content: {}", data),
        Err(e) => println!("Error reading file: {}", e),
    }
}`,
    typescript: `// TypeScript: Generic Interface
interface Repository<T> {
    getById(id: number): T;
    getAll(): T[];
    save(item: T): void;
}

interface User {
    id: number;
    name: string;
}

class UserRepository implements Repository<User> {
    private users: User[] = [];

    save(user: User): void {
        this.users.push(user);
    }
    // ... other implementations
}`,
    php: `// PHP: Database Connection (PDO)
<?php
class Database {
    private $host = "localhost";
    private $db_name = "test_db";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}`,
    ruby: `# Ruby: Class and Mixin
module Loggable
  def log(message)
    puts "[LOG] #{Time.now}: #{message}"
  end
end

class User
  include Loggable
  attr_accessor :name

  def initialize(name)
    @name = name
    log("User #{@name} created")
  end
end

user = User.new("Alice")`
};

/**
 * Generate code using OpenRouter API with fallback to language-specific mocks
 * @param {string} prompt - The user's prompt
 * @param {string} language - The target programming language
 * @returns {Promise<{code: string, language: string, prompt: string}>}
 */
export async function generateCode(prompt, language = 'javascript') {
    // 1. Try OpenRouter API
    try {
        console.log('Attempting to generate code via OpenRouter...');
        const completion = await openRouter.chat.send({
            model: 'openai/gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert coding assistant. Generate clean, production-ready ${language} code based on the user's request. Provide ONLY the code, no explanations. Comment the code helpfuly.`
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        if (completion && completion.choices && completion.choices[0]) {
            let generatedCode = completion.choices[0].message.content;

            // Clean up markdown code blocks if present
            generatedCode = generatedCode.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');

            return {
                code: generatedCode,
                language: language,
                prompt: prompt
            };
        }
    } catch (error) {
        console.warn('OpenRouter API failed (likely 402 or network), falling back to mock data:', error.message);
        // Fallback proceeds below
    }

    // 2. Fallback to Language-Specific Mock Data
    console.log(`Using fallback mock data for language: ${language}`);

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Get snippet for the requested language, or default to JavaScript if not found
    const mockCode = MOCK_SNIPPETS[language.toLowerCase()] || MOCK_SNIPPETS['javascript'];

    return {
        code: mockCode,
        language: language,
        prompt: prompt
    };
}
