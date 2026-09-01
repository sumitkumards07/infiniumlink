import glob
import re

files = glob.glob('components/landing/*.tsx')
for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # We want to replace font-serif with font-sans font-extrabold tracking-[-0.04em] leading-[0.95]
    # But only in classNames.
    # To avoid duplicate leading/tracking/font-weight, we can use regex to clean up.
    
    def replacer(match):
        cls_string = match.group(1)
        if 'font-serif' in cls_string:
            # Remove old styles
            cls_string = re.sub(r'\bfont-serif\b', 'font-sans font-extrabold tracking-[-0.04em] leading-[0.95]', cls_string)
            cls_string = re.sub(r'\bfont-medium\b', '', cls_string)
            cls_string = re.sub(r'\bfont-bold\b', '', cls_string) # if they were alongside serif
            cls_string = re.sub(r'\bleading-\[1\.0\]\b', '', cls_string)
            cls_string = re.sub(r'\bleading-\[0\.88\]\b', '', cls_string)
            cls_string = re.sub(r'\bleading-\[1\.1\]\b', '', cls_string)
            cls_string = re.sub(r'\bleading-\[1\.4\]\b', '', cls_string)
            cls_string = re.sub(r'\bleading-\[0\.95\]\b', '', cls_string) # in case it's already there
            cls_string = re.sub(r'\btracking-tight\b', '', cls_string)
            cls_string = re.sub(r'\btracking-widest\b', '', cls_string)
            
            # Clean up double spaces
            cls_string = re.sub(r'\s+', ' ', cls_string).strip()
            
            # Re-add leading-[0.95] since we might have accidentally removed it in the global remove
            # Actually we just added it above, let's fix that order.
            
        return 'className="' + cls_string + '"'

    new_content = re.sub(r'className="([^"]+)"', replacer, content)
    
    with open(f, 'w') as file:
        file.write(new_content)

print("Done")
