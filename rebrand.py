import os
import glob
import re

files_to_check = glob.glob('**/*.tsx', recursive=True) + glob.glob('**/*.ts', recursive=True)

for f in files_to_check:
    if 'node_modules' in f or '.next' in f:
        continue
    try:
        with open(f, 'r') as file:
            content = file.read()
            
        new_content = re.sub(r'\bLinkFlow\b', 'Infinium', content)
        new_content = re.sub(r'\bRiviera\b', 'Infinium', new_content)
        new_content = re.sub(r'\blinkflow\.com\b', 'infinium.com', new_content)
        
        if content != new_content:
            with open(f, 'w') as file:
                file.write(new_content)
            print(f"Updated {f}")
    except Exception as e:
        print(f"Error {f}: {e}")
print("Done!")
