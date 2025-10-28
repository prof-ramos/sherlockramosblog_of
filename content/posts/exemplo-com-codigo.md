---
title: "Exemplo com Código"
date: 2025-10-28T06:11:28Z
draft: false
tags: ["programação", "código"]
---

Este post contém exemplos de código para testar o lazy-loading do Chroma syntax highlighting.

## JavaScript

```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

## Python

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

## CSS

```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

O syntax highlighting deve funcionar perfeitamente com lazy-loading!
