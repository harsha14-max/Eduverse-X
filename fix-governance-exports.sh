#!/bin/bash

# Fix all governance components with export function declarations

for file in components/governance/*.tsx; do
  if grep -q "^export function" "$file"; then
    # Extract function name
    func_name=$(grep "^export function" "$file" | sed 's/export function //; s/(.*//')
    
    # Replace export function with just function
    sed -i '' "s/^export function ${func_name}()/function ${func_name}()/" "$file"
    
    # Check if export statement already exists at the end
    if ! grep -q "^export { ${func_name} }" "$file"; then
      # Add export statement at the end before the last line
      sed -i '' "\$ a\\
export { ${func_name} }
" "$file"
    fi
    
    echo "Fixed: $file"
  fi
done

