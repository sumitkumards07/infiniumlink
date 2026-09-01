import glob
import re

files = glob.glob('components/landing/*.tsx')
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    def replacer(match):
        cls_string = match.group(1)
        if 'font-extrabold' in cls_string and 'font-sans' in cls_string:
            cls_string = cls_string.replace('leading-[1.0]', '')
            cls_string = cls_string.replace('leading-[0.88]', '')
            cls_string = cls_string.replace('leading-[1.1]', '')
            cls_string = cls_string.replace('leading-[1.4]', '')
            cls_string = cls_string.replace('tracking-tight', '')
            cls_string = cls_string.replace('tracking-widest', '')
            cls_string = re.sub(r'\s+', ' ', cls_string).strip()
        return 'className="' + cls_string + '"'

    new_content = re.sub(r'className="([^"]+)"', replacer, content)
    
    with open(f, 'w') as file:
        file.write(new_content)

print("Done fixing")
